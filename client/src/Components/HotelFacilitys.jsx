import React from "react";
import bed from '../Components/Photo/bed.jpg';

const HotelFacilities = () => {
  const facilities = [
    { name: "Room Service", value: 82 },
    { name: "Breakfast Included", value: 55 },
    { name: "Laundry & Ironing", value: 73 },
  ];

  return (
    <div className="px-6 md:px-[5rem] py-12 flex flex-col lg:flex-row items-center gap-8 w-full ">
      
     
      

    
      <div className="w-full lg:w-[70%] flex flex-col  justify-center">
        
       
        <div className="mb-6 text-center">
          <h3 className="text-sm font-semibold uppercase text-yellow-700 mb-2">Hotel Facilities</h3>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-blue-900 mb-4">The Structure</h1>
          <p className="text-gray-600 text-base md:text-lg">
            Quisque sollicitudin, nunc sit amet ullamcorper lobortis, lorem ante vehicula felis, non elementum
            dui magna nec leo. Quisque et sapien metus. Fusce sodales mauris a ligula aliquet tincidunt.
          </p>
        </div>

        
        <div className="space-y-6">
          {facilities.map((facility, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>{facility.name}</span>
                <span>{facility.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden m-2">
                <div
                  className="bg-gray-700 h-8 text-white text-sm flex items-center justify-center  transition-all duration-700 ease-in-out"
                  style={{ width: `${facility.value}%` }}
                >
                  {facility.value >= 30 && <span className="truncate">{facility.name}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className="bg">
        <img src={bed} alt="Hotel Bed" className="w-full h-auto rounded-xl shadow-md " />
      </div>
    </div>
  );
};

export default HotelFacilities;
