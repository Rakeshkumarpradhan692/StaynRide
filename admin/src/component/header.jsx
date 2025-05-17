import React from "react";
import people from "../assets/images/people.jpg";
import Logo from "../assets/images/logo.png";
import { Menu } from "lucide-react";

function Header(props) {
  return (
    <div className="flex  w-full flex-row justify-between items-center gap-4 p-4 py-2 shadow-md bg-white px-5">
      <h1 className="text-xl font-serif flex font-bold text-blue-800">
        Stayn
        <span>
          <img src={Logo} alt="Logo" className="h-8 w-8 object-contain" />
        </span>
        Ride
      </h1>
      <div className=" flex flex-row items-center gap-4 w-auto">
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
        </div>
      </div>
    </div>
  );
}

export default Header;
