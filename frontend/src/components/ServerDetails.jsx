import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { deleteServer, getserverbyid } from "../api/server";
import { Toastcomponent } from "./Toast";

import { getcurentUser } from "../api/user";

const ServerDetails = () => {
  const { serverid } = useParams();
  const decodedId = decodeURIComponent(serverid);
  const [server, setServer] = useState(null);
const [showModal, setShowModal] = useState(false);
const [error,setError] = useState("")

const [isOwner , setisOwner] = useState(false)

const navigate = useNavigate();
  useEffect(() => {
       const fetchServer = async () => {
      try {
        const res = await getserverbyid(decodedId);
        const serverData = res.data;
        setServer(serverData);

        
      }
      catch (err) {
        console.error("Failed to fetch server:", err);
        setError("Failed to fetch server");
        setisOwner(false)
      }
      finally   
        {
            setError("")
        }
    }
    fetchServer();
  }, []);

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const currentUser = await getcurentUser();
      
        if (currentUser && currentUser.data._id === server?.submittedBy?._id) {
          setisOwner(true);
        } else {
          setisOwner(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    checkOwner();
  }, [server]);




  const handleEdit = () => {
    navigate(`/servers/edit/${decodedId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteServer(decodedId);
      navigate("/servers");

    } catch (error) {
      console.error(error);
      setError("Failed to delete server");
    }
    finally
    {
        setError("")
    }
  };


  if (!server) return <div className="p-6">Loading...</div>;


  const {
    
    name,
    description,
    sections,
    githubRepo,
    tags,
    submittedBy,
    createdAt
  } = server;
  


  return (
    <div className="max-w-4xl mx-auto p-6">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h1 className="text-3xl font-bold ">{name}</h1>
      {isOwner ? (<div className="flex gap-2 flex-wrap">
          <button

            onClick={handleEdit}
            className="flex-1 cursor-pointer sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transitionr"
          >
            
            Edit
          </button>


        <button
  onClick={() => setShowModal(true)}
  className="flex-1 sm:flex-none cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
>
  Delete
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
        </div>) : (
            <p className="text-gray-500 mt-4 italic">You must be the owner to edit or delete this server.</p>
        )}
        
      </div>


      <p className="mb-4 text-gray-300"><strong className="text-white">Description:</strong> {description}</p>

      <p className="mb-4 text-white">
        <strong>Submitted By:</strong>{" "}
        {submittedBy?.email || "Guest"}
      </p>

      <p className="mb-4 text-white">
        <strong>Published Date:</strong>{" "}
        {new Date(createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {tags.map((tag, idx) => (
          <span key={idx} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      {githubRepo && (
        <p className="mb-6">
          <strong>Link:</strong>{" "}
          <a href={githubRepo} target="_blank" rel="noreferrer" className="text-blue-600 underline">
            {githubRepo}
          </a>
        </p>
      )}

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={section._id?.$oid || idx}>
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <p className="text-gray-200 whitespace-pre-line">{section.details}</p>
          </div>
        ))}
      </div>
           <div className="fixed bottom-0 left-0 right-0 p-4">{error && <Toastcomponent message={error} />}</div> 
    </div>
  )
};

export default ServerDetails;

