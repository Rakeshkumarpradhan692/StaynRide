import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { User, Mail, Phone, MapPin, Calendar, Edit, Lock } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { Auth, updateUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    number: "",
    gender: "",
    city: "",
    district: "",
    state: "",
    country: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    if (Auth?.user) {
      setUser(Auth.user);
      setFormData({
        id: Auth.user._id || "",
        name: Auth.user.name || "",
        email: Auth.user.email || "",
        number: Auth.user.number || "",
        gender: Auth.user.gender || Auth.user.Gender || "",
        city: Auth.user.city || "",
        district: Auth.user.district || "",
        state: Auth.user.state || "",
        country: Auth.user.country || "",
        address: Auth.user.address || "",
        password: "",
      });
    }
  }, [Auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!formData.name || !formData.email) {
        throw new Error("Name and email are required");
      }

      const res = await axios.put(
        `http://localhost:5000/api/users/update-user/`,
        {
          id: formData.id,
          name: formData.name,
          email: formData.email,
          number: formData.number,
          country: formData.country,
          state: formData.state,
          district: formData.district,
          city: formData.city,
          address: formData.address,
          Gender: formData.Gender,
          image: formData.image,
        }
      );

      setUser(res.data.user);
      updateUser(res.data.user);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Update failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const handleClose = () => {
    Navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 flex items-start md:items-center justify-start md:justify-center p-4 md:p-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl space-y-6">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close login"
        >
          <AiOutlineClose className="text-gray-500 text-xl" />
        </button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Profile
          </h2>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Edit size={18} />
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
            {editMode && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={
                user?.profilePhoto ||
                `https://api.dicebear.com/8.x/initials/svg?seed=${
                  user?.name || "User"
                }`
              }
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-indigo-200 shadow-md"
            />
            {editMode && (
              <button className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors">
                <Edit size={16} />
              </button>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{user?.name}</h3>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", icon: <User size={18} />, field: "name" },
            {
              label: "Email Address",
              icon: <Mail size={18} />,
              field: "email",
              type: "email",
            },
            {
              label: "Phone Number",
              icon: <Phone size={18} />,
              field: "number",
              type: "tel",
            },
            {
              label: "Gender",
              icon: <User size={18} />,
              field: "gender",
              editComponent: (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ),
            },
            {
              label: "Location",
              icon: <MapPin size={18} />,
              multiline: true,
              value: `${formData.city}, ${formData.district}, ${formData.state}, ${formData.country}`,
              address: formData.address,
            },
            {
              label: "Member Since",
              icon: <Calendar size={18} />,
              readonly: true,
              value: formatDate(user?.createdAt),
            },
            {
              label: "Change Password",
              icon: <Lock size={18} />,
              field: "password",
              type: "password",
              placeholder: "Enter new password",
            },
          ].map(
            ({
              label,
              icon,
              field,
              multiline,
              readonly,
              value,
              type,
              placeholder,
              editComponent,
              address,
            }) => (
              <div
                key={field || label}
                className={`bg-gray-50 p-4 rounded-lg ${
                  multiline ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-indigo-500">{icon}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    {editMode && !readonly ? (
                      editComponent ? (
                        editComponent
                      ) : multiline ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            placeholder="District"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Full Address"
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      ) : (
                        <input
                          type={type || "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      )
                    ) : (
                      <div>
                        <p className="text-base font-medium">
                          {value || formData[field] || "Not provided"}
                        </p>
                        {address && (
                          <p className="text-sm text-gray-600 mt-1">
                            {address}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
