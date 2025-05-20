// import React, { useState } from 'react';

// import { FaBed, FaCoffee, FaBath, FaWifi, FaShower } from 'react-icons/fa';
// import Footer from './Footer';
// import Navbar from './Navbar';
// import BG from '../Components/Photo/videoframe.png';
// import bed from '../Components/Photo/bed.jpg';
// import hnb from "../Components/Photo/home.jpg";
// const HotelDetails = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//    const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     checkIn: "",
//     checkOut: "",
//     roomType: "",
//     guests: 1,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitDetails = (e) => {
//     e.preventDefault();
//     setStep(2);
//   };

//   const handleBookingConfirm = () => {
//     setStep(3);
//   };

//   const handlePayment = () => {
//     setStep(4);
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="font-serif">
        
//         <div
//           className="relative h-[80vh] bg-cover bg-center"
//           style={{ backgroundImage: `url(${BG})` }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h1 className="text-4xl md:text-6xl font-bold mb-2">Suite Terrace</h1>
//               <p className="text-lg md:text-xl">The best views of the vineyards</p>
//             </div>
//           </div>
//         </div>

       
//         <div className="w-full mx-auto py-12 px-6 md:px-0 grid md:grid-cols-2 gap-10">
         
//           <div>
//             <h2 className="text-3xl font-bold mb-4 text-[#8C5B3F]">Suite Terrace</h2>
//             <p className="text-gray-700 mb-6">
//               Our Suite Terrace, located in the Masía, offers wonderful private terraces with views of the vineyards and mountains beyond.
//             </p>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-[#8C5B3F] text-white py-2 px-6 rounded hover:bg-[#a96b4f] transition"
//             >
//               Book Room
//             </button>
//             <div className="mt-6 flex gap-6 text-sm text-gray-600">
//               <div><strong>65 m²</strong></div>
//               <div><strong>Private Terrace</strong></div>
//               <div><strong>Double Fireplace</strong></div>
//             </div>
//           </div>

         
//           <img src={hnb} alt="Bathtub" className="rounded-lg shadow-lg" />
//         </div>

      
//         <div className="bg-gray-50 py-12">
//           <div className="w-full mx-auto px-6">
//             <h3 className="text-2xl font-bold text-[#8C5B3F] mb-6">Equipment</h3>
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
//               <div className="flex items-center gap-3"><FaBed /> Premium Mattress</div>
//               <div className="flex items-center gap-3"><FaBath /> Bathtub</div>
//               <div className="flex items-center gap-3"><FaCoffee /> Capsule Coffee Maker</div>
//               <div className="flex items-center gap-3"><FaShower /> Large Rain Shower</div>
//               <div className="flex items-center gap-3"><FaWifi /> Room Service</div>
//               <div className="flex items-center gap-3"><FaBed /> 400g Egyptian Sheets</div>
//             </div>
//           </div>
//         </div>

       
//         <div className="w-full mx-auto px-6 py-12">
//           <h3 className="text-2xl font-bold text-[#8C5B3F] mb-8">All Our Rooms</h3>
//           <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[
//               { name: 'Suite', desc: 'Spacious and spectacular', img: 'https://source.unsplash.com/400x300/?bedroom,hotel' },
//               { name: 'Garden Suite', desc: 'A comfortable stay', img: 'https://source.unsplash.com/400x300/?garden,room' },
//               { name: 'Junior Suite', desc: 'Intimate and cozy', img: 'https://source.unsplash.com/400x300/?interior,room' },
//               { name: 'Bruno\'s Suite', desc: 'The jewel of the Masía', img: 'https://source.unsplash.com/400x300/?luxury,room' },
//             ].map((room, idx) => (
//               <div key={idx} className="rounded overflow-hidden shadow hover:shadow-md transition">
//                 <img src={bed} alt={room.name} className="w-full h-48 object-cover" />
//                 <div className="p-4">
//                   <h4 className="font-semibold text-lg">{room.name}</h4>
//                   <p className="text-sm text-gray-600 mb-2">{room.desc}</p>
//                   <button className="text-[#8C5B3F] text-sm font-semibold hover:underline">View Room →</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {isModalOpen && (
//           <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-xl">
       
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-semibold mb-4 text-[#8C5B3F]">
//           {step === 1 && "Enter Your Details"}
//           {step === 2 && "Confirm Your Booking"}
//           {step === 3 && "Payment"}
//           {step === 4 && "Booking Successful!"}
//         </h2>

//         {step === 1 && (
//           <form className="space-y-4" onSubmit={handleSubmitDetails}>
//             <input
//               type="text"
//               name="name"
//               className="w-full border rounded px-3 py-2"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               className="w-full border rounded px-3 py-2"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="date"
//               name="checkIn"
//               className="w-full border rounded px-3 py-2"
//               value={formData.checkIn}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="date"
//               name="checkOut"
//               className="w-full border rounded px-3 py-2"
//               value={formData.checkOut}
//               onChange={handleChange}
//               required
//             />
//             <select
//               name="roomType"
//               className="w-full border rounded px-3 py-2"
//               value={formData.roomType}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Room Type</option>
//               <option value="Single">Single</option>
//               <option value="Double">Double</option>
//               <option value="Suite">Suite</option>
//             </select>
//             <input
//               type="number"
//               name="guests"
//               className="w-full border rounded px-3 py-2"
//               min="1"
//               value={formData.guests}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-[#8C5B3F] text-white py-2 rounded hover:bg-[#a96b4f]"
//             >
//               Next: Confirm Booking
//             </button>
//           </form>
//         )}

//         {step === 2 && (
//           <div className="space-y-4">
//             <div className="text-left space-y-1 text-gray-700">
//               <p><strong>Name:</strong> {formData.name}</p>
//               <p><strong>Email:</strong> {formData.email}</p>
//               <p><strong>Check-in:</strong> {formData.checkIn}</p>
//               <p><strong>Check-out:</strong> {formData.checkOut}</p>
//               <p><strong>Room Type:</strong> {formData.roomType}</p>
//               <p><strong>Guests:</strong> {formData.guests}</p>
//             </div>
//             <button
//               onClick={handleBookingConfirm}
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-4 text-center">
//             <p className="text-gray-700">Pay ₹5000 to confirm your booking.</p>
//             <button
//               onClick={handlePayment}
//               className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//             >
//               Pay Now
//             </button>
//           </div>
//         )}

//         {step === 4 && (
//           <div className="text-center space-y-4">
//             <p className="text-green-700 text-lg font-semibold">Booking Confirmed!</p>
//             <p className="text-gray-700">Thank you, {formData.name}. Your booking has been successfully completed.</p>
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="mt-4 bg-[#8C5B3F] text-white py-2 px-4 rounded hover:bg-[#a96b4f]"
//             >
//               Close
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default HotelDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaBed, FaCoffee, FaBath, FaWifi, FaShower } from 'react-icons/fa';
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

  console.log("id",id)
const openRazorpayCheckout = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: hotel.price * 100 }), // convert to paise
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
      handler: function (response) {
        // You can verify payment here via backend if needed
        console.log('Payment successful', response);
        handlePayment(); // Proceed to step 4
      },
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      notes: {
        address: hotel.location,
      },
      theme: {
        color: '#8C5B3F',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error('Razorpay error:', err);
    alert('Payment failed. Please try again.');
  }
};

 useEffect(() => {
  async function fetchHotel() {
    setLoading(true);
    setError(null);
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
      alert('Check-out date must be after check-in date.');
      return;
    }
    setStep(2);
  };

  const handleBookingConfirm = () => setStep(3);
  const handlePayment = () => setStep(4);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      checkIn: '',
      checkOut: '',
      roomType: '',
      guests: 1,
    });
    setStep(1);
    setIsModalOpen(false);
  };

  if (loading) return <p className="text-center mt-10">Loading hotel...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!hotel) return <p className="text-center mt-10">Hotel not found.</p>;

  return (
    <>
      <Navbar />
      <div className="font-serif">
        <div className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${hotel.images[0]})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{hotel.name}</h1>
              <p className="text-lg md:text-xl">{hotel.description}</p>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto py-12 px-6 md:px-0 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#8C5B3F]">{hotel.name}</h2>
            <p className="text-gray-700 mb-6">{hotel.description}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#8C5B3F] text-white py-2 px-6 rounded hover:bg-[#a96b4f] transition"
            >
              Book Room
            </button>
            <div className="mt-6 flex gap-6 text-sm text-gray-600 flex-wrap">
              <div><strong>Location:</strong> {hotel.location}</div>
              <div><strong>Rating:</strong> {hotel.rating} ★</div>
              <div><strong>Price:</strong> ₹{hotel.price}/night</div>
            </div>
          </div>
          <img src={hotel.images[1]} alt="Room" className="rounded-lg shadow-lg max-h-96 w-full object-cover" />
        </div>

        <div className="bg-gray-50 py-12">
          <div className="w-full mx-auto px-6 max-w-5xl">
            <h3 className="text-2xl font-bold text-[#8C5B3F] mb-6">Room Features</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
              <div className="flex items-center gap-3"><FaBed /> Premium Mattress</div>
              <div className="flex items-center gap-3"><FaBath /> Bathtub</div>
              <div className="flex items-center gap-3"><FaCoffee /> Coffee Maker</div>
              <div className="flex items-center gap-3"><FaShower /> Rain Shower</div>
              <div className="flex items-center gap-3"><FaWifi /> Free Wi-Fi</div>
              <div className="flex items-center gap-3"><FaBed /> Egyptian Cotton Sheets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-[#8C5B3F] text-center">
              {step === 1 && "Enter Your Details"}
              {step === 2 && "Confirm Your Booking"}
              {step === 3 && "Payment"}
              {step === 4 && "Booking Successful!"}
            </h2>

            {step === 1 && (
              <form className="space-y-4" onSubmit={handleSubmitDetails}>
                <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" autoFocus />
                <input type="email" name="email" required placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                <input type="date" name="checkIn" required min={new Date().toISOString().split('T')[0]} value={formData.checkIn} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                <input type="date" name="checkOut" required min={formData.checkIn || new Date().toISOString().split('T')[0]} value={formData.checkOut} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                <select name="roomType" required value={formData.roomType} onChange={handleChange} className="w-full border rounded px-3 py-2">
                  <option value="">Select Room Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                </select>
                <input type="number" name="guests" min="1" required value={formData.guests} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                <button type="submit" className="w-full bg-[#8C5B3F] text-white py-2 rounded hover:bg-[#a96b4f]">Next: Confirm Booking</button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-4 text-gray-700">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Check-in:</strong> {formData.checkIn}</p>
                <p><strong>Check-out:</strong> {formData.checkOut}</p>
                <p><strong>Room Type:</strong> {formData.roomType}</p>
                <p><strong>Guests:</strong> {formData.guests}</p>
                <button onClick={handleBookingConfirm} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Proceed to Payment</button>
              </div>
            )}

            {step === 3 && (
  <div className="text-center space-y-4">
    <p className="text-gray-700">Pay ₹{hotel.price} to confirm your booking.</p>
    <button onClick={openRazorpayCheckout} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
      Pay with Razorpay
    </button>
  </div>
)}

            {step === 4 && (
              <div className="text-center space-y-4">
                <p className="text-green-700 text-lg font-semibold">Booking Confirmed!</p>
                <p className="text-gray-700">Thank you, {formData.name}. Your booking has been completed.</p>
                <button onClick={resetForm} className="bg-[#8C5B3F] text-white py-2 px-4 rounded hover:bg-[#a96b4f]">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
     {/* <Link to={`/hotel/${hotel._id}`}>
  <button className="bg-[#8C5B3F] text-white px-4 py-2 rounded">View Details</button>
</Link> */}
      <Footer />
    </>
  );
};

export default HotelDetails;
