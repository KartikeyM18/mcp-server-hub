import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { changePassword } from "../api/user";
import { Toastcomponent } from "../components/Toast";
import {Link} from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { getSubmittedServers } from "../api/server";



export default function UserProfile() {
  const { user } = useAuth();

  const userData = user?.data;
 
  const [submittedServers, setSubmittedServers] = useState([]);
  const fetchSubmittedServers = async () => {
    try {
      const response = await getSubmittedServers();
      console.log(response.data.servers);
      setSubmittedServers(response.data.servers);
    } catch (error) {
      console.error("Error fetching submitted servers:", error);
      setSubmittedServers([]);
    }}
  
    useEffect(() => {
      if (user) {
        fetchSubmittedServers();
      }
    }, [user]);
    
  
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({ oldpassword: "", newpassword: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [showPassword, setShowPassword] = useState({ old: false, new: false });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast("");

    try {
      await changePassword(formData);
      setToast("✅ Password changed successfully");
      setFormData({ oldpassword: "", newpassword: "" });
      setShowChangePassword(false);
    } catch (err) {
      console.error(err);
      setToast("❌ Failed to change password. Try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="w-full max-w-3xl space-y-10">
        {/* Profile Card */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6">👤 Your Profile</h2>
          <div className="space-y-2 text-sm mb-4">
            <p><span className="font-semibold">Username:</span> {userData?.username}</p>
            <p><span className="font-semibold">Email:</span> {userData?.email}</p>
            <p><span className="font-semibold">Submitted Servers:</span> {userData?.submittedserver?.length || 0}</p>
          </div>

          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition cursor-pointer"
          >
            {showChangePassword ? "Cancel" : "Change Password"}
          </button>

          {showChangePassword && (
            <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
              <div className="relative">
                <label className="block mb-1">Old Password</label>
                <input
                  type={showPassword.old ? "text" : "password"}
                  name="oldpassword"
                  value={formData.oldpassword}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-800 rounded pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => ({ ...prev, old: !prev.old }))}
                  className="absolute right-2 top-8 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword.old ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <label className="block mb-1">New Password</label>
                <input
                  type={showPassword.new ? "text" : "password"}
                  name="newpassword"
                  value={formData.newpassword}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-800 rounded pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
                  className="absolute right-2 top-8 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white transition ${
                  loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700 cursor-pointer"
                }`}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}

          {toast && <Toastcomponent message={toast} />}
        </div>

        {/* Server Cards */}
        {submittedServers.map((server) => (
  <Link
    key={server._id}
    to={`/servers/${server._id}`} // `to` instead of `href` for react-router-dom
    className="block bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition shadow hover:shadow-md"
  >
    <h4 className="font-semibold text-lg text-white">{server.name}</h4>
    {server.description && (
      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{server.description}</p>
    )}
  </Link>
))}

      </div>
    </div>
  );
}


