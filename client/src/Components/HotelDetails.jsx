import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaBed, FaCoffee, FaBath, FaWifi, FaShower } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import Footer from './Footer';
import Navbar from './Navbar';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 1,
  });

  useEffect(() => {
    async function fetchHotel() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/public/hotel/${id}`);
        if (!response.ok) throw new Error('Failed to fetch hotel data');
        const data = await response.json();
        setHotel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert('Check-out must be after check-in.');
      return;
    }
    setStep(2);
  };

  const handleBookingConfirm = () => setStep(3);

  const openRazorpayCheckout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: hotel.price * 100 }),
      });
      const data = await res.json();

      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: data.amount,
        currency: data.currency,
        name: hotel.name,
        description: 'Hotel Room Booking',
        image: hotel.images[0],
        order_id: data.orderId,
        handler: () => setStep(4),
        prefill: { name: formData.name, email: formData.email },
        theme: { color: '#8C5B3F' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment initiation failed.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', checkIn: '', checkOut: '', roomType: '', guests: 1 });
    setStep(1);
    setIsModalOpen(false);
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!hotel) return <p className="text-center py-20">No hotel found.</p>;

  return (
    <>
      <Navbar />
      <div className="font-serif text-gray-800">
   
        <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${hotel.images[0]})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 text-center text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{hotel.name}</h1>
              <p className="mt-3 text-lg">{hotel.description}</p>
            </div>
          </div>
        </div>

        
        <div className="w-full mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 ">
          <div className="space-y-6 text-center py-[5rem]">
            <h2 className="text-3xl font-semibold text-[#8C5B3F]">{hotel.name}</h2>
            <p>{hotel.description}</p>
            <ul className="space-y-1 text-gray-600">
              <li><strong>Location:</strong> {hotel.location}</li>
              <li><strong>Rating:</strong> {hotel.rating} ★</li>
              <li><strong>Price:</strong> ₹{hotel.price}/night</li>
            </ul>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#8C5B3F] text-white px-6 py-2 rounded hover:bg-[#a96b4f] transition"
            >
              Book Now
            </button>
          </div>
          <img src={hotel.images[1]} alt="Room" className="w-full h-96 rounded-lg shadow-md object-cover" />
        </div>

       
        <div className="bg-gray-50 py-12">
          <div className="w-full mx-auto px-4">
            <h3 className="text-2xl font-bold text-[#8C5B3F] mb-6">Room Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-700">
              <Feature icon={<FaBed />} label="Premium Mattress" />
              <Feature icon={<FaBath />} label="Bathtub" />
              <Feature icon={<FaCoffee />} label="Coffee Maker" />
              <Feature icon={<FaShower />} label="Rain Shower" />
              <Feature icon={<FaWifi />} label="Free Wi-Fi" />
              <Feature icon={<FaBed />} label="Cotton Sheets" />
            </div>
          </div>
        </div>
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black">
              <IoCloseSharp />
            </button>

            <h2 className="text-2xl text-center font-bold text-[#8C5B3F] mb-4">
              {['Enter Your Details', 'Confirm Your Booking', 'Payment', 'Booking Successful'][step - 1]}
            </h2>

            {step === 1 && (
              <form onSubmit={handleSubmitDetails} className="space-y-4">
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required />
                <Input name="checkIn" value={formData.checkIn} onChange={handleChange} type="date" min={new Date().toISOString().split('T')[0]} required />
                <Input name="checkOut" value={formData.checkOut} onChange={handleChange} type="date" min={formData.checkIn || new Date().toISOString().split('T')[0]} required />
                <select name="roomType" required value={formData.roomType} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                  <option value="">Select Room Type</option>
                  <option>Single</option>
                  <option>Double</option>
                  <option>Room</option>
                </select>
                <Input name="guests" value={formData.guests} onChange={handleChange} type="number" min="1" required />
                <button type="submit" className="w-full bg-[#8C5B3F] text-white py-2 rounded hover:bg-[#a96b4f]">Next</button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-3">
                {Object.entries(formData).map(([key, val]) => (
                  <p key={key}><strong>{key[0].toUpperCase() + key.slice(1)}:</strong> {val}</p>
                ))}
                <button onClick={handleBookingConfirm} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Proceed to Payment
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <p className="mb-4">Total: ₹{hotel.price}</p>
                <button onClick={openRazorpayCheckout} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Pay Now
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-4">
                <p className="text-green-600 text-lg font-semibold">Booking Confirmed!</p>
                <p>Thank you, {formData.name}. Your booking is complete.</p>
                <button onClick={resetForm} className="bg-[#8C5B3F] text-white px-4 py-2 rounded hover:bg-[#a96b4f]">Close</button>
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
  <input name={name} type={type} className="w-full border px-3 py-2 rounded" {...props} />
);

const Feature = ({ icon, label }) => (
  <div className="flex items-center gap-3">
    {icon} <span>{label}</span>
  </div>
);

export default HotelDetails;
