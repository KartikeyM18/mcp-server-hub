import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { Link, useNavigate } from "react-router-dom";

import { Toastcomponent } from "./Toast";
import { useDevAuth } from "../contexts/AuthContext.jsx";
import { Logindeveloper } from "../api/developer.js";

export default function Logindev() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  const [issubmitting, setSubmitting] = useState(false);

  const { setDev } = useDevAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitting(false);
    setToast(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    if (!formData.username || !formData.password) {
      setToast("Please fill out all fields");
      setSubmitting(false);
      return;
    }

    try {
      const res = await Logindeveloper(formData);
      setDev(res);
      setToast("Login successful!");
      setTimeout(() => navigate("/developer/dev-home"), 2000); // navigate after 2s
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setToast("Invalid username or password");
      } else if (error.response && error.response.status === 401) {
        setToast("Developer not found");
      } else {
        setToast("Something went wrong. Please try again.");
      }
      setTimeout(() => setToast(null), 2000); // Clear toast after 2s
      setDev(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 shadow-lg shadow-gray-300">
      <div className="min-w-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Developer Login
          </h2>
          <AuthInput
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <AuthInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <button
            type="submit"
            disabled={issubmitting}
            className={`w-full mt-4 py-2 rounded text-white cursor-pointer ${
              issubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {issubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center text-white mt-4">
            Keep the credentials secret?{" "}
            <Link to="/" className="text-blue-200 hover:underline">
              Go to Home
            </Link>
          </p>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4">
        {toast && <Toastcomponent message={toast} />}
      </div>
    </div>
  );
}
