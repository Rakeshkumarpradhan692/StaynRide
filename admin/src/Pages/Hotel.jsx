import React, { useState, useEffect, useCallback } from "react";
import { X, Star, Plus, RotateCcw } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import CloudinaryUpload from "../utils/UploadCloudinary";
import hotelimg from "../assets/images/hotels.jpg";
import SkelitonLoader from "../component/SkelitonLoader";
import Rooms from "../component/Rooms";
export default function Hotels() {
  const { uploadImage } = CloudinaryUpload();
  const [isloading, setisloading] = useState(false);
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [hotels, setHotels] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  const [OriginalData, setOriginalData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isRooms, setisRooms] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelId, sethotelId] = useState(null);
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    hotelType: "",
    description: "",
    country: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    address: "",
    contactNumber: "",
    checkInTime: "",
    checkOutTime: "",
    rating: "",
    availability: true,
    images: [],
  });
  const [filterdata, setFilterdata] = useState({
    name: "",
    hotelType: "",
    minRating: "",
  });

  const handleFilterInput = (e) => {
    const { name, value } = e.target;
    setFilterdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const filtered = OriginalData.filter((hotel) => {
      if (
        filterdata.name &&
        !hotel.name.toLowerCase().includes(filterdata.name.toLowerCase())
      ) {
        return false;
      }
      if (filterdata.hotelType && hotel.hotelType !== filterdata.hotelType) {
        return false;
      }
      if (
        filterdata.minRating &&
        hotel.rating < parseFloat(filterdata.minRating)
      ) {
        return false;
      }
      return true;
    });
    setHotels(filtered);
  }, [filterdata, OriginalData]);

  const resetFilters = () => {
    setFilterdata({
      name: "",
      hotelType: "",
      minRating: "",
    });
    setHotels(OriginalData);
  };
  const fetchHotels = useCallback(async () => {
    setisloading(true);
    try {
      const res = await axios.get(`${server_url}public/all-hotels`);
      setHotels(res.data || []);
      setOriginalData(res.data || []);

      console.log(res.data);
      setisloading(false);
    } catch (err) {
      setisloading(false);
      console.error(err);
      toast.error("Failed to load hotels");
    }
  }, [server_url]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);
  const openCreate = () => {
    setEditMode(false);
    setFormData({
      _id: null,
      name: "",
      hotelType: "",
      description: "",
      country: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
      address: "",
      contactNumber: "",
      checkInTime: "",
      checkOutTime: "",
      rating: "",
      availability: true,
      images: [],
    });
    setFormOpen(true);
  };
  const openEdit = (hotel) => {
    setEditMode(true);
    setFormData({
      ...hotel,
      images: hotel.images || [],
    });
    setFormOpen(true);
  };
  const handleRooms = (id) => {
    setisRooms(!isRooms);
    sethotelId(id);
  };
  const closeForm = () => setFormOpen(false);
  const openDetails = (hotel) => setSelectedHotel(hotel);
  const closeDetails = () => setSelectedHotel(null);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };
  const removeImageAt = (idx) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploaded = await Promise.all(
        formData.images.map((img) =>
          typeof img === "string" ? img : uploadImage(img)
        )
      );
      if (uploaded.some((url) => !url)) {
        toast.error("One or more image uploads failed");
        return;
      }

      const payload = { ...formData, images: uploaded };

      if (editMode) {
        await axios.put(`${server_url}admin/update-hotel`, payload);
        toast.success("Hotel updated");
      } else {
        await axios.post(`${server_url}admin/create-hotel`, payload);
        toast.success("Hotel created");
      }

      closeForm();
      fetchHotels();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save hotel");
    }
  };
  const deleteHotel = async (_id) => {
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
        await axios.delete(`${server_url}admin/delete-hotel`, {
          data: { id: _id },
        });

        swalWithTailwindButtons.fire({
          title: "Deleted!",
          text: "Hotel has been deleted.",
          icon: "success",
        });

        fetchHotels();
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

  return (
    <div className="p-5">
      {isloading === true ? (
        <SkelitonLoader />
      ) : (
        <div className=" relative">
          {" "}
          <div className="flex items-center justify-between mb-4">
            <div className=" ">
              <h1 className="text-3xl font-semibold">Hotels</h1>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded"
            >
              <Plus size={16} /> Create Hotel
            </button>
          </div>
          <div className="flex gap-4 items-center mb-6">
            <input
              type="text"
              name="name"
              placeholder="Search hotel by name..."
              className="border rounded-md py-2 px-4 outline-none w-64"
              value={filterdata.name}
              onChange={handleFilterInput}
            />

            <select
              name="hotelType"
              value={filterdata.hotelType}
              onChange={handleFilterInput}
              className="border rounded-md py-2 px-4 outline-none"
            >
              <option value="">All Types</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Luxury">Luxury</option>
            </select>

            <select
              name="minRating"
              value={filterdata.minRating}
              onChange={handleFilterInput}
              className="border rounded-md py-2 px-4 outline-none"
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+</option>
              <option value="4">4+</option>
              <option value="3">3+</option>
              <option value="2">2+</option>
              <option value="1">1+</option>
            </select>

            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Filters
            </button>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white border rounded-2xl shadow overflow-hidden cursor-pointer"
                onClick={() => openDetails(hotel)}
              >
                <div className="relative">
                  <img
                    src={hotel.images[0] || hotelimg}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-3 space-y-3">
                  <div className=" flex justify-between items-center">
                    <div className="">
                      <h2 className="font-semibold">
                        {hotel.name.toUpperCase()}-{hotel.hotelType}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {hotel.city}, {hotel.state}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRooms(hotel._id);
                      }}
                      className=" bg-green-200 rounded-md px-2 py-1 inline-block"
                    >
                      Rooms
                    </button>
                  </div>
                  <div className=" flex justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(hotel);
                      }}
                      className="px-4 py-1 bg-gray-400 rounded text-sm text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHotel(hotel._id);
                      }}
                      className="px-4 py-1 bg-red-500 rounded text-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isRooms && (
            <AnimatePresence>
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 z-50 flex items-end"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black"
                  onClick={() => setisRooms(false)}
                />
                <div className="relative w-full h-[90%] bg-white rounded-t-xl shadow-2xl overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => setisRooms(false)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800"
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

                  <div className="h-full overflow-y-auto">
                    <Rooms hotelId={hotelId} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg overflow-auto max-h-[90vh] relative hide-scrollbar">
            <button
              onClick={closeForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">
              {editMode ? "Edit Hotel" : "Create Hotel"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded w-full"
                  required
                />
                <input
                  name="hotelType"
                  placeholder="Type (e.g. Luxury)"
                  value={formData.hotelType}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name="district"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />

                <input
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input
                  name="contactNumber"
                  placeholder="Contact #"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name="checkInTime"
                  type="time"
                  value={formData.checkInTime}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name="checkOutTime"
                  type="time"
                  value={formData.checkOutTime}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded"
                />
              </div>
              <div className="flex items-center gap-4">
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  placeholder="Rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded w-24"
                />
                <label className="flex items-center gap-2">
                  <input
                    name="availability"
                    type="checkbox"
                    checked={formData.availability}
                    onChange={handleChange}
                  />
                  Available
                </label>
              </div>
              <div>
                <label className="block mb-1">Hotel Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
                <div className="flex gap-2 flex-wrap mt-2">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={
                          typeof img === "string"
                            ? img
                            : URL.createObjectURL(img)
                        }
                        alt=""
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageAt(i)}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded"
              >
                {editMode ? "Update Hotel" : "Create Hotel"}
              </button>
            </form>
          </div>
        </div>
      )}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] relative flex flex-col md:flex-row">
            <button
              onClick={closeDetails}
              className="absolute top-1 bg-opacity-30  right-4 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-100 transition-all"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className=" w-full bg-red-600 bg md:w-1/2 max-h-max overflow-y-scroll">
              {selectedHotel.images.length > 0 ? (
                <div className="relative h-full w-full">
                  {selectedHotel.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="w-full h-full">
                      <img
                        src={img}
                        alt={`${selectedHotel.name} ${i}`}
                        className=" w-full h-full
                        "
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={hotelimg}
                    alt="placeholder"
                    className="w-full h-full object-cove"
                  />
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedHotel.name}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedHotel.availability
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedHotel.availability ? "Available" : "Booked"}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 space-x-3">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                      {selectedHotel.hotelType}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {selectedHotel.rating}{" "}
                        {selectedHotel.rating > 1 ? "stars" : "star"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-gray-700">{selectedHotel.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Check-in
                    </h4>
                    <p className="font-medium">{selectedHotel.checkInTime}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Check-out
                    </h4>
                    <p className="font-medium">{selectedHotel.checkOutTime}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact
                    </h4>
                    <p className="font-medium">{selectedHotel.contactNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Location
                    </h4>
                    <p className="font-medium">
                      {selectedHotel.city}, {selectedHotel.state}
                    </p>
                  </div>
                </div>

                {/* Full address */}
                <div className="pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Full Address
                  </h4>
                  <p className="text-sm text-gray-700">
                    {selectedHotel.address}, {selectedHotel.district},{" "}
                    {selectedHotel.state}, {selectedHotel.country} -{" "}
                    {selectedHotel.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
