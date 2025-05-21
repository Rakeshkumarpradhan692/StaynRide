import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Star, ArrowLeft, MapPin, Calendar, User, Phone, Mail, Home, Navigation
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to results</span>
          </button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="relative h-80 lg:h-full">
                <img
                  src={cab.image || 'https://via.placeholder.com/800x600'}
                  alt={cab.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{cab.rating?.toFixed(1)}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 lg:p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{cab.name}</h3>
                    <p className="text-gray-500">{cab.model}</p>
                    <p className="text-gray-500">{cab.address?.city}, {cab.address?.state}</p>
                    <p className="text-gray-500">{cab.address?.fullAddress}</p>
                    <p className="text-green-600 font-semibold">₹{cab.price}/ride</p>

                  </div>
                  {/* <div className="text-2xl font-bold text-blue-600">₹{cab.price}/ride</div> */}
                </div>

                {/* <div className="mt-6 flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{cab.location}</span>
                </div> */}

                {/* <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                  <p className="mt-2 text-gray-600">{cab.description || 'No description available.'}</p>
                </div> */}



                <button
                  onClick={() => setShowBooking(true)}
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition shadow-md"
                >
                  Book This Cab
                </button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
