import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, User, Calendar, Edit } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.email) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/admin/all-users", {
          params: { email: storedUser.email },
        });

        if (response.data) {
          setUser(response.data);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
          <button
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition"
            onClick={() => alert("Edit Profile coming soon...")}
          >
            <Edit size={18} /> Edit
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && user && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src="https://api.dicebear.com/8.x/initials/svg?seed=Ashish" // Replace with user.name if dynamic
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-4 border-indigo-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <User className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg font-semibold text-gray-800">{user.number}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base font-medium text-gray-800">
                  {user.city}, {user.district}, {user.state}, {user.country}
                </p>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {user.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-base font-medium text-gray-800">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition duration-300 mt-4"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;



// export default ProfilePage;

// import React from "react";
// import { Mail, MapPin, Phone, User, Copy, Home } from "lucide-react";

// const UserProfile = ({ user }) => {
//   if (!user) return <div className="p-6 text-center">Loading user data...</div>;

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Copied to clipboard!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 flex items-center justify-center">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               {user.name}
//             </h1>
//             <p className="text-gray-500">User ID: {user._id}</p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <button
//               onClick={() => copyToClipboard(user.email)}
//               className="flex items-center text-blue-600 hover:text-blue-800 transition"
//             >
//               <Copy size={16} className="mr-1" />
//               Copy Email
//             </button>
//           </div>
//         </div>

//         <hr className="my-6" />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
//           <div className="flex items-center space-x-4">
//             <User className="text-indigo-500" />
//             <div>
//               <p className="text-sm font-semibold">Full Name</p>
//               <p>{user.name}</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Mail className="text-indigo-500" />
//             <div>
//               <p className="text-sm font-semibold">Email</p>
//               <p>{user.email}</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Phone className="text-indigo-500" />
//             <div>
//               <p className="text-sm font-semibold">Phone</p>
//               <p>{user.number}</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <MapPin className="text-indigo-500" />
//             <div>
//               <p className="text-sm font-semibold">City / District</p>
//               <p>{user.city} / {user.district}</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Home className="text-indigo-500" />
//             <div>
//               <p className="text-sm font-semibold">State / Country</p>
//               <p>{user.state} / {user.country}</p>
//             </div>
//           </div>

//           <div className="col-span-1 md:col-span-2">
//             <div className="flex items-start space-x-4">
//               <Home className="text-indigo-500 mt-1" />
//               <div>
//                 <p className="text-sm font-semibold">Full Address</p>
//                 <p className="whitespace-pre-line">{user.address}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <hr className="my-6" />
//         <p className="text-xs text-gray-400 text-right">
//           Password Hash: <code>{user.password.slice(0, 20)}...</code>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

