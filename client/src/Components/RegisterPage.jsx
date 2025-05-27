// import React, { useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     country: "",
//     state: "",
//     district: "",
//     city: "",
//     address: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post("http://localhost:5000/api/users/signup", {
//       formData
//       });

//       alert("✅ Registration successful!");
//       setFormData({
//         name: "",
//         email: "",
//         number: "",
//         country: "",
//         state: "",
//         district: "",
//         city: "",
//         address: "",
//         password: "",
//       });
//       navigate("/login");
//     } catch (error) {
//       alert(`❌ Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
//       <form
//         onSubmit={handleRegister}
//         className="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl"
//       >
//         <button
//           type="button"
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
//         >
//           <AiOutlineClose size={24} />
//         </button>

//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
//           Create Your Account
//         </h2>

//         <div className="grid sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 text-gray-600">Full Name</label>
//             <input
//               type="text"
//               required
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600">Mobile Number</label>
//             <input
//               type="tel"
//               required
//               name="number"
//               value={formData.number}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600">Email</label>
//             <input
//               type="email"
//               required
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600">Password</label>
//             <input
//               type="password"
//               required
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600">Country</label>
//             <input
//               type="text"
//               required
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600">State</label>
//             <input
//               type="text"
//               required
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600">District</label>
//             <input
//               type="text"
//               required
//               name="district"
//               value={formData.district}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600">City</label>
//             <input
//               type="text"
//               required
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block mb-1 text-gray-600">Full Address</label>
//           <textarea
//             name="address"
//             required
//             value={formData.address}
//             onChange={handleChange}
//             rows={3}
//             className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400 resize-none"
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`mt-6 w-full text-white py-2 rounded transition text-lg ${
//             loading
//               ? "bg-blue-300 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;


import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    state: "",
    district: "",
    city: "",
    address: "",
    password: "",
    image:null,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("❌ File size exceeds 10MB");
      return;
    }

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      toast.success("✅ Profile photo uploaded successfully!");
    }
  };

  const uploadImage = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "staynride");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/do1ui12rk/image/upload",
        uploadData
      );
      return response.data?.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Upload failed. Max size: 10MB");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("❗ Please upload a profile photo.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", {formData});

      if (response.status === 201 || response.status === 200) {
        toast.success("✅ Registration successful!");
        setFormData({
          name: "",
          email: "",
          number: "",
          country: "",
          state: "",
          district: "",
          city: "",
          address: "",
          password: "",
          image: "",
        });
        navigate("/login");
      } else {
        toast.error("Unexpected response. Try again.");
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "❌ Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => navigate("/");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
        <form
          onSubmit={handleRegister}
          className="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl"
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          >
            <AiOutlineClose size={24} />
          </button>

          <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
            Create Your Account
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "name", label: "Full Name" },
              { name: "number", label: "Mobile Number", type: "tel" },
              { name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" },
              { name: "country", label: "Country" },
              { name: "state", label: "State" },
              { name: "district", label: "District" },
              { name: "city", label: "City" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <label className="block mb-1 text-gray-600">{label}</label>
                <input
                  type={type}
                  required
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block mb-1 text-gray-600">Full Address</label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400 resize-none"
            ></textarea>
          </div>

         
          <div className="mt-6 text-center">
            {formData.image && (
              <img
                src={formData.image}
                alt="Profile"
                className="mx-auto mb-2 w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mb-2"
            />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className={`mt-6 w-full text-white py-2 rounded transition text-lg ${
              loading || uploading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;


