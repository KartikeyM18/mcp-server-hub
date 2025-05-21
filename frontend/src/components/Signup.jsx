import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/user.js";
import { Toastcomponent } from "./Toast.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [issubmitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitting(false);
    setToast(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      const { username, email, password } = formData;
      if (!username || !email || !password) {
        setToast("Please fill out all fields");
        return;
      }

      await registerUser(formData);
      setToast("User registered successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response?.status === 400) {
        setToast("Error from your side");
      } else if (err.response?.status === 409) {
        setToast("User already exists");
      } else {
        setToast("Something went wrong");
      }
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your username"
          />

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
            className={`w-full py-2 rounded-lg text-white text-lg font-medium transition-colors ${
              issubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {issubmitting ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-gray-400 text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
          <Toastcomponent message={toast} />
        </div>
      )}
    </div>
  );
}

