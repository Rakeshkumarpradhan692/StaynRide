import React, { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";
import Swal from "sweetalert2";
import TableSkeliton from "../component/TableSkeliton";
import axios from "axios";
import toast from "react-hot-toast";
function Booking() {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [expandedRows, setExpandedRows] = useState([]);
  const [bookingdata, setbookingdata] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [isactiveedit, setisactiveedit] = useState(false);
  const [isactivecreate, setisactivecreate] = useState(false);

  const dataFormat = {
    username: "",
    useremail: "",
    userId: "",
    isHotelBooked: "",
    hotelId: "",
    roomID: "",
    totalGuests: "",
    isCabBooked: "",
    cabId: "",
    pickupLocation: "",
    dropLocation: "",
    travelDate: "",
    totalPrice: "",
    status: "",
    bookingType: "",
  };
  const [createdata, setcreatedata] = useState({ ...dataFormat });
  const [editdata, seteditdata] = useState({});
  const handlechage = (e) => {
    const { name, value } = e.target;
    if (isactivecreate) {
      setcreatedata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (isactiveedit) {
      seteditdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    console.log(bookingdata);
  }, [bookingdata]);

  const handleCreate = () => {
    setisactiveedit(false);
    setisactivecreate(true);
  };
  const handleEdit = (e, data) => {
    e.preventDefault();
    setisactiveedit(true);
    setisactivecreate(false);
    const bookingdata = {
      _id: data._id || "",
      username: data?.userId?.name || data?.username || "",
      useremail: data?.userId?.email || data?.useremail || "",
      userId: data?.userId?._id || data?.userId || "",
      isHotelBooked: data?.hotelBooking?.isHotelBooked || false,
      hotelId: data?.hotelBooking?.hotelId?._id || data?.hotelId || "",
      roomID: data?.hotelBooking?.roomID || "",
      totalGuests: data?.hotelBooking?.totalGuests || 0,
      isCabBooked: data?.cabBooking?.isCabBooked || false,
      cabId: data?.cabBooking?.cabId?._id || data?.cabId || "",
      pickupLocation: data?.cabBooking?.pickupLocation || "",
      dropLocation: data?.cabBooking?.dropLocation || "",
      travelDate: data?.cabBooking?.travelDate || "",
      totalPrice: data?.totalPrice || 0,
      status: data?.status || "",
      bookingType: data?.bookingType || "",
    };

    seteditdata(bookingdata);
    console.log("Updated editdata", bookingdata);
  };

  const convertToMongooseFormat = () => {
    const data = isactivecreate ? createdata : isactiveedit ? editdata : null;
    if (!data) return null;

    const mongooseFormattedData = {
      ...(isactiveedit && data._id ? { id: data._id } : {}),
      userId: data.userId,
      hotelBooking: {
        isHotelBooked: data.bookingType === "Hotel" ? true : false,
        hotelId: data.hotelId || null,
        roomID: data.roomID || null,
        totalGuests: Number(data.totalGuests) || 0,
      },
      cabBooking: {
        isCabBooked: data.bookingType === "Cab" ? true : false,
        cabId: data.cabId || null,
        pickupLocation: data.pickupLocation || "",
        dropLocation: data.dropLocation || "",
        travelDate: data.travelDate ? new Date(data.travelDate) : null,
      },
      totalPrice: Number(data.totalPrice) || 0,
      status: data.status || "pending",
    };

    return mongooseFormattedData;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const payload = convertToMongooseFormat();
    try {
      const request = isactivecreate
        ? axios.post(`${server_url}public/create-booking`, { payload })
        : axios.put(`${server_url}admin/update-booking`, { payload });

      const res = await request;

      if (res.data) {
        toast.success(
          isactivecreate ? "Created successfully" : "Updated successfully"
        );

        setisactivecreate(false);
        setisactiveedit(false);
        fetchBooking();

        if (isactivecreate) {
          setcreatedata((prev) => ({
            ...prev,
            username: "",
            useremail: "",
            userId: "",
            isHotelBooked: "",
            hotelId: "",
            roomID: "",
            totalGuests: "",
            isCabBooked: "",
            cabId: "",
            pickupLocation: "",
            dropLocation: "",
            travelDate: "",
            totalPrice: "",
            status: "",
            bookingType: "",
          }));
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Updated editdata is", editdata);
  }, [editdata]);

  const fetchBooking = useCallback(async () => {
    setisloading(true);
    try {
      const records = await axios.get(`${server_url}admin/all-booking`);
      if (records.data) {
        setbookingdata(records.data.data);
      }
      setisloading(false);
    } catch (err) {
      setisloading(false);
      console.log(err);
    }
  }, [server_url]);

  const deleteBokking = async (e, id) => {
    e.preventDefault();

    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2",
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwindButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${server_url}admin/delete-booking`,
          {
            data: { id },
          }
        );

        if (response.data) {
          swalWithTailwindButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          fetchBooking();
        }
      } catch (err) {
        console.log(err.response?.data?.message);
        swalWithTailwindButtons.fire({
          title: "Error!",
          text: err.response?.data?.message || "Something went wrong.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwindButtons.fire({
        title: "Cancelled",
        text: "Your file is safe :)",
        icon: "error",
      });
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
      {isloading === true ? (
        <TableSkeliton />
      ) : (
        <div>
          {" "}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Bookings</h2>
            <button
              onClick={handleCreate}
              className="px-3 py-1 rounded-md bg-blue-600 text-white"
            >
              + Create booking
            </button>
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
                      <tr className="border-b bg-white hover:bg-gray-50">
                        <td className="p-2 lg:hidden">
                          <button onClick={() => toggleRow(booking._id)}>
                            {isExpanded ? (
                              <Minus size={18} />
                            ) : (
                              <Plus size={18} />
                            )}
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
                        <td className="p-2 sm:space-x-2 flex ">
                          <button
                            onClick={(e) => {
                              handleEdit(e, booking);
                            }}
                            className="px-2 py-1 lg:flex border border-gray-400 rounded text-xs hover:bg-gray-100"
                          >
                            <Pencil size={14} className="inline-block mr-1" />
                            <span className=" hidden lg:block"> Edit</span>
                          </button>
                          <button
                            onClick={(e) => {
                              deleteBokking(e, booking._id);
                            }}
                            className="px-2 lg:flex py-1 border border-gray-400 rounded text-xs hover:bg-gray-100"
                          >
                            <Trash2 size={14} className="inline-block mr-1" />
                            <span className=" hidden lg:block">Delete</span>
                          </button>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-white">
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
        </div>
      )}

      {isactiveedit && (
        <BookingCoponent
          data={editdata}
          handlechage={handlechage}
          setisactive={setisactiveedit}
          handlesubmit={handlesubmit}
          componentType="Edit"
        />
      )}
      {isactivecreate && (
        <BookingCoponent
          data={createdata}
          handlechage={handlechage}
          setisactive={setisactivecreate}
          handlesubmit={handlesubmit}
          componentType="Create"
        />
      )}
    </div>
  );
}

export default Booking;

const BookingCoponent = ({
  data,
  handlechage,
  setisactive,
  handlesubmit,
  componentType,
}) => {
  // useEffect(() => {
  //   console.log("create data", data);
  // }, [data]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handlesubmit}
        className="bg-white  p-6 px-10 rounded-lg w-[80%] lg:w-1/2 h-[80%] overflow-hidden overflow-y-scroll  space-y-4 hide-scrollbar"
      >
        <div className=" flex justify-between items-center">
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
          {data.userId !== "" ? (
            <input
              className="w-full border rounded px-3 py-2"
              name="bookingType"
              value={
                data.isHotelBooked
                  ? "Hotel"
                  : data.isCabBooked
                  ? "Cab"
                  : "other"
              }
              readOnly
            />
          ) : (
            <select
              onChange={handlechage}
              className="w-full border rounded px-3 py-2"
              name="bookingType"
              value={data.bookingType}
            >
              <option value="">Select Type</option>
              <option value="Hotel">Hotel</option>
              <option value="Cab">Cab</option>
            </select>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold">User ID</label>
          <input
            type="text"
            name="userId"
            value={data.userId}
            onChange={handlechage}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter User ID"
          />
        </div>
        {data.bookingType === "Hotel" && (
          <>
            <div>
              <label className="block text-sm font-semibold">Hotel ID</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Hotel ID"
                onChange={handlechage}
                name="hotelId"
                value={data.hotelId}
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
                value={data.roomID}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Total Guests
              </label>
              <input
                type="number"
                value={data.totalGuests}
                onChange={handlechage}
                name="totalGuests"
                className="w-full border rounded px-3 py-2"
                placeholder="Enter Guest Count"
              />
            </div>
          </>
        )}
        {data.bookingType === "Cab" && (
          <>
            <div>
              <label className="block text-sm font-semibold">Cab ID</label>
              <input
                onChange={handlechage}
                value={data.cabId}
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
                value={data.pickupLocation}
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
                value={data.dropLocation}
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
                value={data.travelDate}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-semibold">Total Price</label>
          <input
            type="number"
            name="totalPrice"
            className="w-full border rounded px-3 py-2"
            placeholder="Total Price"
            onChange={handlechage}
            value={data.totalPrice}
          />
        </div>
        {componentType !== "Create" && (
          <div>
            <label className="block text-sm font-semibold">Status</label>
            <select
              onChange={handlechage}
              className="w-full border rounded px-3 py-2"
              name="status"
              value={data.status}
            >
              <option value="reject">Reject</option>
              <option value="pending">Pending</option>
              <option value="success">Success</option>
            </select>
          </div>
        )}

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
