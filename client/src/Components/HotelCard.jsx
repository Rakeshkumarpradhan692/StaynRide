// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import img from '../Components/Photo/Bedroom.jpg';
// export default function HotelCard({ hotel }) {
//    const navigate = useNavigate();
//   const handleDetailsClick = () => {
//     navigate(`/hotels/${hotel.id}`);
//   };
//   return (
//     <div className=" rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
//       <img src={img} alt={hotel.name} className="w-full h-40 object-cover" />
//       <div className="p-4 space-y-2">
//         <h3 className="text-lg font-semibold">{hotel.name}</h3>
//         <p className="text-gray-500">{hotel.location}</p>
//         <div className="flex items-center text-yellow-500 text-sm">
//           {'★'.repeat(Math.floor(hotel.rating))}{'☆'.repeat(5 - Math.floor(hotel.rating))}
//           <span className="text-gray-600 ml-2">({hotel.rating})</span>
//         </div>
//         <p className="text-blue-600 font-semibold">${hotel.price}/night</p>
//          <button
//           onClick={handleDetailsClick}
//           className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Details
//         </button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const handleDetailsClick = (hotelId) => {
   if (hotelId) { 
  console.log("hotelId",hotelId)
    navigate(`/hotel/${hotelId}`);

  }
};

  const image = hotel.images && hotel.images.length > 0
    ? hotel.images[0]
    : "https://placehold.co/300x200?text=No+Image";

  return (
    <div className="rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
    
    onClick={
      ()=>{
        handleDetailsClick(hotel?._id)
      }
    }>
      <img
        src={image}
        alt={hotel.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{hotel.name}</h3>
        <p className="text-gray-500">{hotel.city}, {hotel.state}</p>
        <div className="flex items-center text-yellow-500 text-sm">
          {'★'.repeat(Math.floor(hotel.rating))}
          {'☆'.repeat(5 - Math.floor(hotel.rating))}
          <span className="text-gray-600 ml-2">({hotel.rating})</span>
        </div>
        <p className="text-blue-600 font-semibold">{hotel.hotelType}</p>
        <button
          onClick={()=>{
            handleDetailsClick(hotel?._id)
          }}
          className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Details
        </button>
      </div>
    </div>
  );
}

