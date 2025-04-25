
import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { Link } from "react-router-dom";
import {registerUser} from "../api/user.js"; 
import { Toastcomponent } from "./Toast.jsx";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      if (!formData.username || !formData.email || !formData.password) {
        setToast(" Please fill out all fields");
        return;
      }

       await registerUser(formData);
        setToast(" User registered successfully!");
        setTimeout(() => navigate("/login"), 2000); // navigate after 2s
           
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setToast("Error from your side");
      } else if (err.response && err.response.status === 409) {
        setToast("User already exists");
      } else {
        setToast("Something went wrong");
      }
      
     
      
    }
    finally {
      setSubmitting(false)
      setTimeout(() => 
        setToast(null), 2000);
    }



   
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-black px-4">
    <div className="min-w-sm"> <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Register</h2>

        <AuthInput
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your UserName"
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
          className={`w-full mt-4 py-2 rounded text-white cursor-pointer ${
            issubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {issubmitting ? "Registering..." : "Register"}
        </button>
        

        <p className="text-sm text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-200 hover:underline">
            Login
          </Link>
        </p>

        
      </form>
      </div> 
     <div className="fixed bottom-0 left-0 right-0 p-4">{toast && <Toastcomponent message={toast} />}</div> 
    </div>
  );
}
