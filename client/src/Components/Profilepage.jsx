import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { Auth } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
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
        name: Auth.user.name || "",
        email: Auth.user.email || "",
        number: Auth.user.number || "",
        gender: Auth.user.gender || "",
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
      const res = await axios.put("/api/user/profile", formData);
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
          <div className="space-x-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md"
            >
              <Edit size={18} />
              {editMode ? "Cancel" : "Edit"}
            </button>
            {editMode && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={
              Auth.user?.profilePhoto ||
              `https://api.dicebear.com/8.x/initials/svg?seed=${Auth.user?.name}`
            }
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-indigo-300"
          />
        </div>

        <div className="space-y-4 text-gray-800">
          {[
            { label: "Name", icon: <User />, field: "name" },
            { label: "Email", icon: <Mail />, field: "email" },
            { label: "Phone", icon: <Phone />, field: "number" },
            { label: "Gender", icon: <User />, field: "gender" },
            {
              label: "Location",
              icon: <MapPin />,
              multiline: true,
              value: `${formData.city}, ${formData.district}, ${formData.state}, ${formData.country}\n${formData.address}`,
            },
            {
              label: "Member Since",
              icon: <Calendar />,
              readonly: true,
              value: formatDate(Auth.user?.createdAt),
            },
            {
              label: "Password",
              icon: <User />,
              field: "password",
              type: "password",
              editable: true,
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
              editable,
            }) => (
              <div key={field || label} className="flex items-start gap-3">
                <div className="mt-1 text-indigo-500">{icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{label}</p>
                  {editMode && editable !== false && !readonly ? (
                    multiline ? (
                      <textarea
                        name={field || ""}
                        value={value || formData[field] || ""}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-300 outline-none"
                      />
                    ) : (
                      <input
                        type={type || "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-300 outline-none"
                      />
                    )
                  ) : (
                    <p className="text-base font-medium whitespace-pre-line">
                      {value || formData[field]}
                    </p>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {error && (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

