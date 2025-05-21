// HotelsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelCard from './HotelCard';
import Navbar from './Navbar';
import { FaSearch, FaFilter } from 'react-icons/fa';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    name: '',
    state: '',
    city: '',
    priceRanges: [],
    types: [],
    ratings: []
  });

  const fetchHotels = async (filterParams = filters) => {
    setLoading(true);
    setError('');
    try {
      const query = buildQueryParams(filterParams);
      const response = await axios.get(`http://localhost:5000/api/public/all-hotels?${query}`);
      if (Array.isArray(response.data)) {
        setHotels(response.data);
      } else {
        setHotels([]);
        setError('Invalid data format received.');
      }
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError('Failed to fetch hotels.');
    } finally {
      setLoading(false);
    }
  };

  const buildQueryParams = (filters) => {
    const params = new URLSearchParams();

    if (filters.name) params.append('name', filters.name);
    if (filters.state) params.append('state', filters.state);
    if (filters.city) params.append('city', filters.city);

    filters.types.forEach((type) => params.append('type', type));
    filters.ratings.forEach((rating) => params.append('rating', rating));

    filters.priceRanges.forEach((range) => {
      const [min, max] = range.replace(/[₹\s+]/g, '').split('-');
      if (min && max) {
        params.append('minPrice', min);
        params.append('maxPrice', max);
      } else if (range.includes('+')) {
        const minOnly = range.replace(/[₹+]/g, '').trim();
        params.append('minPrice', minOnly);
      }
    });

    return params.toString();
  };

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (key, value) => {
    const current = filters[key];
    setFilters({
      ...filters,
      [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    });
  };

  const handleApplyFilters = () => fetchHotels(filters);

  const handleClearFilters = () => {
    const cleared = {
      name: '',
      state: '',
      city: '',
      priceRanges: [],
      types: [],
      ratings: []
    };
    setFilters(cleared);
    fetchHotels(cleared);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 space-y-4">
        {/* Top Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Search by hotel name"
              value={filters.name}
              onChange={handleInputChange}
              className="w-full border p-2 pl-10 rounded"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={filters.state}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleClearFilters}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded flex items-center justify-center gap-2"
          >
            <FaFilter /> Clear Filters
          </button>
        </div>

        {/* Sidebar and Results */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4 space-y-4">
            <div>
              <h2 className="font-bold mb-2">Your Spending Plan</h2>
              {["₹100 - ₹500", "₹300 - ₹500", "₹500+"].map(range => (
                <div key={range}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.priceRanges.includes(range)}
                      onChange={() => handleCheckboxChange('priceRanges', range)}
                    />
                    {range}
                  </label>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-bold mb-2">Your Stay Preference</h2>
              {["Standard", "Luxury", "Deluxe"].map(type => (
                <div key={type}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => handleCheckboxChange('types', type)}
                    />
                    {type}
                  </label>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-bold mb-2">Filter by Customer Rating</h2>
              {[1, 2, 3, 4, 5].map(rating => (
                <div key={rating}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.ratings.includes(rating.toString())}
                      onChange={() => handleCheckboxChange('ratings', rating.toString())}
                    />
                    {Array(rating).fill('⭐').join('')}
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={handleApplyFilters}
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
            >
              Apply Filters
            </button>
          </div>

          {/* Hotel Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading hotels...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : hotels.length === 0 ? (
              <p>No hotels found.</p>
            ) : (
              hotels.map(hotel => (
                <HotelCard key={hotel.id || hotel._id} hotel={hotel} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelsPage;






// import React, { useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HotelCard from './HotelCard';
// import Navbar from './Navbar';
// import axios from 'axios';
// import { loadRazorpay } from './Razorpay';
// import HotelDetails from './HotelDetails'; // add this line

// export default function HotelsPage() {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/public/all-hotels');
//         if (Array.isArray(response.data)) {
//           setHotels(response.data);
//         } else {
//           setHotels([]);
//           setError('Invalid data format received.');
//         }
//       } catch (err) {
//         console.error("Error fetching hotels:", err);
//         setError('Failed to fetch hotels. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, []);

//   const handlePayment = async (amount) => {
//     const res = await loadRazorpay();
//     if (!res) return alert('Failed to load Razorpay SDK');

//     const options = {
//       key: 'rzp_test_YOUR_KEY_HERE',
//       amount: amount * 100,
//       currency: 'INR',
//       name: 'StaynRide Hotel Booking',
//       description: 'Room booking payment',
//       handler: function (response) {
//         alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
//       },
//       prefill: {
//         name: 'Guest',
//         email: 'guest@example.com',
//         contact: '9999999999',
//       },
//       notes: {
//         booking: 'Hotel Booking',
//       },
//       theme: {
//         color: '#8C5B3F',
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="w-full h-auto mx-auto px-4 py-8 max-w-7xl">
//               <h2 className="text-3xl font-serif text-blue-700 mb-6">All Hotels</h2>

//               {loading ? (
//                 <p className="text-gray-500">Loading hotels...</p>
//               ) : error ? (
//                 <p className="text-red-500">{error}</p>
//               ) : hotels.length === 0 ? (
//                 <p className="text-red-500">No hotels found.</p>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                   {hotels.map((hotel) => (
//                     <div key={hotel._id}>
//                       <HotelCard hotel={hotel} />
//                       {/* <button
//                         onClick={() => handlePayment(hotel.price)}
//                         className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                       >
//                         Pay ₹{hotel.price}
//                       </button> */}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           }
//         />
//         <Route path="/hotel/:id" element={<HotelDetails />} />
//       </Routes>
//     </>
//   );
// }



