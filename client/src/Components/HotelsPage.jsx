import React from 'react';
import HotelCard from './HotelCard';
import hotels from './HotelData';
import Navbar from './Navbar';
export default function HotelsPage() {
  return (
    <>
     <Navbar/>
     <div className="w-full h-auto  mx-auto px-4 py-8">
        
      <h2 className="text-2xl font-bold mb-6">All Hotels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
    </>
   
  );
}
