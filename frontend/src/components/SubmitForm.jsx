<<<<<<< HEAD
import React, { useState } from 'react'
import axios from 'axios'

const SubmitForm = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const [infoObj, setInfoObj] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${serverUrl}/submit`, infoObj, {
                withCredentials: true,
            });
            console.log("Response from server:", response.data);
            setIsSubmitted(true);

        } catch (error) {
            console.error("Error posting data:", error);
        }
    }

    if(isSubmitted){
        return <div className='flex flex-col items-center mt-20 gap-5'>
            <h1 className='text-4xl text-slate-700 font-bold text-center'>Done!</h1>
            
            <p className='text-xl font-semibold text-slate-800'>Thanks for your submission! We'll review and display your MCP Server later.</p>
        </div>
    }

    return (
        <div className='flex justify-center items-center mt-10'>
            <div className='w-[700px] flex flex-col gap-9'>
                <h1 className='text-4xl text-slate-700 font-bold text-center'>MCP Server you want to submit</h1>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Server Name *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md'
                        onChange={(e) => {
                            setInfoObj({ ...infoObj, name: e.target.value });
                        }} />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>URL *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md'
                        onChange={(e) => {
                            setInfoObj({ ...infoObj, githubRepo: e.target.value });
                        }} />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Description *</p>
                    <textarea rows={4} className='border border-gray-300 shadow p-1 px-1.5 rounded-md'
                        onChange={(e) => {
                            setInfoObj({ ...infoObj, description: e.target.value });
                        }} />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Email *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md'
                        onChange={(e) => {
                            setInfoObj({ ...infoObj, submittedBy: e.target.value });
                        }} />
                </div>

                <button
                    className='bg-black text-white p-1 pb-1.5 px-4 rounded-lg font-semibold w-fit'
                    onClick={handleSubmit}>Submit</button>

            </div>
=======
import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { submitserver } from "../api/server";
import { Toastcomponent } from "./Toast";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
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
>>>>>>> 8a4e2dd (stage ready of first)
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
