import React, { useState } from "react";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";

const dummyBooking = {
  userId: "u123456",
  hotelBooking: {
    isHotelBooked: true,
    hotelId: "h987",
    roomID: "r321",
    totalGuests: 3,
  },
  cabBooking: {
    isCabBooked: false,
    cabId: null,
    pickupLocation: "",
    dropLocation: "",
    travelDate: null,
  },
  totalPrice: 8500,
  status: "success",
  createdAt: new Date("2025-05-12"),
};

const bookings = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  ...dummyBooking,
  status: i % 2 === 0 ? "pending" : "success",
  hotelBooking:
    i % 2 === 0
      ? dummyBooking.hotelBooking
      : {
          isHotelBooked: false,
          hotelId: null,
          roomID: null,
          totalGuests: 0,
        },
  cabBooking:
    i % 2 !== 0
      ? {
          isCabBooked: true,
          cabId: `cab00${i}`,
          pickupLocation: "Station",
          dropLocation: "Hotel",
          travelDate: new Date("2025-05-15"),
        }
      : dummyBooking.cabBooking,
}));

function Booking() {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bookings</h2>
        <button className="px-4 py-2 border border-gray-400 rounded-md text-sm hover:bg-gray-100">
          + Create Booking
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left w-8"></th>
              <th className="p-2 text-left">User ID</th>
              <th className="p-2 text-left">Booking Type</th>
              <th className="p-2 text-left">Type ID</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const isExpanded = expandedRows.includes(booking.id);
              const isHotel = booking.hotelBooking?.isHotelBooked;
              const isCab = booking.cabBooking?.isCabBooked;

              let type = "-";
              let typeId = "-";

              if (isHotel) {
                type = "Hotel";
                typeId = booking.hotelBooking.hotelId;
              } else if (isCab) {
                type = "Cab";
                typeId = booking.cabBooking.cabId;
              }

              return (
                <React.Fragment key={booking.id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <button onClick={() => toggleRow(booking.id)}>
                        {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                      </button>
                    </td>
                    <td className="p-2">{booking.userId}</td>
                    <td className="p-2">{type}</td>
                    <td className="p-2">{typeId}</td>
                    <td className="p-2">₹{booking.totalPrice}</td>
                    <td className="p-2 capitalize">{booking.status}</td>
                    <td className="p-2">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 space-x-2">
                      <button className="px-2 py-1 border border-gray-400 rounded text-xs hover:bg-gray-100">
                        <Pencil size={14} className="inline-block mr-1" />
                        Edit
                      </button>
                      <button className="px-2 py-1 border border-gray-400 rounded text-xs hover:bg-gray-100">
                        <Trash2 size={14} className="inline-block mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-gray-50">
                      <td colSpan="8" className="p-3 text-gray-700 text-sm">
                        {isHotel && (
                          <div className="space-y-1">
                            <div>
                              <strong>Room ID:</strong>{" "}
                              {booking.hotelBooking.roomID}
                            </div>
                            <div>
                              <strong>Total Guests:</strong>{" "}
                              {booking.hotelBooking.totalGuests}
                            </div>
                          </div>
                        )}
                        {isCab && (
                          <div className="space-y-1">
                            <div>
                              <strong>Pickup:</strong>{" "}
                              {booking.cabBooking.pickupLocation}
                            </div>
                            <div>
                              <strong>Drop:</strong>{" "}
                              {booking.cabBooking.dropLocation}
                            </div>
                            <div>
                              <strong>Travel Date:</strong>{" "}
                              {new Date(
                                booking.cabBooking.travelDate
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Booking;
