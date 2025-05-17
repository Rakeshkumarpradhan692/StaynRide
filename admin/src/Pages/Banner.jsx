import React, { useState } from "react";

function Banner() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      name: "Tropical Retreat",
      description: "Escape to a beachside paradise with luxury comforts.",
      image: "https://via.placeholder.com/400x250?text=Tropical+Retreat",
    },
    {
      id: 2,
      name: "Mountain Cabin",
      description: "Enjoy peace in the mountains with a cozy cabin view.",
      image: "https://via.placeholder.com/400x250?text=Mountain+Cabin",
    },
    {
      id: 3,
      name: "Urban Getaway",
      description: "Stay in the heart of the city with style and ease.",
      image: "https://via.placeholder.com/400x250?text=Urban+Getaway",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreate = () => {
    if (!formData.name || !formData.description || !formData.image) return;

    const newBanner = {
      id: Date.now(),
      ...formData,
    };

    setBanners((prev) => [...prev, newBanner]);
    setFormData({ name: "", description: "", image: null });
    setShowModal(false);
  };

  return (
    <div className="relative z-0 bg-gray-100 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Our Banners</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 rounded-md border bg-gray-200 text-gray-700"
        >
          + Create Banner
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={banner.image}
              alt={banner.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{banner.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{banner.description}</p>
              <div className="flex justify-between mt-4">
                <button className="px-4 py-1 bg-gray-400 rounded text-sm text-white">
                  Edit
                </button>
                <button className="px-4 py-1 bg-red-500 rounded text-sm text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <>
          <div
            className=" inset-0 bg-black absolute bg-opacity-35"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="fixed top-1/2 border left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-20 p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Create New Banner</h3>

            <input
              type="text"
              name="name"
              placeholder="Banner Name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full mb-3 p-2 border rounded"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="block w-full mb-3 p-2 border rounded"
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="block w-full mb-3 p-2 border rounded"
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-40 object-cover mb-3 rounded"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Banner;
