import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Acceptserver, Refreshapprovel, Rejectserver } from "../api/developer";
import { getserverbyid } from "../api/server";

const GiveApproval = () => {
  const [server, setServer] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { serverid } = useParams();
  const decodedId = decodeURIComponent(serverid);

  const fetchServer = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getserverbyid(decodedId);
      setServer(res.data);
    } catch (err) {
      console.error("Failed to fetch server:", err);
    } finally {
      setLoading(false);
    }
  }, [decodedId]);

  useEffect(() => {
    fetchServer();
  }, [fetchServer]);

  const handleApprove = async () => {
    await Acceptserver(decodedId);
    setActionStatus("approved");
    setShowConfirmation(true);
  };

  const handlePending = () => {
    setActionStatus("left as pending");
    setShowConfirmation(true);
  };

  const handleReject = async () => {
    if (rejectReason.trim() === "") return;
    await Rejectserver(decodedId, rejectReason);
    setActionStatus(`rejected with reason: "${rejectReason}"`);
    setShowRejectInput(false);
    setRejectReason("");
    setShowConfirmation(true);
  };

  const handleRefresh = async () => {
    await Refreshapprovel(decodedId);
    setActionStatus("refreshed");
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12 flex items-center justify-center font-sans">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white p-8 rounded-3xl shadow-xl w-full max-w-3xl transition-all">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">🔍 Review Server</h2>

        {loading ? (
          <p className="text-center text-gray-300 animate-pulse">Loading server data...</p>
        ) : (
          <>
            <div className="mb-6 space-y-2">
              <h3 className="text-2xl font-semibold text-blue-400">{server?.name}</h3>
              <p className="text-gray-300">{server?.description}</p>
              <p className="text-sm text-gray-500">
                Submitted by: {server?.submittedBy?.email || "Guest"}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {server?.tags?.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs bg-blue-600/30 border border-blue-400 text-blue-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {showRejectInput ? (
              <div className="flex flex-col gap-3 mt-6">
                <textarea
                  className="p-3 bg-white/10 border border-white/20 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                  rows="4"
                  placeholder="Enter rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={handleReject}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all font-semibold cursor-pointer"
                  >
                    Submit Rejection
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectInput(false);
                      setRejectReason("");
                    }}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <button
                  onClick={handleApprove}
                  className="bg-green-500 hover:bg-green-600 py-2 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  ✅ Accept
                </button>
                <button
                  onClick={handlePending}
                  className="bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  🕒 Leave as Pending
                </button>
                <button
                  onClick={() => setShowRejectInput(true)}
                  className="bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  ❌ Reject
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => navigate(-1)}
                className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all font-semibold cursor-pointer"
              >
                ⬅ Go Back
              </button>
              <button
                onClick={handleRefresh}
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all font-semibold cursor-pointer"
              >
                🔄 Refresh Approval
              </button>
            </div>
          </>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-white/20 text-white p-6 rounded-2xl shadow-2xl text-center w-80">
              <h3 className="text-xl font-bold mb-2">✅ Action Completed</h3>
              <p className="mb-4">You have {actionStatus} this server.</p>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  fetchServer();
                  navigate(`/servers/${decodedId}`);
                }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiveApproval;

