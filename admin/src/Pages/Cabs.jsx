import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import cabimg from "../assets/images/cab.jpg";
function Cabs() {
  const cabs = [
    {
      id: 1,
      name: "City Cab",
      model: "Swift",
      images: "https://via.placeholder.com/300x180?text=City+Cab",
      price: 1200,
      address: {
        country: "India",
        state: "Odisha",
        district: "Cuttack",
        city: "Cuttack",
        pincode: "753001",
        fullAddress: "Link Road, Near Bus Stand",
      },
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "Airport Taxi",
      model: "Innova",
      images: "https://via.placeholder.com/300x180?text=Airport+Taxi",
      price: 1800,
      address: {
        country: "India",
        state: "Delhi",
        district: "New Delhi",
        city: "Delhi",
        pincode: "110001",
        fullAddress: "Airport Road, Terminal 3",
      },
      createdAt: new Date(),
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit cab with id ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete cab with id ${id}`);
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Cab Listings</h2>
        <p>
          <button className=" px-2 py-1 rounded-md bg-gray-100">
            + create cab
          </button>
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cabs.map((cab) => (
          <div
            key={cab.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative"
          >
            <img
              src={
                cabimg || "https://via.placeholder.com/300x180?text=No+Image"
              }
              alt={cab.name}
              className="w-full h-44 object-cover"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEdit(cab.id)}
                className="p-1 bg-gray-300 rounded hover:bg-gray-400"
                aria-label="Edit"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => handleDelete(cab.id)}
                className="p-1 bg-gray-400 rounded hover:bg-gray-500"
                aria-label="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {cab.name}
              </h3>
              <p className="text-sm text-gray-600">Model: {cab.model}</p>
              <p className="text-sm text-gray-600">Price: ₹{cab.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cabs;
