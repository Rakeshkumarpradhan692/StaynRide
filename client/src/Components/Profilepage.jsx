import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";
import axios from "axios";
import { Star } from "lucide-react";
import { Edit } from "lucide-react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloudinaryUpload from "./CloudinaryUpload";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { Auth, updateUser } = useContext(AuthContext);
  const { uploadImage } = CloudinaryUpload();
  const [user, setUser] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookings, setbookings] = useState([]);
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
    image: "",
  });
  const server_url =
    process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (Auth?.user) {
      const {
        _id,
        name,
        email,
        number,
        gender,
        Gender,
        city,
        district,
        state,
        country,
        address,
        password,
        image,
      } = Auth.user;

      setUser(Auth.user);
      setFormData({
        id: _id || "",
        name: name || "",
        email: email || "",
        number: number || "",
        gender: gender || Gender || "",
        city: city || "",
        district: district || "",
        state: state || "",
        country: country || "",
        address: address || "",
        password: password || "",
        image: image || "",
      });
      fetchBookings();
    }
  }, [Auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchBookings = async () => {
    try {
      const ress = await axios.get(
        `${server_url}users/get-booking/${Auth?.user?._id}`
      );
      setbookings(ress.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB.");
      return;
    }
    const res = await uploadImage(file);
    if (res) {
      setFormData((prev) => ({
        ...prev,
        image: res,
      }));
      toast.success("Image uploaded successfully");
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!formData.name || !formData.email) {
        throw new Error("Name and email are required");
      }

      const res = await axios.put(
        "http://localhost:5000/api/users/update-user/",
        formData
      );

      setUser(res.data.user);
      updateUser(res.data.user);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Update failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      Swal.fire("Error", "Please fill out both fields.", "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match.", "error");
      return;
    }

    try {
      setLoading(true);
      await axios.put("http://localhost:5000/api/users/forgetpass", {
        id: formData.id,
        newpass: newPassword,
      });
      Swal.fire({
        title: "password update successfully",
        icon: "success",
        draggable: true,
      });
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const msg = err.response?.data?.message || "Password change failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
    return;
  };

  const handleClose = () => {
    navigate("/");
  };

  const profileImage =
    formData.image ||
    user?.image ||
    `https://api.dicebear.com/8.x/initials/svg?seed=${user?.name || "User"}`;

  return (
    <div className="min-h-screen md:p-[4rem] bg-gradient-to-br from-indigo-100 to-white px-6 flex justify-center">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Close profile"
      >
        <AiOutlineClose className="text-gray-500 text-xl" />
      </button>

      <div className="w-full bg-white rounded-xl shadow-lg p-6 md:px-[4rem] relative space-y-6">
        <button
          onClick={() => setEditMode(!editMode)}
          className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold px-4 py-2 rounded-md shadow"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={formData.image}
              name="image"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-200 shadow-md object-cover"
            />
            {editMode && (
              <>
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition"
                >
                  <Edit size={16} />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </>
            )}
          </div>

          <div className="flex-1 space-y-2">
            {editMode ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            )}
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-indigo-600 text-sm font-medium">– User –</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">About</h3>
          <p className="text-sm text-gray-600">
            The Admin of the BricksNBar E-Commerce platform is responsible for
            overseeing and managing all aspects of the online store. As the
            central authority, the Admin ensures smooth business operations,
            efficient product management, and seamless customer experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Email", field: "email", type: "email" },
            { label: "Phone", field: "number", type: "text" },
            { label: "Gender", field: "gender", type: "text" },
            { label: "City", field: "city", type: "text" },
            { label: "District", field: "district", type: "text" },
            { label: "State", field: "state", type: "text" },
            { label: "Country", field: "country", type: "text" },
            { label: "Address", field: "address", type: "textarea" },
          ].map(({ label, field, type, value, readOnly }) => (
            <div key={label} className="bg-pink-100 rounded-md p-4">
              <p className="text-sm font-semibold text-gray-600">{label}</p>
              {editMode && !readOnly ? (
                <input
                  type={type}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full bg-white mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-base font-medium text-gray-800">
                  {value || formData[field] || "Not provided"}
                </p>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-md shadow transition"
            >
              Change Password
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md shadow transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mt-4">
            {error}
          </div>
        )}
        <div className="histroy">
          <h3 className=" text-2xl font-semibold">History</h3>

          <div className="overflow-x-auto p-4">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 hidden lg:table-cell">
                    Pickup Location
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 hidden lg:table-cell">
                    Drop Location
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Total Price
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {bookings.map((item, key) => {
                  const cab = item?.cabBooking;
                  const hotel = item?.hotelBooking;

                  if (hotel?.isHotelBooked) {
                    return (
                      <tr key={key} className="bg-red-50 text-red-600 italic">
                        <td colSpan="5" className="px-4 py-2">
                          No hotel data
                        </td>
                      </tr>
                    );
                  } else if (cab?.isCabBooked) {
                    return (
                      <tr key={key} className=" relative">
                        <td className="px-4 py-2 text-sm">Cab</td>
                        <td className="px-4 py-2 text-sm">
                          {cab?.cabId?.name}
                        </td>
                        <td className="px-4 py-2 text-sm hidden lg:table-cell">
                          {cab?.pickupLocation}
                        </td>
                        <td className="px-4 py-2 text-sm hidden lg:table-cell">
                          {cab?.dropLocation}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          ₹{item?.totalPrice}
                        </td>
                        <td className="px-4 py-2 text-sm">{item?.status}</td>
                        <td className="px-4 py-2 text-sm">
                          <button className=" bg-gray-200 border px-2 py-1 rounded text-nowrap">
                            add review
                          </button>
                        </td>
                        <div className=" absolute right-0 top-0 bg-green-200 gap-1 rounded px-3 py-1 flex text-xs  *:w-5 *:h-5">
                          {[...Array(5)].map((_, key) => (
                            <Star className=" stroke-gray-500" />
                          ))}
                        </div>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={key} className="bg-gray-50 text-gray-500 italic">
                        <td colSpan="5" className="px-4 py-2">
                          Nothing to display
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
