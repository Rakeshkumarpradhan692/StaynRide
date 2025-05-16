import React from "react";
import people from "../assets/images/people.jpg";
import Logo from "../assets/images/logo.png";
import { ChevronDown, Menu } from "lucide-react";

function Header(props) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 py-2 shadow-md bg-white px-5">
      <h1 className="text-xl font-serif flex font-bold text-blue-800">
        Stayn
        <span>
          <img src={Logo} alt="Logo" className="h-8 w-8 object-contain" />
        </span>
        Ride
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
        <Menu
          className=" lg:hidden cursor-pointer"
          onClick={() => props.setisActive(!props.isActive)}
        />

        <div className="flex items-center gap-6">
          <img
            src={people}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm sm:text-base ">
            <h3 className="font-semibold">John Roy</h3>
            <p className="text-gray-500">Admin</p>
          </div>
          <div className=" border rounded-full cursor-pointer">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
