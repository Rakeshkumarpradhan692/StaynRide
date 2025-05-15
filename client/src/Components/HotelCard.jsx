import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HotelCard({ hotel }) {
   const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate(`/hotels/${hotel.id}`);
  };
  return (
    <div className=" rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{hotel.name}</h3>
        <p className="text-gray-500">{hotel.location}</p>
        <div className="flex items-center text-yellow-500 text-sm">
          {'★'.repeat(Math.floor(hotel.rating))}{'☆'.repeat(5 - Math.floor(hotel.rating))}
          <span className="text-gray-600 ml-2">({hotel.rating})</span>
        </div>
        <p className="text-blue-600 font-semibold">${hotel.price}/night</p>
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
