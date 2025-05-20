import React from 'react';
import { useNavigate } from 'react-router-dom';
import CabImage from '../Components/Photo/cab.jpeg';

export default function CabCard({ cab }) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    if (cab && cab._id) {
      navigate(`/cab/${cab._id}`);
    }
  };

  return (
    <div className="w-full h-auto rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={cab.image || CabImage}
        alt={cab.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{cab.name}</h3>
        <p className="text-gray-500">{cab.location}</p>
        <div className="flex items-center text-yellow-500 text-sm">
          {'★'.repeat(Math.floor(cab.rating || 0))}
          {'☆'.repeat(5 - Math.floor(cab.rating || 0))}
          <span className="text-gray-600 ml-2">({cab.rating})</span>
        </div>
        <p className="text-green-600 font-semibold">₹{cab.price}/ride</p>
        <button
          onClick={handleDetailsClick}
          className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Details
        </button>
      </div>
    </div>
  );
}
