import React, { useCallback, useEffect, useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";
import cabimg from "../assets/images/cab.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import SkelitonLoader from "../component/SkelitonLoader";
import CloudinaryUpload from "../utils/UploadCloudinary";
function Cabs() {
  const { uploadImage } = CloudinaryUpload();
  const [isloading, setisloading] = useState(false);
  const [cabs, setCabs] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
    image: null,
    address: {
      city: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
      fullAddress: "",
    },
  });

  const server_url = process.env.REACT_APP_SERVER_URL;

  const fetchCabs = useCallback(async () => {
    setisloading(true);
    try {
      const result = await axios.get(`${server_url}public/all-cabs`);
      if (result.data) setCabs(result.data);
      setisloading(false);
    } catch (err) {
      setisloading(false);
      console.log(err);
    }
  }, [server_url]);

  useEffect(() => {
    fetchCabs();
  }, [fetchCabs]);

  const openCreateModal = () => {
    setEditMode(false);
    setFormData({
      name: "",
      model: "",
      price: "",
      address: {
        city: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
        fullAddress: "",
      },
    });
    setFormModalOpen(true);
  };
  useEffect(() => {
    console.log(cabs);
  }, [cabs]);
  const openEditModal = (cab) => {
    setEditMode(true);
    setFormData({
      id: cab._id,
      name: cab.name || "",
      model: cab.model || "",
      price: cab.price || "",
      address: cab.address || {
        city: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
        fullAddress: "",
      },
    });
    setFormModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedFormData = { ...formData };

      if (formData.image && typeof formData.image !== "string") {
        const uploadedUrl = await uploadImage(formData.image);
        if (!uploadedUrl) {
          toast.error("Image upload failed");
          return;
        }
        updatedFormData.image = uploadedUrl;
      }

      if (editMode) {
        await axios.put(`${server_url}admin/update-cab`, updatedFormData);
        toast.success("Updated successfully");
      } else {
        await axios.post(`${server_url}admin/create-cab`, updatedFormData);
        toast.success("Created successfully");
      }

      fetchCabs();
      setFormModalOpen(false);
    } catch (err) {
      console.error("Submit failed:", err);
      toast.error("Something went wrong, try again later");
    }
  };

  const deleteCabs = async (id) => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwindButtons.fire({
      title: "Are you sure?",
      text: "This cab will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${server_url}admin/delete-cab`, {
          data: { id },
        });

        swalWithTailwindButtons.fire({
          title: "Deleted!",
          text: "Cab has been deleted.",
          icon: "success",
        });

        fetchCabs();
      } catch (err) {
        console.log(err);

        swalWithTailwindButtons.fire({
          title: "Error",
          text: err.response?.data?.message || "Failed to delete the cab.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwindButtons.fire({
        title: "Cancelled",
        text: "The cab was not deleted.",
        icon: "error",
      });
    }
  };

  const handleViewMore = (cab) => setSelectedCab(cab);
  const closeViewModal = () => setSelectedCab(null);

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      {isloading === true ? (
        <SkelitonLoader />
      ) : (
        <div>
          {" "}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Cab Listings
            </h2>
            <button
              onClick={openCreateModal}
              className="px-3 py-1 rounded-md bg-blue-600 text-white"
            >
              + Create Cab
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cabs.map((cab) => (
              <div
                onClick={() => handleViewMore(cab)}
                key={cab._id}
                className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden border border-gray-200 relative"
              >
                <img
                  src={cab.image != null ? cab.image : cabimg}
                  alt={cab.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {cab.name}
                  </h3>
                  <p className="text-sm text-gray-600">Model: {cab.model}</p>
                  <p className="text-sm text-gray-600">Price: ₹{cab.price}</p>
                  <div className=" flex justify-between items-center">
                    <button
                      onClick={() => openEditModal(cab)}
                      className="px-4 py-1 bg-gray-400 rounded text-sm text-white"
                      aria-label="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCabs(cab._id)}
                      className="px-4 py-1 bg-red-500 rounded text-sm text-white"
                      aria-label="Delete"
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View More Modal */}
      {selectedCab && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={closeViewModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedCab.name}</h3>
            <img
              src={selectedCab.image}
              alt={selectedCab.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Model:</strong> {selectedCab.model}
              </p>
              <p>
                <strong>Price:</strong> ₹{selectedCab.price}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedCab.createdAt).toLocaleString()}
              </p>
              {selectedCab.address && (
                <>
                  <p>
                    <strong>City:</strong> {selectedCab.address.city}
                  </p>
                  <p>
                    <strong>District:</strong> {selectedCab.address.district}
                  </p>
                  <p>
                    <strong>State:</strong> {selectedCab.address.state}
                  </p>
                  <p>
                    <strong>Country:</strong> {selectedCab.address.country}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {selectedCab.address.pincode}
                  </p>
                  <p>
                    <strong>Full Address:</strong>{" "}
                    {selectedCab.address.fullAddress}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {formModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setFormModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">
              {editMode ? "Edit Cab" : "Create Cab"}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Cab Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                  className="block w-full text-sm border rounded px-3 py-2"
                />
                {formData.image && (
                  <img
                    src={
                      typeof formData.image === "string"
                        ? formData.image
                        : URL.createObjectURL(formData.image)
                    }
                    alt="Preview"
                    className="mt-2 h-32 object-cover rounded border"
                  />
                )}
              </div>

              <input
                type="text"
                name="name"
                placeholder="Cab Name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="address.city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleFormChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="address.district"
                  placeholder="District"
                  value={formData.address.district}
                  onChange={handleFormChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="address.state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleFormChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="address.country"
                  placeholder="Country"
                  value={formData.address.country}
                  onChange={handleFormChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="address.pincode"
                  placeholder="Pincode"
                  value={formData.address.pincode}
                  onChange={handleFormChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  name="address.fullAddress"
                  placeholder="Full Address"
                  value={formData.address.fullAddress}
                  onChange={handleFormChange}
                  className="col-span-2 border px-3 py-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editMode ? "Update Cab" : "Create Cab"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cabs;
