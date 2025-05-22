import { useNavigate } from "react-router-dom";
import { useState } from "react"

const ServerCard = ({
  _id,
  name,
  description,
  tags,
  submittedBy,
  onclickroute,
  status = "inactive",
}) => {
  const navigate = useNavigate();
  const submitter = submittedBy ? submittedBy.email : "Guest";
  const isActive = status === "active";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(onclickroute)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-800 hover:from-gray-900 hover:to-gray-800 transition-all duration-300 p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-700 text-white space-y-3"
    >
      {/* Glowing Status Dot + Hover Label */}
      <div className="absolute right-4 top-1/2 -translate-y-1/4 group">
        <span
          className={`h-3 w-3 rounded-full block ${
            isActive ? "bg-green-500" : "bg-red-600"
          } animate-pulse shadow-md`}
        />
        {hovered && (
          <div
            className={`absolute top-1/2 right-6 -translate-y-1/2 px-3 py-1 text-xs font-medium rounded-md shadow-lg ${
              isActive
                ? " text-green-500"
                : " text-red-600"
            } transition-all duration-200`}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
        )}
      </div>

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

