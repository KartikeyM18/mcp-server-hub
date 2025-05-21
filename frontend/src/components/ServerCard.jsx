import React from "react";
import { useNavigate } from "react-router-dom";

const ServerCard = ({ _id, name, description, tags, submittedBy }) => {
  const navigate = useNavigate();
  const submitter = submittedBy ? submittedBy.email : "Guest";

  return (
    <div
      onClick={() => navigate(`/servers/${_id}`)}
      className="cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-700 text-white space-y-3"
    >
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-sm text-gray-300 line-clamp-2">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-950 text-blue-100 px-3 py-1 text-xs rounded-full shadow-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-2">Submitted by: {submitter}</p>
    </div>
  );
};

export default ServerCard;

