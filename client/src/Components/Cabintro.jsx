import React from 'react'
import Cab from '../Components/Photo/Cabpic.jpg';
function Cabintro() {
     const facilities = [
    { name: "Cab Service", value: 82 },
    { name: "Breakfast Included", value: 55 },
    { name: "Laundry & Ironing", value: 73 },
  ];
  return (
    <div className='flex flex-col md:flex-row gap-5 p-8  md:p-[4.5rem]'>
        <div className='items-center'>
         <img src={Cab} alt="" />
        </div>
        <div className='w-[60%]'>
           <div className=" flex flex-col w-full h-auto">
      <div className=" ">
        <h3 className="md:text-sm font-semibold uppercase text-yellow-700 mb-3 ">Cab Facilities</h3>
        <h1 className="md:text-6xl font-serif text-blue-900">The Structure</h1>
        <p className="text-gray-600 mt-4 md:text-[1.2rem]">
          Quisque sollicitudin, nunc sit amet ullamcorper lobortis, lorem ante vehicula felis, non elementum
          dui magna nec leo. Quisque et sapien metus. Fusce sodales mauris a ligula aliquet tincidunt. Sed
          congue enim at tellus ullamcorper commodo quis eget dui.
        </p>
      </div>

      <div className=" ">
        {facilities.map((facility, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm font-medium text-gray-700 ">
              <span>{facility.name}</span>
              <span>{facility.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-8 overflow-hidden">
              <div
                className="bg-gray-600 h-8 text-white text-sm flex items-center justify-between  transition-all duration-700 ease-in-out"
                style={{ width: `${facility.value}%` }}
              >
                <span className="truncate">{facility.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    </div>
  )
}

export default Cabintro