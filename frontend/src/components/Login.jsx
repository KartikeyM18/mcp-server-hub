// src/pages/Login.jsx
import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from "../api/user.js";
import { Toastcomponent } from "./Toast";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [toast, setToast] = useState(null);
  const [issubmitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitting(false);
    setToast(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    if (!formData.email || !formData.password) {
      setToast("Please fill out all fields");
      setSubmitting(false);
      return;
    }

    try {
      const res = await loginUser(formData);
      setUser(res);
      setToast("Login successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setToast("Invalid email or password");
      } else if (error.response && error.response.status === 401) {
        setToast("User not found");
      } else {
        setToast("Something went wrong. Please try again.");
      }
      setUser(null);
    } finally {
      setTimeout(() => setToast(null), 3000);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-gray-900 via-black to-gray-900
     ">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg
            backdrop-blur-sm
            transition-shadow duration-300 hover:shadow-blue-600/50"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
            Login
          </h2>
          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
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
            className={`w-full mt-6 py-3 rounded text-white text-lg font-semibold
              transition-colors duration-300 cursor-pointer
              ${issubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {issubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center text-gray-300 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        {toast && <Toastcomponent message={toast} />}
      </div>
    </div>
  );
}

