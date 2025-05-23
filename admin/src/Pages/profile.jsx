import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import people from "../assets/images/people.jpg";
import axios from "axios";

function Profile() {
  const { auth, updateAdmin } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.admin.name || "",
    email: auth.admin.email || "",
    gender: auth.admin.gender || "",
    password: auth.admin.password || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/update/${auth.admin._id}`,
        formData
      );
      alert("Profile updated successfully!");
      setEditMode(false);
      updateAdmin(res.data.admin);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-semibold">
      <div className="flex items-center border-b justify-between p-6 rounded-lg mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-gray-300">
            <img
              src={auth.admin.profilePhoto || people}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-2xl font-bold outline-none bg-transparent"
              />
            ) : (
              <h1 className="text-2xl font-bold">{auth.admin.name}</h1>
            )}
            <p className="text-gray-500">{auth.admin.email}</p>
            <p className="text-red-500 font-medium">- Admin -</p>
          </div>
        </div>
        <div className="space-x-2">
          <button
            onClick={toggleEdit}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md transition"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
          {editMode && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition"
            >
              Save
            </button>
          )}
        </div>
      </div>

      <div className="rounded-lg">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className=" text-sm text-gray-400 mb-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum odit
          recusandae dolores iusto tempora ducimus? Debitis eos magnam magni
          quam quasi quaerat, ratione ut similique.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 *:border *:bg-pink-100 *:rounded-md *:p-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!editMode}
              className={`w-full rounded-md bg-transparent outline-none ${
                !editMode ? "text-gray-400" : ""
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!editMode}
              className={`w-full rounded-md bg-transparent outline-none ${
                !editMode ? "text-gray-400" : ""
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              readOnly={!editMode}
              placeholder="Enter gender"
              className="w-full rounded-md bg-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              readOnly={!editMode}
              placeholder="Enter new password"
              className="w-full rounded-md bg-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
