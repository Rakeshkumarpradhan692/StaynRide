import React, { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const dummyBanners = [
  {
    id: 1,
    name: "Summer Sale",
    image: "https://via.placeholder.com/150x80.png?text=Summer+Sale",
    description: "Get 40% off on all bookings",
    createdAt: new Date("2025-05-01"),
  },
  {
    id: 2,
    name: "Winter Delight",
    image: "https://via.placeholder.com/150x80.png?text=Winter+Delight",
    description: "Flat ₹999 for premium rooms!",
    createdAt: new Date("2025-05-10"),
  },
];

function Banner() {
  const [banners, setBanners] = useState(dummyBanners);
  const [showForm, setShowForm] = useState(false);
  const [newBanner, setNewBanner] = useState({
    name: "",
    image: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewBanner({ ...newBanner, image: files[0] });
    } else {
      setNewBanner({ ...newBanner, [name]: value });
    }
  };

  const handleCreate = () => {
    const newId = banners.length + 1;
    const imageUrl = newBanner.image
      ? URL.createObjectURL(newBanner.image)
      : "";
    const createdAt = new Date();

    setBanners([
      ...banners,
      {
        id: newId,
        name: newBanner.name,
        image: imageUrl,
        description: newBanner.description,
        createdAt,
      },
    ]);

    setShowForm(false);
    setNewBanner({ name: "", image: null, description: "" });
  };

  const handleDelete = (id) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Banners</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-1.5 bg-gray-200 text-sm rounded hover:bg-gray-300"
        >
          <Plus size={16} className="inline mr-1" />
          Create Banner
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto text-sm">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <img
                    src={banner.image}
                    alt={banner.name}
                    className="w-32 h-auto rounded"
                  />
                </td>
                <td className="p-2 font-medium">{banner.name}</td>
                <td className="p-2">{banner.description}</td>
                <td className="p-2">
                  {new Date(banner.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 space-x-2">
                  <button className="px-2 py-1 rounded border hover:bg-gray-200">
                    <Pencil size={14} className="inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="px-2 py-1 rounded border hover:bg-gray-200"
                  >
                    <Trash2 size={14} className="inline mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Create New Banner
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Banner Name"
                value={newBanner.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              />
              <textarea
                name="description"
                value={newBanner.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none"
              ></textarea>
              <button
                onClick={handleCreate}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
              >
                Submit Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
