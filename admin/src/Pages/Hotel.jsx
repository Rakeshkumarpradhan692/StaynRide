import React, { useState } from "react";

const hotelsData = [
  {
    id: "h1",
    hotelType: "Deluxe",
    name: "Sunrise Hotel",
    description: "Comfortable and luxury stay in the city center.",
    country: "USA",
    state: "California",
    district: "LA District",
    city: "Los Angeles",
    pincode: "90001",
    address: "123 Sunset Blvd",
    contactNumber: "1234567890",
    checkInTime: "2:00 PM",
    checkOutTime: "11:00 AM",
    rating: 4.5,
    availability: true,
    images: [
      "https://via.placeholder.com/60x40?text=Hotel1",
      "https://via.placeholder.com/60x40?text=Hotel2",
    ],
    rooms: [
      {
        id: "r1",
        roomNumber: "101",
        roomType: "Suite",
        pricePerNight: 150,
        availability: true,
        amenities: ["WiFi", "TV", "AC"],
        images: ["https://via.placeholder.com/40x30?text=R1-1"],
      },
      {
        id: "r2",
        roomNumber: "102",
        roomType: "Double",
        pricePerNight: 100,
        availability: false,
        amenities: ["WiFi", "AC"],
        images: ["https://via.placeholder.com/40x30?text=R2-1"],
      },
    ],
  },
  {
    id: "h2",
    hotelType: "Luxury",
    name: "Ocean View Resort",
    description: "Enjoy beachfront luxury with stunning views.",
    country: "USA",
    state: "Florida",
    district: "Miami District",
    city: "Miami",
    pincode: "33101",
    address: "789 Ocean Drive",
    contactNumber: "0987654321",
    checkInTime: "3:00 PM",
    checkOutTime: "12:00 PM",
    rating: 5,
    availability: true,
    images: [
      "https://via.placeholder.com/60x40?text=Hotel3",
      "https://via.placeholder.com/60x40?text=Hotel4",
    ],
    rooms: [
      {
        id: "r3",
        roomNumber: "201",
        roomType: "Suite",
        pricePerNight: 200,
        availability: true,
        amenities: ["WiFi", "TV", "Pool"],
        images: ["https://via.placeholder.com/40x30?text=R3-1"],
      },
    ],
  },
];

export default function HotelsTable() {
  const [expandedHotelIds, setExpandedHotelIds] = useState([]);
  const [showRoomsFor, setShowRoomsFor] = useState(null);

  // Toggle hotel detail dropdown
  const toggleHotelDetails = (id) => {
    setExpandedHotelIds((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // Toggle rooms view
  const toggleRooms = (id) => {
    setShowRoomsFor((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white border border-gray-300 rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Hotels</h2>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300 text-center w-10">+</th>
            <th className="p-2 border border-gray-300 text-left">Name</th>
            <th className="p-2 border border-gray-300 text-left">Type</th>
            <th className="p-2 border border-gray-300 text-left">City</th>
            <th className="p-2 border border-gray-300 text-left">Rating</th>
            <th className="p-2 border border-gray-300 text-left">
              Availability
            </th>
            <th className="p-2 border border-gray-300 text-center">
              View Rooms
            </th>
          </tr>
        </thead>
        <tbody>
          {hotelsData.map((hotel) => {
            const isExpanded = expandedHotelIds.includes(hotel.id);
            const isRoomsShown = showRoomsFor === hotel.id;
            return (
              <React.Fragment key={hotel.id}>
                <tr className="border border-gray-300 hover:bg-gray-50">
                  <td
                    className="p-2 border border-gray-300 text-center cursor-pointer select-none"
                    onClick={() => toggleHotelDetails(hotel.id)}
                    title={isExpanded ? "Hide Details" : "Show Details"}
                  >
                    {isExpanded ? "−" : "+"}
                  </td>
                  <td className="p-2 border border-gray-300">{hotel.name}</td>
                  <td className="p-2 border border-gray-300">
                    {hotel.hotelType}
                  </td>
                  <td className="p-2 border border-gray-300">{hotel.city}</td>
                  <td className="p-2 border border-gray-300">{hotel.rating}</td>
                  <td className="p-2 border border-gray-300">
                    {hotel.availability ? "Available" : "Not Available"}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    <button
                      onClick={() => toggleRooms(hotel.id)}
                      className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100 text-xs"
                    >
                      {isRoomsShown ? "Hide Rooms" : "View Rooms"}
                    </button>
                  </td>
                </tr>

                {/* Expanded hotel details row */}
                {isExpanded && (
                  <tr>
                    <td
                      colSpan="7"
                      className="bg-gray-50 p-4 border border-gray-300"
                    >
                      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                        <div>
                          <strong>Description:</strong> {hotel.description}
                        </div>
                        <div>
                          <strong>Address:</strong> {hotel.address},{" "}
                          {hotel.district}, {hotel.state}, {hotel.country} -{" "}
                          {hotel.pincode}
                        </div>
                        <div>
                          <strong>Contact:</strong> {hotel.contactNumber}
                        </div>
                        <div>
                          <strong>Check In:</strong> {hotel.checkInTime}
                        </div>
                        <div>
                          <strong>Check Out:</strong> {hotel.checkOutTime}
                        </div>
                        <div className="flex space-x-2">
                          <strong>Images:</strong>
                          {hotel.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`hotel-${hotel.name}-${i}`}
                              className="w-16 h-10 object-cover rounded border border-gray-300"
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Rooms table */}
                {isRoomsShown && (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-4 bg-white border border-gray-300"
                    >
                      <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 border border-gray-300 text-left">
                              Room No.
                            </th>
                            <th className="p-2 border border-gray-300 text-left">
                              Type
                            </th>
                            <th className="p-2 border border-gray-300 text-left">
                              Price/Night ($)
                            </th>
                            <th className="p-2 border border-gray-300 text-left">
                              Availability
                            </th>
                            <th className="p-2 border border-gray-300 text-left">
                              Amenities
                            </th>
                            <th className="p-2 border border-gray-300 text-left">
                              Images
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {hotel.rooms.map((room) => (
                            <tr
                              key={room.id}
                              className="border border-gray-300 hover:bg-gray-50"
                            >
                              <td className="p-2 border border-gray-300">
                                {room.roomNumber}
                              </td>
                              <td className="p-2 border border-gray-300">
                                {room.roomType}
                              </td>
                              <td className="p-2 border border-gray-300">
                                {room.pricePerNight}
                              </td>
                              <td className="p-2 border border-gray-300">
                                {room.availability ? "Yes" : "No"}
                              </td>
                              <td className="p-2 border border-gray-300">
                                {room.amenities.join(", ")}
                              </td>
                              <td className="p-2 border border-gray-300">
                                {room.images.map((img, i) => (
                                  <img
                                    key={i}
                                    src={img}
                                    alt={`room-${room.roomNumber}-${i}`}
                                    className="w-12 h-8 object-cover rounded border border-gray-300"
                                  />
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
