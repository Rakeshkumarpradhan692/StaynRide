import React, { useState, useEffect } from "react";
import SkelitonLoader from "./SkelitonLoader";
function Rooms() {
  // Mock data for rooms
  const mockRooms = [
    {
      _id: "1",
      hotelId: "101",
      roomNumber: 101,
      roomType: "Single",
      price: 99,
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      ],
      createdAt: "2023-07-15T08:00:00Z",
    },
    {
      _id: "2",
      hotelId: "101",
      roomNumber: 102,
      roomType: "Double",
      price: 149,
      images: [
        "https://images.unsplash.com/photo-1566669437685-bc1c0df9a5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      ],
      createdAt: "2023-07-15T08:05:00Z",
    },
    {
      _id: "2",
      hotelId: "101",
      roomNumber: 102,
      roomType: "Double",
      price: 149,
      images: [
        "https://images.unsplash.com/photo-1566669437685-bc1c0df9a5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      ],
      createdAt: "2023-07-15T08:05:00Z",
    },
    {
      _id: "2",
      hotelId: "101",
      roomNumber: 102,
      roomType: "Double",
      price: 149,
      images: [
        "https://images.unsplash.com/photo-1566669437685-bc1c0df9a5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      ],
      createdAt: "2023-07-15T08:05:00Z",
    },
    {
      _id: "2",
      hotelId: "101",
      roomNumber: 102,
      roomType: "Double",
      price: 149,
      images: [
        "https://images.unsplash.com/photo-1566669437685-bc1c0df9a5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      ],
      createdAt: "2023-07-15T08:05:00Z",
    },
    {
      _id: "2",
      hotelId: "101",
      roomNumber: 102,
      roomType: "Double",
      price: 149,
      images: [
        "https://images.unsplash.com/photo-1566669437685-bc1c0df9a5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      ],
      createdAt: "2023-07-15T08:05:00Z",
    },
    {
      _id: "3",
      hotelId: "101",
      roomNumber: 201,
      roomType: "family",
      price: 199,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      ],
      createdAt: "2023-07-16T09:00:00Z",
    },
  ];

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "Single",
    price: "",
    images: [],
  });

  // Load mock data on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setRooms(mockRooms);
      setLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "roomNumber" || name === "price" ? Number(value) : value,
    });
  };

  // Handle image upload (mock implementation)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const mockImageUrls = files.map(
      () =>
        `https://via.placeholder.com/300x200?text=Room+${
          formData.roomNumber || "Image"
        }`
    );
    setFormData({
      ...formData,
      images: [...formData.images, ...mockImageUrls],
    });
  };

  // Submit form (create or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRoom) {
      // Update existing room
      setRooms(
        rooms.map((room) =>
          room._id === editingRoom._id ? { ...room, ...formData } : room
        )
      );
    } else {
      // Create new room
      const newRoom = {
        _id: Math.random().toString(36).substr(2, 9),
        hotelId: "101",
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setRooms([...rooms, newRoom]);
    }
    resetForm();
  };

  // Edit room
  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      price: room.price,
      images: room.images,
    });
    setShowForm(true);
  };
  const handleDelete = (id) => {
    setRooms(rooms.filter((room) => room._id !== id));
  };
  const resetForm = () => {
    setFormData({
      roomNumber: "",
      roomType: "Single",
      price: "",
      images: [],
    });
    setEditingRoom(null);
    setShowForm(false);
  };

  if (loading)
    return (
      <div className="text-center py-8">
        <SkelitonLoader />
      </div>
    );
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className=" w-full h-full overflow-hidden box-border px-10 py-5">
      <div className=" flex justify-between">
        {" "}
        <h1 className="text-3xl font-bold mb-6">Hotel Rooms Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
        >
          {showForm ? "Cancel" : "Add New Room"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingRoom ? "Edit Room" : "Add New Room"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Room Number</label>
                <input
                  type="number"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Room Type</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Price per night
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="flex flex-wrap mt-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative m-1">
                      <img
                        src={img}
                        alt={`Room ${index}`}
                        className="h-16 w-16 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            images: formData.images.filter(
                              (_, i) => i !== index
                            ),
                          })
                        }
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {editingRoom ? "Update Room" : "Add Room"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full overflow-hidden box-border">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              {room.images.length > 0 ? (
                <img
                  src={room.images[0]}
                  alt={`Room ${room.roomNumber}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                Room #{room.roomNumber}
              </h3>
              <p className="text-gray-600 mb-1">Type: {room.roomType}</p>
              <p className="text-gray-600 mb-3">
                Price: ${room.price} per night
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(room)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
