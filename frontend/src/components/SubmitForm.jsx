import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { submitserver } from "../api/server";
import { Toastcomponent } from "./Toast";
import { useNavigate } from "react-router-dom";

export default function SubmitServer() {
  const { user } = useAuth();
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubRepo: "",
    tags: "",
    sections: [],
    status: "active",
  });

  const [newSection, setNewSection] = useState({
    title: "",
    details: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    setNewSection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSection = () => {
    const { title, details } = newSection;
    if (title.trim() && details.trim()) {
      setFormData((prev) => ({
        ...prev,
        sections: [...prev.sections, { title: title.trim(), details: details.trim() }],
      }));
      setNewSection({ title: "", details: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      submittedBy: user?._id,
      tags: [...new Set(formData.tags.split(",").map(tag => tag.trim()).filter(Boolean))]
    };

    try {
     await submitserver(payload);
      
      setMessage("✅ Server submitted successfully!");

      setFormData({
        name: "",
        description: "",
        githubRepo: "",
        tags: "",
        sections: [],
        status: "active",
      });
      
    } catch (err) {
      console.error(err);
      
      setMessage("❌ Something went wrong. Please try again.");
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);

    setTimeout(() => {
      navigate("/servers");
    }
    , 2000); 
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-lg text-white mt-10">
      <h2 className="text-2xl font-bold mb-4">Submit a Server</h2>
    
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Server Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
          required
        />

        <input
          type="url"
          name="githubRepo"
          placeholder="GitHub Repository URL"
          value={formData.githubRepo}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Comma-separated tags (e.g. Node.js,Express,MongoDB)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        {/* Sections Input */}
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="font-semibold mb-2">Sections</h3>
          <div className="flex flex-col gap-2 mb-2">
            <input
              type="text"
              name="title"
              value={newSection.title}
              onChange={handleSectionChange}
              placeholder="Section Title"
              className="p-2 rounded bg-gray-700"
            />
            <textarea
              name="details"
              value={newSection.details}
              onChange={handleSectionChange}
              placeholder="Section details"
              className="p-2 rounded bg-gray-700"
            />
            <button
              type="button"
              onClick={addSection}
              className="bg-blue-600 px-4 py-1 rounded self-start hover:bg-blue-700"
            >
              Add Section
            </button>
          </div>
          <ul className="text-sm text-gray-400 space-y-1">
            {formData.sections.map((sec, i) => (
              <li key={i}>
                <span className="font-medium text-white">{sec.title}:</span> {sec.details}
              </li>
            ))}
          </ul>
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Submit Server
        </button>
      </form>

     <div className="fixed bottom-0 left-0 right-0 p-4">{message && <Toastcomponent message={message} />}</div> 
    </div>
  );
}
