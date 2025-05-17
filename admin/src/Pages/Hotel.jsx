import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import hotelimg from "../assets/images/hotels.jpg";

export default function HotelsCards() {
  return (
    <div className=" p-5">
      <div className=" flex items-center justify-between my-2">
        <h1 className=" font-semibold text-3xl mb-5 ">Hotels</h1>
        <button className=" border px-3 py-1 rounded-md bg-gray-100">
          + create Hotel
        </button>
      </div>
      <div className="allhotels grid grid-cols-1 gap-2 rounded-md overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(12)].map((item, i) => (
          <div className=" rounded-md bg-white overflow-hidden border">
            <div className="images relative">
              <img src={hotelimg} alt="" srcset="" />
              <div className=" w-full top-3 gap-3 justify-end pr-5 absolute flex  *:cursor-pointer">
                <Edit2 className=" bg-gray-200 rounded-full p-1 w-6 h-6 bg-opacity-80" />
                <Trash2 className="bg-gray-200 rounded-full p-1 w-6 h-6 bg-opacity-80" />
              </div>
            </div>
            <div className="textarea  p-3 flex flex-col gap-y-2">
              <div className=" flex justify-between  font-semibold">
                <h1>hotel Ram</h1>
                <p className="">Luxery</p>
              </div>
              <p>25620/night</p>
              <p>Bhubaneswr,Odisha</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
