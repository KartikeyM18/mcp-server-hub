
import React from "react";
import { useNavigate } from "react-router-dom";



const ServerCard = ({ _id, name, description, tags,submittedBy }) => {
  const navigate = useNavigate();
  const submitter = submittedBy ? submittedBy.email : "Guest"; // Assuming submittedBy is an 
  return (
    <div
      onClick={() => navigate(`/servers/${_id}`)}
      className="cursor-pointer border border-blue-950 p-4 rounded-lg hover:shadow-md transition "
    >
      <h2 className="text-xl font-semibold mb-1">{name}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-900 text-blue-100 px-2 py-1 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
 
      <p className="text-xs text-gray-200">Submitted by: {submitter}</p> 
    </div>
  );
};

export default ServerCard;
