import React, { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
function Booking() {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [expandedRows, setExpandedRows] = useState([]);
  const [bookingdata, setbookingdata] = useState([]);
  const [isactive, setisactive] = useState(false);
  const [editdata, seteditdata] = useState({
    _id: "",
    userId: "",
    hotelId: "",
    roomID: "",
    totalGuests: "",
    cabId: "",
    pickupLocation: "",
    dropLocation: "",
    travelDate: "",
    totalPrice: "",
    status: "",
  });
  const handlechage = (e) => {
    const { name, value } = e.target;
    seteditdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(bookingdata);
  }, [bookingdata]);
  const convertToMongooseFormat = (editdata) => {
    const isHotelBooking = editdata?.hotelBooking?.hotelId ? true : false;

    return {
      id: editdata._id,
      userId: editdata.userId,

      hotelBooking: {
        isHotelBooked: isHotelBooking,
        hotelId: isHotelBooking ? editdata?.hotelBooking?.hotelId : undefined,
        roomID: isHotelBooking ? editdata?.hotelBooking?.roomID : undefined,
        totalGuests: isHotelBooking
          ? parseInt(editdata?.hotelBooking?.totalGuests, 10)
          : undefined,
      },

      cabBooking: {
        isCabBooked: !isHotelBooking,
        cabId: !isHotelBooking ? editdata.cabId : undefined,
        pickupLocation: !isHotelBooking ? editdata.pickupLocation : undefined,
        dropLocation: !isHotelBooking ? editdata.dropLocation : undefined,
        travelDate: !isHotelBooking ? new Date(editdata.travelDate) : undefined,
      },

      totalPrice: parseFloat(editdata.totalPrice),
      status: editdata.status,
    };
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = convertToMongooseFormat(editdata);
      const res = await axios.put(`${server_url}admin/update-booking`, {
        payload,
      });
      if (res.data) {
        toast.success("upadted successfully");
        setisactive(false);
        fetchBooking();
      }
    } catch (err) {
      if (err?.response?.data) {
        toast.error(err?.response?.data?.message);
      }
    }
  };
  const handleEdit = (e, data) => {
    e.preventDefault();
    setisactive(true);
    seteditdata(data);
  };
  const fetchBooking = useCallback(async () => {
    try {
      const records = await axios.get(`${server_url}admin/all-booking`);
      if (records.data) {
        setbookingdata(records.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteBokking = async (e, id) => {
    e.preventDefault();
    try {
      const result = await axios.delete(`${server_url}admin/delete-booking`, {
        data: { id },
      });

      if (result.data) {
        toast.success("record deleted");
        fetchBooking();
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className=" relative p-4 w-full h-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bookings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left w-8 lg:hidden"></th>
              <th className="p-2 text-left">User Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingdata.map((booking) => {
              const isExpanded = expandedRows.includes(booking._id);
              const isHotel = booking?.hotelBooking?.hotelId?._id;
              const isCab = booking?.cabBooking?.cabId?._id;

              let type = "-";
              let typeId = "-";

              if (isHotel) {
                type = "Hotel";
                typeId = booking?.hotelBooking?.hotelId?._id;
              } else if (isCab) {
                type = "Cab";
                typeId = booking?.cabBooking?.cabId?._id;
              }

              return (
                <React.Fragment key={booking._id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2 lg:hidden">
                      <button onClick={() => toggleRow(booking._id)}>
                        {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                      </button>
                    </td>
                    <td className="p-2">{booking.userId.name}</td>
                    <td className="p-2">{type}</td>
                    <td className="p-2">{typeId}</td>
                    <td className="p-2">₹{booking.totalPrice}</td>
                    <td className="p-2 capitalize">{booking.status}</td>
                    <td className="p-2">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 sm:space-x-2">
                      <button
                        onClick={(e) => {
                          handleEdit(e, booking);
                        }}
                        className="px-2 py-1 border border-gray-400 rounded text-xs hover:bg-gray-100"
                      >
                        <Pencil size={14} className="inline-block mr-1" />
                        <span className=" hidden lg:block"> Edit</span>
                      </button>
                      <button
                        onClick={(e) => {
                          deleteBokking(e, booking._id);
                        }}
                        className="px-2 py-1 border border-gray-400 rounded text-xs hover:bg-gray-100"
                      >
                        <Trash2 size={14} className="inline-block mr-1" />
                        <span className=" hidden lg:block">Delete</span>
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
                              {booking.hotelBooking.roomID._id}
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
      {isactive && (
        <BookingCoponent
          editdata={editdata}
          handlechage={handlechage}
          setisactive={setisactive}
          handlesubmit={handlesubmit}
        />
      )}
    </div>
  );
}

export default Booking;

const BookingCoponent = ({
  editdata,
  handlechage,
  setisactive,
  handlesubmit,
}) => {
  return (
    <div className="bg-black inset-0 flex justify-center items-center bg-opacity-80 absolute w-full h-full">
      <form
        onSubmit={handlesubmit}
        className="bg-white  p-6 px-10 rounded-lg w-[80%] lg:w-1/2 h-[80%] overflow-hidden overflow-y-scroll  space-y-4 hide-scrollbar"
      >
        <div className=" flex justify-between items-center">
          {" "}
          <h2 className="text-xl font-bold text-center">Booking Form</h2>
          <p
            className=" cursor-pointer"
            onClick={() => {
              setisactive(false);
            }}
          >
            X
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Choose Booking Type
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            name="bookingType"
            value={editdata.hotelBooking?.isHotelBooked ? "hotel" : "cab"}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">User ID</label>
          <input
            type="text"
            name="userId"
            value={editdata.userId?._id}
            onChange={handlechage}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter User ID"
          />
        </div>
        {editdata.bookingtype === "hotel" && (
          <>
            <div>
              <label className="block text-sm font-semibold">Hotel ID</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Hotel ID"
                onChange={handlechage}
                name="hotelId"
                value={editdata.hotelBooking.hotelId?._id}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Room ID</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Room ID"
                onChange={handlechage}
                name="roomID"
                value={editdata?.hotelBooking.roomID?._id}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Total Guests
              </label>
              <input
                type="number"
                value={editdata?.hotelBooking?.totalGuests}
                onChange={handlechage}
                name="totalGuests"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Guest Count"
              />
            </div>
          </>
        )}

        {/* Cab Booking Fields */}
        {editdata.bookingtype === "cab" && (
          <>
            <div>
              <label className="block text-sm font-semibold">Cab ID</label>
              <input
                onChange={handlechage}
                value={editdata.cabId}
                type="text"
                name="cabId"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Cab ID"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Pickup Location
              </label>
              <input
                type="text"
                value={editdata.pickupLocation}
                onChange={handlechage}
                name="pickupLocation"
                className="w-full border rounded px-3 py-2"
                placeholder="Pickup Location"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Drop Location
              </label>
              <input
                type="text"
                name="dropLocation"
                onChange={handlechage}
                value={editdata.dropLocation}
                className="w-full border rounded px-3 py-2"
                placeholder="Drop Location"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Travel Date</label>
              <input
                type="date"
                name="travelDate"
                onChange={handlechage}
                value={editdata.travelDate}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </>
        )}

        {/* Common Price and Status */}
        <div>
          <label className="block text-sm font-semibold">Total Price</label>
          <input
            type="number"
            name="totalPrice"
            className="w-full border rounded px-3 py-2"
            placeholder="Total Price"
            onChange={handlechage}
            value={editdata.totalPrice}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Status</label>
          <select
            onChange={handlechage}
            className="w-full border rounded px-3 py-2"
            name="status"
            value={editdata.status}
          >
            <option value="reject">Reject</option>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
