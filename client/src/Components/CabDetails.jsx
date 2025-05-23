import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Star, ArrowLeft, Calendar, User, Phone, Mail, Home, Navigation
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function CabDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cab, setCab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    pickupAddress: '',
    dropAddress: ''
  });

  useEffect(() => {
    const fetchCab = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/public/cabbyID/${id}`);
        setCab(response.data);
        setBookingData(prev => ({
          ...prev,
          pickupAddress: response.data.address?.fullAddress || ''
        }));
      } catch (err) {
        setError('Failed to load cab details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCab();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK. Check your connection.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: cab.price * 100,
      currency: "INR",
      name: "Cab Booking",
      description: `Booking for ${cab.name}`,
      handler: async function (response) {
        alert(`Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);

        // Example: post booking to backend
        /*
        await axios.post('/api/bookings', {
          cabId: id,
          ...bookingData,
          paymentId: response.razorpay_payment_id
        });
        */

        setShowBooking(false);
        setBookingData({
          name: '',
          phone: '',
          email: '',
          date: '',
          pickupAddress: cab.address?.fullAddress || '',
          dropAddress: ''
        });
      },
      prefill: {
        name: bookingData.name,
        email: bookingData.email,
        contact: bookingData.phone
      },
      notes: {
        cabId: id,
        pickup: bookingData.pickupAddress,
        drop: bookingData.dropAddress,
        date: bookingData.date
      },
      theme: {
        color: "#0d6efd"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Retry
        </button>
      </div>
    </div>
  );

  if (!cab) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-lg">Cab not found.</p>
    </div>
  );
   const handleBackClick = () => {
    navigate('/'); 
  };

  return (
    <div className="min-h-screen  flex flex-col bg-gray-50">
      <Navbar />

       

     <main className="flex-grow bg-gray-50">
  <div className="w-full mx-auto px-6 lg:px-[4rem] py-[5rem]">
  
     

    {/* Main Card Container */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image Gallery Section */}
        <div className="relative h-96 lg:h-auto">
          <img
            src={cab.image || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
            alt={cab.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium text-gray-800">
              {cab.rating?.toFixed(1) || '4.5'}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 md:p-8 lg:p-10">
          <div className="w-10 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center">
            <button
              onClick={handleBackClick}
              className="flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <div className="flex flex-col h-full">
            {/* Cab Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {cab.name}
                  </h1>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {cab.model}
                    </span>
                    <span className="text-sm text-gray-500">
                      • {cab.seats || 4} seats
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">₹{cab.price}</p>
                  <p className="text-sm text-gray-500">per ride</p>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="mb-6 space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="ml-2">
                  <p className="text-gray-800 font-medium">
                    {cab.address?.city}, {cab.address?.state}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {cab.address?.fullAddress || 'Address not specified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {['AC', 'WiFi', 'Charging Port', 'GPS', 'Child Seat'].map((feature) => (
                  <span 
                    key={feature}
                    className="inline-flex items-center bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">
                {cab.description || 'This comfortable cab offers a smooth ride with all modern amenities. Perfect for city travel with ample space for luggage.'}
              </p>
            </div>

            {/* Book Button */}
            <button
              onClick={() => setShowBooking(true)}
              className="mt-auto w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>


      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden">
            <div className="bg-blue-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Book {cab.name}</h2>
              <p className="opacity-90 mt-1">Complete your booking details</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1  md:grid-cols-2 gap-6">

                <div className="relative">
                  <User className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={bookingData.name}
                    onChange={handleInputChange}
                    className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>


                <div className="relative">
                  <Phone className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>


                <div className="relative">
                  <Mail className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>


                <div className="relative">
                  <Calendar className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="date"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={bookingData.date}
                    onChange={handleInputChange}
                    className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>
              </div>


              <div className="space-y-4">
                <div className="relative">
                  <Home className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="pickupAddress"
                    type="text"
                    placeholder="Pickup Address"
                    required
                    value={bookingData.pickupAddress}
                    onChange={handleInputChange}
                    className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <div className="relative">
                  <Navigation className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="dropAddress"
                    type="text"
                    placeholder="Drop Address"
                    required
                    value={bookingData.dropAddress}
                    onChange={handleInputChange}
                    className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>
              </div>


              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBooking(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Pay & Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
