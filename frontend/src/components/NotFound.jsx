// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] px-6 text-center">
      <h1 className="text-8xl font-extrabold text-red-500 drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-white tracking-wide">Page Not Found</h2>
      <p className="mt-3 max-w-md text-gray-400">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

