import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { changePassword } from "../api/user";
import { Toastcomponent } from "../components/Toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { getSubmittedServers } from "../api/server";

export default function UserProfile() {
  const { user } = useAuth();
  const [submittedServers, setSubmittedServers] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({ oldpassword: "", newpassword: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [showPassword, setShowPassword] = useState({ old: false, new: false });

  const fetchSubmittedServers = async () => {
    try {
      const response = await getSubmittedServers();
      setSubmittedServers(response.data.servers);
    } catch (error) {
      console.error("Error fetching submitted servers:", error);
      setSubmittedServers([]);
    }
  };

  useEffect(() => {
    if (user) fetchSubmittedServers();
  }, [user]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex justify-center px-4 py-10 text-white">
      <div className="w-full max-w-4xl space-y-12">

        {/* Profile Card */}
        <section className="bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-800 p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wide">👤 Your Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-300 mb-6">
            <div>
              <p className="text-sm uppercase font-semibold tracking-wider text-blue-400">Username</p>
              <p className="mt-1 text-lg font-medium text-white">{user?.username || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm uppercase font-semibold tracking-wider text-blue-400">Email</p>
              <p className="mt-1 text-lg font-medium text-white">{user?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm uppercase font-semibold tracking-wider text-blue-400">Submitted Servers</p>
              <p className="mt-1 text-lg font-medium text-white">{submittedServers?.length || 0}</p>
            </div>
          </div>

          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md cursor-pointer"
          >
            {showChangePassword ? "Cancel" : "Change Password"}
          </button>

          {showChangePassword && (
            <form onSubmit={handlePasswordChange} className="mt-6 space-y-6">

              {/* Old Password */}
              <div className="relative">
                <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-300">
                  Old Password
                </label>
                <input
                  id="oldpassword"
                  type={showPassword.old ? "text" : "password"}
                  name="oldpassword"
                  value={formData.oldpassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-800 rounded-lg pr-12 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter old password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => ({ ...prev, old: !prev.old }))}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition cursor-pointer"
                  aria-label="Toggle old password visibility"
                >
                  {showPassword.old ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-300">
                  New Password
                </label>
                <input
                  id="newpassword"
                  type={showPassword.new ? "text" : "password"}
                  name="newpassword"
                  value={formData.newpassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-800 rounded-lg pr-12 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition cursor-pointer"
                  aria-label="Toggle new password visibility"
                >
                  {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition cursor-pointer ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                } shadow-md`}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}

          {/* Toast */}
          {toast && (
            <div className="mt-6 max-w-md mx-auto">
              <Toastcomponent message={toast} />
            </div>
          )}
        </section>

        {/* Submitted Servers List */}
        <section className="bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-800 p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Submitted Servers</h3>

          {submittedServers.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {submittedServers.map((server) => (
                <Link
                  key={server._id}
                  to={`/servers/${server._id}`}
                  className="block p-5 bg-gray-800 rounded-xl hover:bg-gray-700 shadow-md transition shadow-gray-700"
                >
                  <h4 className="font-semibold text-lg text-white truncate">{server.name}</h4>
                  {server.description && (
                    <p className="text-gray-400 mt-2 text-sm line-clamp-3">{server.description}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">No submitted servers yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}




