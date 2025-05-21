import React, { useState, useEffect, useCallback } from "react";
import SkelitonLoader from "./SkelitonLoader";
import { Plus } from "lucide-react";
import CloudinaryUpload from "../utils/UploadCloudinary";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
function Rooms(props) {
  useEffect(() => {
    console.log(props.hotelId);
  }, []);
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setformType] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    roomNumber: "",
    roomType: "",
    price: "",
    images: [],
  });
  const { uploadImage } = CloudinaryUpload();
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [files[0]],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlecreate = (e) => {
    e.preventDefault();
    setShowForm(true);
    setformType("create");
  };
  const handleEdit = (room) => {
    setformType("edit");
    setFormData((prev) => ({
      ...prev,
      ...room,
    }));
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, roomNumber, roomType, price, images } = formData;
    try {
      let uploadedImageUrls = [];
      for (let imageFile of images) {
        const url = await uploadImage(imageFile);
        if (url) uploadedImageUrls.push(url);
      }

      const payload = {
        hotelId: props.hotelId,
        roomNumber,
        roomType,
        price,
        images: uploadedImageUrls[0],
      };

      const url =
        formType === "create"
          ? axios.post(`${server_url}admin/create-room`, {
              payload,
            })
          : axios.put(`${server_url}admin/update-room`, {
              id: _id,
              roomNumber,
              roomType,
              price,
              images: uploadedImageUrls[0],
            });
      await url;

      formType === "create"
        ? toast.success("room created")
        : toast.success("room updtaed");
      resetForm();
      fetchRoomsByHotelId(props.hotelId);
      setShowForm(false);
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("somthing is wrong try later");
      }
      console.log(err);
    }
  };
  const fetchRoomsByHotelId = useCallback(
    async (hotelId) => {
      const url = `${server_url}admin/roomBy-HotelId/${hotelId}`;
      setLoading(true);
      try {
        const result = await axios.get(url);
        if (result.data.data) {
          console.log("rooms are:-", result.data.data);
        }
        setRooms(result.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response?.status === 404) {
          setRooms(error.response?.data);
        }
        console.error("Failed to fetch rooms:", error);
        return null;
      }
    },
    [server_url]
  );
  useEffect(() => {
    fetchRoomsByHotelId(props.hotelId);
  }, [fetchRoomsByHotelId]);

  const handleDelete = async (id) => {
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
      text: "This hotel will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${server_url}admin/delete-room`, {
          data: { id },
        });

        swalWithTailwindButtons.fire({
          title: "Deleted!",
          text: "Hotel has been deleted.",
          icon: "success",
        });
        fetchRoomsByHotelId(props.hotelId);
      } catch (err) {
        console.error(err);

        swalWithTailwindButtons.fire({
          title: "Error",
          text: "Failed to delete hotel.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwindButtons.fire({
        title: "Cancelled",
        text: "Hotel deletion has been cancelled.",
        icon: "error",
      });
    }
  };

  try {
  } catch (error) {}
  const resetForm = () => {
    setFormData({
      roomNumber: "",
      roomType: "Single",
      price: "",
      images: [],
    });

    setformType(null);
    setShowForm(false);
  };

  if (loading)
    return (
      <div className="text-center py-8">
        <SkelitonLoader />
      </div>
    );

  return (
    <div className=" w-full h-full overflow-hidden box-border px-10 py-5">
      <div className=" flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Hotel Rooms Management</h1>
        <button
          onClick={handlecreate}
          className="flex  items-center gap-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus />
          <span>Add New Room</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {formType ? "Edit Room" : "Create New Room"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Number
                    </label>
                    <input
                      type="number"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type
                    </label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per night ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Images
                    </label>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, JPEG (MAX. 5MB each)
                            </p>
                          </div>
                          <input
                            type="file"
                            name="image"
                            onChange={handleInputChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                      {formData.images.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                          {formData.images.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img}
                                alt={`Preview ${index}`}
                                className="h-24 w-full object-cover rounded-md"
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
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {formType === "edit" ? "Update Room" : "Create Room"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {rooms.length > 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full overflow-hidden box-border">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              ></div>
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-xl">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Rooms Available
              </h3>
              <p className="text-gray-500 mb-4 max-w-md text-center">
                This hotel currently has no rooms listed. Click the button below
                to add a new room.
              </p>
              <button
                onClick={handlecreate}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus />
                Add New Room
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Rooms;
