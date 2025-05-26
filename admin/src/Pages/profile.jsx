import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import axios from "axios";
import Swal from "sweetalert2";
import people from "../assets/images/people.jpg";
import { Eye } from "lucide-react";
import CloudinaryUpload from "../utils/UploadCloudinary";

function Profile() {
  const { uploadImage } = CloudinaryUpload();
  const { auth, updateAdmin } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [passhide, setpasshide] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: auth.admin.name || "",
    email: auth.admin.email || "",
    gender: auth.admin.gender || "",
    password: auth.admin.password || "",
    profilePhoto: auth.admin.profilePhoto || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
    setSelectedFile(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      let profileImageUrl = formData.profilePhoto;

      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile);
        if (!uploadedUrl) {
          Swal.fire("Image upload failed", "", "error");
          return;
        }
        profileImageUrl = uploadedUrl;
      }

      const payload = {
        ...formData,
        profilePhoto: profileImageUrl,
      };

      const res = await axios.put(
        `http://localhost:5000/api/admin/update/${auth.admin._id}`,
        payload
      );

      Swal.fire("Profile updated successfully!", "", "success");
      updateAdmin(res.data.admin);
      setEditMode(false);
      setSelectedFile(null);
    } catch (err) {
      Swal.fire("Update failed", "Please try again", "error");
      console.error("Update error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-semibold">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-gray-300">
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : formData.profilePhoto || people
              }
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
              <h1 className="text-2xl font-bold">{formData.name}</h1>
            )}
            <p className="text-gray-500">{formData.email}</p>
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
      <div>
        <h3>About</h3>
        <p className=" text-sm my-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          libero, aliquam eos dolores saepe cupiditate expedita ex esse delectus
          accusantium, ab fuga possimus deleniti dolore, alias modi velit earum
          suscipit placeat. Expedita, quisquam? Magnam error quidem qui facilis
          sit porro adipisci mollitia fugiat hic, corrupti dolores ipsum maxime
          voluptate aliquam?
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  *:bg-pink-100 *:px-2 *:py-1 *:rounded-md">
        <div>
          <label className="text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!editMode}
            className="w-full border bg-transparent px-3 py-2 rounded-md outline-none"
          />
        </div>

        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!editMode}
            className="w-full border px-3 bg-transparent  py-2 rounded-md outline-none"
          />
        </div>

        <div>
          <label className="text-sm">Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Enter gender"
            className="w-full border px-3 bg-transparent  py-2 rounded-md outline-none"
          />
        </div>

        <div className="relative">
          <label className="text-sm">Password</label>
          <input
            type={passhide ? "password" : "text"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            readOnly={!editMode}
            className="w-full border px-3 bg-transparent  py-2 rounded-md outline-none"
          />
          <Eye
            className="absolute right-3 top-8 cursor-pointer"
            onClick={() => setpasshide(!passhide)}
          />
        </div>
        {editMode && (
          <div className="col-span-2">
            <label className="block text-sm bg-transparent  font-medium text-gray-700 mb-1">
              Change Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="text-sm text-gray-700"
            />
            {selectedFile && (
              <p className="text-xs text-green-600 mt-1">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
