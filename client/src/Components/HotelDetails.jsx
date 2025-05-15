import React from 'react';
import { useParams } from 'react-router-dom';

const HotelDetails = () => {
  const { id } = useParams();

 
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Hotel Details</h2>
      <p className="text-gray-600">Showing details for hotel ID: {id}</p>
    </div>
  );
};

export default HotelDetails;
