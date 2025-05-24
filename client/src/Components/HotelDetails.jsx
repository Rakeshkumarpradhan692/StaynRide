import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaStar,
  FaTag,
  FaRupeeSign,
  FaUserFriends,
  FaCalendarCheck,
  FaBed,
  FaBath,
  FaCoffee,
  FaWifi,
  FaTv,
  FaSnowflake,
} from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "./Footer";
import Navbar from "./Navbar";
import img from "../Components/Photo/bed.jpg";
import { ArrowLeft } from "lucide-react";
const HotelDetails = () => {
  const { Auth } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomError, setRoomError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    roomNumber: [],
    guests: 1,
    price: 0,
  });

  useEffect(() => {
    async function fetchHotelAndRooms() {
      try {
        setLoading(true);
        const hotelRes = await axios.get(
          `http://localhost:5000/api/public/hotel/${id}`
        );
        setHotel(hotelRes.data);

        const roomsRes = await axios.get(
          `http://localhost:5000/api/admin/roomBy-HotelId/${id}`
        );
        console.log("Rooms API Response:", roomsRes.data);

        const responseData = roomsRes.data.data;
        setRooms(responseData);
      } catch (err) {
        console.error(err);
        if (err.response?.config?.url.includes("/roomBy-HotelId/")) {
          setRoomError("Failed to load rooms");
        } else {
          setError("Failed to load hotel");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchHotelAndRooms();
  }, [id]);
  const handleRoomselect = (room) => {
    const No = room.roomNumber;
    const price = room.price;
    setFormData((prev) => ({
      ...prev,
      roomNumber: [formData.roomNumber, No],
      price: formData.price + price,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert("Check-out must be after check-in.");
      return;
    }
    setStep(2);
  };

  const handleBookingConfirm = () => setStep(3);

  const openRazorpayCheckout = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: hotel.price * 100 }),
        }
      );
      const data = await res.json();

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: data.amount,
        currency: data.currency,
        name: hotel.name,
        description: "Hotel Room Booking",
        image: hotel.images[0],
        order_id: data.orderId,
        handler: () => setStep(4),
        prefill: { name: formData.name, email: formData.email },
        theme: { color: "#8C5B3F" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed.");
    }
  };
  const resetForm = () => {
    setFormData({
      checkIn: "",
      checkOut: "",
      roomNumber: "",
      guests: 1,
    });
    setStep(1);
    setIsModalOpen(false);
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!hotel) return <p className="text-center py-20">No hotel found.</p>;

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="font-serif text-gray-800 bg-white mt-[5rem]">
        <div
          className="relative h-[80vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${hotel.images[0]})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 text-center text-white">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                {hotel.name}
              </h1>
              <p className="mt-4 text-xl md:text-2xl leading-relaxed">
                {hotel.description}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-[4rem] py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-cent">
          <div className="order-2 md:order-1 px-6">
            <div className="">
              <button
                onClick={handleBackClick}
                className="top-24 left-4 md:left-8 z-50 flex items-center gap-2 "
              >
                <ArrowLeft />
                <span></span>
              </button>
            </div>
            <h2 className="text-4xl font-semibold text-[#8C5B3F] mb-6">
              {hotel.name}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {hotel.description}
            </p>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-[#8C5B3F]" />
                <strong className="w-24">Adress:</strong>
                {hotel.city}, {hotel.state} ,{hotel.country}
              </li>
              <li className="flex items-center">
                <FaStar className="mr-3 text-[#8C5B3F]" />
                <strong className="w-24">Rating:</strong> {hotel.rating} ★
              </li>
              <li className="flex items-center">
                <FaTag className="mr-3 text-[#8C5B3F]" />
                <strong className="w-24">Price:</strong> $20{hotel.price}/night
              </li>
            </ul>
            <button
              disabled={!Auth.isLoggedIn}
              onClick={() => setIsModalOpen(true)}
              className="mt-8 bg-[#8C5B3F] text-white px-8 py-3 rounded-lg hover:bg-[#a96b4f] transition-all transform hover:scale-105 text-lg font-medium shadow-lg"
            >
              Book Now
            </button>
          </div>
          <div className="order-1 md:order-2 p-4">
            <img
              src={img}
              alt="Hotel Room"
              className="w-full h-auto rounded-xl shadow-xl object-cover transition-all hover:shadow-2xl"
            />
          </div>
        </div>

        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-[2rem]">
          <div className="w-full mx-auto">
            <h3 className="text-3xl font-bold text-[#8C5B3F] mb-2 text-center">
              Available Rooms
            </h3>
            <p className="text-gray-600 text-center mb-12 w-full mx-auto">
              Choose from our selection of beautifully appointed rooms and
              suites
            </p>

            {roomError && (
              <p className="text-red-500 text-center">{roomError}</p>
            )}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 px-8">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : Array.isArray(rooms) &&
                  rooms.map((room) => (
                    <div
                      key={room._id}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={room.images}
                        alt={room.roomType}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h4 className="text-2xl font-semibold text-[#8C5B3F] mb-3">
                          {room.roomType}
                        </h4>
                        <div className="space-y-2 text-gray-700">
                          <p className="flex items-center">
                            <FaRupeeSign className="mr-2 text-[#8C5B3F]" />
                            <strong>Price:</strong> ${room.price}
                          </p>
                          <p className="flex items-center">
                            <FaUserFriends className="mr-2 text-[#8C5B3F]" />
                            <strong>Max Guests:</strong> {room.capacity}
                          </p>
                          <p
                            className={`flex items-center ${
                              room.available ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            <FaCalendarCheck className="mr-2" />
                            <strong>Available:</strong>{" "}
                            {room.available ? "No" : "Yes"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="py-16 px-6 lg:px-[4rem] bg-white">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-[#8C5B3F] mb-2 text-center">
              Room Features
            </h3>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              All our rooms include these premium amenities for your comfort
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <Feature
                icon={<FaBed className="text-3xl" />}
                label="Premium Mattress"
              />
              <Feature
                icon={<FaBath className="text-3xl" />}
                label="Luxury Bath"
              />
              <Feature
                icon={<FaCoffee className="text-3xl" />}
                label="Coffee Maker"
              />
              <Feature
                icon={<FaWifi className="text-3xl" />}
                label="High-Speed Wi-Fi"
              />
              <Feature icon={<FaTv className="text-3xl" />} label="Smart TV" />
              <Feature
                icon={<FaSnowflake className="text-3xl" />}
                label="Air Conditioning"
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
            >
              <IoCloseSharp
                onClick={() => {
                  resetForm();
                }}
              />
            </button>

            <h2 className="text-2xl text-center font-bold text-[#8C5B3F] mb-4">
              {
                [
                  "Enter Your Details",
                  "Confirm Your Booking",
                  "Payment",
                  "Booking Successful",
                ][step - 1]
              }
            </h2>

            {step === 1 && (
              <form onSubmit={handleSubmitDetails} className="space-y-4">
                <p>Choose rooms</p>
                <div className=" flex flex-wrap gap-2">
                  {rooms.length > 0 ? (
                    rooms.map((room, i) => (
                      <div
                        onClick={() => handleRoomselect(room)}
                        className=" bg-gray-400 px-4 py-1 rounded-md"
                        key={i}
                      >
                        {room.roomNumber}
                      </div>
                    ))
                  ) : (
                    <div className=" text-red-500 ml-5 "> no room avilable</div>
                  )}
                </div>
                <Input
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
                <Input
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  type="date"
                  min={
                    formData.checkIn || new Date().toISOString().split("T")[0]
                  }
                  required
                />
                {/* <select
                  name="roomType"
                  required
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Room Type</option>
                  <option>Single</option>
                  <option>Double</option>
                  <option>Room</option>
                </select> */}
                <Input
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="total guests"
                  type="number"
                  min="1"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#8C5B3F] text-white py-2 rounded hover:bg-[#a96b4f]"
                >
                  Next
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-3">
                {Object.entries(formData).map(([key, val]) => (
                  <p key={key}>
                    <strong>{key[0].toUpperCase() + key.slice(1)}:</strong>{" "}
                    {val}
                  </p>
                ))}
                <button
                  onClick={handleBookingConfirm}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Proceed to Payment
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <p className="mb-4">Total: ₹{formData.price}</p>
                <button
                  onClick={openRazorpayCheckout}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Pay Now
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-4">
                <p className="text-green-600 text-lg font-semibold">
                  Booking Confirmed!
                </p>
                <p>Thank you, {formData.name}. Your booking is complete.</p>
                <button
                  onClick={resetForm}
                  className="bg-[#8C5B3F] text-white px-4 py-2 rounded hover:bg-[#a96b4f]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

const Input = ({ name, type = "text", ...props }) => (
  <input
    name={name}
    type={type}
    className="w-full border px-3 py-2 rounded"
    {...props}
  />
);

const Feature = ({ icon, label }) => (
  <div className="flex items-center gap-3">
    {icon} <span>{label}</span>
  </div>
);

export default HotelDetails;
