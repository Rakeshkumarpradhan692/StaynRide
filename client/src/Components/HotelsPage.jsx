// import React from 'react';
// import HotelCard from './HotelCard';
// import hotels from './HotelData';
// import Navbar from './Navbar';
// export default function HotelsPage() {
//   return (
//     <>
//      <Navbar/>
//      <div className="w-full h-auto  mx-auto px-4 py-8">
        
//       <h2 className="text-3xl font-serif text-blue-700 mb-6">All Hotels</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {hotels.map(hotel => (
//           <HotelCard key={hotel.id} hotel={hotel} />
//         ))}
//       </div>
//     </div>
//     </>
   
//   );
// }




// import React, { useEffect, useState } from 'react';
// import HotelCard from './HotelCard';
// import Navbar from './Navbar';
// import axios from 'axios';

// export default function HotelsPage() {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchHotels = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/public/all-hotels');
//       setHotels(Array.isArray(response.data) ? response.data : []); // ensure it's an array
//     } catch (error) {
//       console.error("Error fetching hotels:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHotels();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="w-full h-auto mx-auto px-4 py-8">
//         <h2 className="text-3xl font-serif text-blue-700 mb-6">All Hotels</h2>

//         {loading ? (
//           <p className="text-gray-500">Loading hotels...</p>
//         ) : hotels.length === 0 ? (
//           <p className="text-red-500">No hotels found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {hotels.map((hotel) => (
//               <HotelCard key={hotel._id} hotel={hotel} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HotelCard from './HotelCard';
import Navbar from './Navbar';
import axios from 'axios';
import { loadRazorpay } from './Razorpay';
import HotelDetails from './HotelDetails'; // add this line

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/public/all-hotels');
        if (Array.isArray(response.data)) {
          setHotels(response.data);
        } else {
          setHotels([]);
          setError('Invalid data format received.');
        }
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError('Failed to fetch hotels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handlePayment = async (amount) => {
    const res = await loadRazorpay();
    if (!res) return alert('Failed to load Razorpay SDK');

    const options = {
      key: 'rzp_test_YOUR_KEY_HERE',
      amount: amount * 100,
      currency: 'INR',
      name: 'StaynRide Hotel Booking',
      description: 'Room booking payment',
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Guest',
        email: 'guest@example.com',
        contact: '9999999999',
      },
      notes: {
        booking: 'Hotel Booking',
      },
      theme: {
        color: '#8C5B3F',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full h-auto mx-auto px-4 py-8 max-w-7xl">
              <h2 className="text-3xl font-serif text-blue-700 mb-6">All Hotels</h2>

              {loading ? (
                <p className="text-gray-500">Loading hotels...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : hotels.length === 0 ? (
                <p className="text-red-500">No hotels found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {hotels.map((hotel) => (
                    <div key={hotel._id}>
                      <HotelCard hotel={hotel} />
                      <button
                        onClick={() => handlePayment(hotel.price)}
                        className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      >
                        Pay ₹{hotel.price}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
        />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>
    </>
  );
}



