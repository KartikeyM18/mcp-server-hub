import ServerDetails from "../components/ServerDetails";

export default function Server() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Server Details
        </h1>

        <div className="rounded-2xl shadow-lg bg-gray-900/60 backdrop-blur-md p-6 border border-gray-700">
          <ServerDetails />
        </div>
      </div>
    </div>
  );
}
