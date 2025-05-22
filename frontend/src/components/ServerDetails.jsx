import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { deleteServer, getserverbyid } from "../api/server";
import { Toastcomponent } from "./Toast";
import { getcurentUser } from "../api/user";
import BasicPageSkeleton from "./BasicPageskeleton";

const ServerDetails = ({
  backRoute = -1,
  showEdit = false,
  showDelete = false,
  showApproval = false,
  showOwnerOnlyButtons = false,
  goHome=""
}) => {
  const { serverid } = useParams();
  const decodedId = decodeURIComponent(serverid);

  const [server, setServer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const res = await getserverbyid(decodedId);
        setServer(res.data);
      } catch (err) {
        console.error("Failed to fetch server:", err);
        setError("Failed to fetch server");
      } finally {
        setError("");
      }
    };
    fetchServer();
  }, [decodedId]);

  useEffect(() => {
    if (!server || !showOwnerOnlyButtons) return;

    const checkOwner = async () => {
      try {
        const currentUser = await getcurentUser();
        if (currentUser?.data?._id === server?.submittedBy?._id) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    checkOwner();
  }, [server, showOwnerOnlyButtons]);

  const handleEdit = () => navigate(`/servers/edit/${decodedId}`);

  const handleDelete = async () => {
    try {
      await deleteServer(decodedId);
      setError("Server deleted successfully");
      setTimeout(() => {
        navigate("/servers");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to delete server");
    } finally {
      setError("");
    }
  };

  if (!server) return <BasicPageSkeleton />;

  const {
    name,
    description,
    sections,
    githubRepo,
    tags,
    submittedBy,
    createdAt,
    Approved,
    rejectionMessage,
  } = server;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-6 py-10 relative">
      {/* 🏠 Home Button */}
      <button
        onClick={() => navigate(goHome)}
        className="fixed top-5 right-5 z-50 bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-xl shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer" 
      >
        🏠 Home
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">{name || "Server Name"}</h1>
          {(showEdit || showDelete) && (!showOwnerOnlyButtons || isOwner) && (
            <div className="flex gap-3 flex-wrap">
              {showEdit && (
                <button
                  onClick={handleEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition cursor-pointer"
                >
                  ✏️ Edit
                </button>
              )}
              {showDelete && (
                <>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow transition cursor-pointer"
                  >
                    🗑️ Delete
                  </button>
                  <ConfirmModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => {
                      setShowModal(false);
                      handleDelete();
                    }}
                    title="Delete Server?"
                    message={`Are you sure you want to delete "${server.name}"? This action cannot be undone.`}
                  />
                </>
              )}
            </div>
          )}
        </div>

        {/* Meta Info */}
        <div className="space-y-4">
          <p className="text-lg">
            <strong className="text-gray-300">Description:</strong> {description}
          </p>
          <p>
            <strong className="text-gray-300">Submitted By:</strong>{" "}
            {submittedBy?.email || "Guest"}
          </p>
          <p>
            <strong className="text-gray-300">Published:</strong>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
          {githubRepo && (
            <p>
              <strong className="text-gray-300">GitHub:</strong>{" "}
              <a
                href={githubRepo}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline"
              >
                {githubRepo}
              </a>
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm shadow-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={section._id?.$oid || idx}>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {section.title}
              </h2>
              <p className="text-gray-300 whitespace-pre-line">{section.details}</p>
            </div>
          ))}
        </div>

        {/* Approval Status */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Server Approval:</h2>
          {Approved === "approved" && (
            <span className="bg-green-700 px-4 py-2 rounded-lg shadow text-white inline-block">
              ✅ Approved
            </span>
          )}
          {Approved === "pending" && (
            <span className="bg-yellow-600 px-4 py-2 rounded-lg shadow text-white inline-block">
              ⏳ Pending Review
            </span>
          )}
          {Approved === "rejected" && (
            <div className="relative inline-block group">
              <span className="bg-red-700 px-4 py-2 rounded-lg text-white shadow cursor-pointer">
                ❌ Rejected
              </span>
              <div className="absolute z-10 hidden group-hover:block mt-2 w-80 bg-white text-black rounded-lg shadow-lg p-4 transition">
                <p className="font-semibold text-red-600">Reason:</p>
                <p className="text-sm">
                  {rejectionMessage?.content || "No reason provided"}
                </p>
              </div>
            </div>
          )}

          {showApproval && (
            <div className="mt-4">
              <button
                onClick={() => navigate(`/developer/giveapproval/${decodedId}`)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
              >
                🛠 Modify Approval
              </button>
            </div>
          )}
        </div>

        {/* Error Toast */}
        {error && (
          <div className="fixed bottom-0 left-0 right-0 p-4">
            <Toastcomponent message={error} />
          </div>
        )}

        {/* Go Back */}
        <div className="fixed bottom-10 right-10">
          <button
            onClick={() => navigate(backRoute)}
            className="bg-blue-700 hover:bg-gray-800 text-white px-4 py-2 rounded-xl shadow transition cursor-pointer"
          >
            ⬅️ Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerDetails;
