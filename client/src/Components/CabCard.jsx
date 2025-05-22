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
    <div onClick={handleDetailsClick} className="w-full h-auto rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      
      <img
        src={cab.image || CabImage}
        alt={cab.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{cab.name}</h3>
        <p className="text-gray-500">{cab.model}</p>
        <p className="text-gray-500">{cab.address?.city}, {cab.address?.state}</p>
        <p className="text-gray-500">{cab.address?.fullAddress}</p>
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
