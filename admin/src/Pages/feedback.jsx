import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";
import people from "../assets/images/people.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CloudinaryUpload from "../utils/UploadCloudinary";
import CartSkeleton from "../component/CartSkeleton";
const server_url = process.env.REACT_APP_SERVER_URL;

function Feedback() {
  const { uploadImage } = CloudinaryUpload();
  const [feedbacks, setFeedbacks] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    contact: "",
    description: "",
    image: "",
  });

  const fetchFeedbacks = useCallback(async () => {
    setloading(true);
    try {
      const res = await axios.get(`${server_url}public/get-feedback`);
      setFeedbacks(res.data.data || []);
      setloading(false);
    } catch (err) {
      setloading(false);
      console.error("Failed to fetch feedbacks:", err);
      toast.error("Could not load feedbacks");
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const toggleCard = (id) =>
    setExpandedCard((prev) => (prev === id ? null : id));

  const openCreateModal = () => {
    setEditMode(false);
    setFormData({
      id: null,
      name: "",
      email: "",
      contact: "",
      description: "",
      image: "",
    });
    setFormModalOpen(true);
  };

  const openEditModal = (fb) => {
    setEditMode(true);
    setFormData({ ...fb });
    setFormModalOpen(true);
  };

  const closeFormModal = () => setFormModalOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = { ...formData };
      if (formData.image && formData.image.startsWith("data:")) {
        const url = await uploadImage(formData.image);
        if (!url) {
          toast.error("Image upload failed");
          return;
        }
        payload.image = url;
      }

      if (editMode) {
        await axios.put(`${server_url}admin/update-feedback`, payload);
        toast.success("Feedback updated");
      } else {
        await axios.post(`${server_url}public/create-feedback`, payload);
        toast.success("Feedback created");
      }

      closeFormModal();
      fetchFeedbacks();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong");
    }
  };

  const deleteFeedback = async (id) => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ml-2",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwindButtons.fire({
      title: "Are you sure?",
      text: "This feedback will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${server_url}admin/delete-feedback`, {
          data: { id },
        });

        swalWithTailwindButtons.fire({
          title: "Deleted!",
          text: "Feedback has been deleted.",
          icon: "success",
        });

        fetchFeedbacks(); // Refresh list
      } catch (err) {
        console.error("Delete error:", err);

        swalWithTailwindButtons.fire({
          title: "Error",
          text: "Could not delete the feedback.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwindButtons.fire({
        title: "Cancelled",
        text: "Feedback deletion has been cancelled.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-4 font-sans text-gray-800">
      {loading === true ? (
        <CartSkeleton />
      ) : (
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Feedback List</h2>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 px-3 py-1.5 rounded-md text-sm"
            >
              <Plus className="h-4 w-4" /> Create Feedback
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                <div className="flex gap-4 items-center mb-3">
                  <img
                    src={fb.image || people}
                    alt={`${fb.name} avatar`}
                    className="w-12 h-12 border-2 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{fb.name}</h3>
                    <p className="text-sm text-gray-500">{fb.email}</p>
                  </div>
                </div>

                <p className="text-sm mb-1">
                  <span className="font-medium">Contact:</span> {fb.contact}
                </p>

                <div className="text-sm mb-2">
                  <span className="font-medium">Feedback:</span>{" "}
                  {expandedCard === fb.id
                    ? fb.description
                    : fb.description.length > 40
                    ? `${fb.description.slice(0, 40)}…`
                    : fb.description}
                </div>

                {fb.description.length > 40 && (
                  <button
                    onClick={() => toggleCard(fb.id)}
                    className="text-blue-600 text-xs flex items-center gap-1"
                  >
                    {expandedCard === fb.id ? (
                      <>
                        Show less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}

                <div className="flex gap-3 mt-4 justify-end">
                  <button
                    onClick={() => openEditModal(fb)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteFeedback(fb._id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Form Modal ──────────────────────────────────────────────── */}
          {formModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
                <button
                  onClick={closeFormModal}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
                <h3 className="text-xl font-bold mb-4">
                  {editMode ? "Edit Feedback" : "Create Feedback"}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleFormChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <textarea
                    name="description"
                    placeholder="Your feedback"
                    rows={4}
                    value={formData.description}
                    onChange={handleFormChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <div>
                    <label className="block mb-1 font-medium">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-16 h-16 mt-2 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {editMode ? "Update Feedback" : "Submit Feedback"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Feedback;
