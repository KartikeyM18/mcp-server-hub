// src/pages/Login.jsx
import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { Link ,useNavigate} from "react-router-dom";
import { useAuth} from '../contexts/AuthContext'
import { loginUser } from "../api/user.js";
import { Toastcomponent } from "./Toast";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const [toast, setToast] = useState(null);
  const [issubmitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitting(false);
    setToast(null);
  };

  const handleSubmit = async(e) => {  
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    if (!formData.email || !formData.password) {
      setToast("Please fill out all fields");
      return;
    }

    try {
        const res = await loginUser(formData);
          setUser(res);
          setToast("Login successful!");
          setTimeout(() => navigate("/"), 2000); // navigate after 2s
        
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setToast("Invalid email or password");
      }else if (error.response && error.response.status === 401) {
        setToast("user not found");
      } 
      setTimeout(() => setToast(null), 2000); // Clear toast after 2s
      setUser(null);
    }
    finally {
      setSubmitting(false);
    }
    

   

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 shadow-lg shadow-gray-300">
    <div className="min-w-sm">  <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
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
          className={`w-full mt-4 py-2 rounded text-white cursor-pointer ${
            issubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {issubmitting ? "Loging..." : "Login"}
        </button>
        <p className="text-sm text-center text-white mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-200 hover:underline">
            Register
          </Link>
        </p>
      </form></div>

      <div className="fixed bottom-0 left-0 right-0 p-4">
        {toast && <Toastcomponent message={toast} />}
      </div>
    </div>
  );
}
