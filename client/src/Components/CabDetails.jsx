// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function CabDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [cab, setCab] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCab = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/public/cabs/${id}`);
//         setCab(response.data);
//       } catch (err) {
//         setError('Failed to load cab details.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCab();
//   }, [id]);

//   if (loading) return <p className="text-center py-10">Loading...</p>;
//   if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
//   if (!cab) return <p className="text-center py-10">Cab not found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//       >
//         &larr; Back
//       </button>

//       <h1 className="text-3xl font-bold mb-4">{cab.name}</h1>
//       <img
//         src={cab.image || 'https://via.placeholder.com/600x400?text=No+Image'}
//         alt={cab.name}
//         className="w-full h-64 object-cover rounded mb-6"
//       />
//       <p className="text-gray-700 mb-2"><strong>Location:</strong> {cab.location}</p>
//       <p className="text-yellow-500 mb-2">
//         {'★'.repeat(Math.floor(cab.rating))}{'☆'.repeat(5 - Math.floor(cab.rating))}
//         <span className="text-gray-600 ml-2">({cab.rating})</span>
//       </p>
//       <p className="text-green-600 font-semibold mb-6">${cab.price}/ride</p>
//       <p className="text-gray-800">{cab.description || 'No description available.'}</p>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CabDetail() {
  const { id } = useParams(); // Get the cab ID from the URL
  const navigate = useNavigate(); // Hook to navigate back
  const [cab, setCab] = useState(null); // State to store cab data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCab = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/public/cabbyID/${id}`);
        setCab(response.data);
      } catch (err) {
        setError('Failed to load cab details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCab();
    }
  }, [id]);

  if (loading) return <p className="text-center py-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600 text-lg">{error}</p>;
  if (!cab) return <p className="text-center py-10 text-gray-600 text-lg">Cab not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
      >
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{cab.name}</h1>

      <img
        src={cab.image || 'https://via.placeholder.com/800x400?text=No+Image+Available'}
        alt={cab.name}
        className="w-full h-64 object-cover rounded mb-6 shadow"
      />

      <div className="text-gray-700 space-y-3">
        <p><strong>Location:</strong> {cab.location}</p>

        <p className="text-yellow-500">
          {'★'.repeat(Math.floor(cab.rating))}{'☆'.repeat(5 - Math.floor(cab.rating))}
          <span className="text-gray-600 ml-2">({cab.rating})</span>
        </p>

        <p className="text-green-600 font-semibold text-xl">
          ₹{cab.price} / ride
        </p>

        <p>{cab.description || 'No description available.'}</p>
      </div>
    </div>
  );
}

