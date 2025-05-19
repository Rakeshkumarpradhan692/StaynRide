import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {
  Home,
  Users,
  Image,
  CalendarCheck,
  Car,
  MessageCircle,
  Hotel,
} from "lucide-react";

function Slide() {
  const location = useLocation(); // to highlight active route
  const menuItems = [
    { label: "Dashboard", icon: <Home />, path: "/" },
    { label: "All Users", icon: <Users />, path: "/users" },
    { label: "Banners", icon: <Image />, path: "/banners" },
    { label: "Booking", icon: <CalendarCheck />, path: "/booking" },
    { label: "Cabs", icon: <Car />, path: "/cabs" },
    { label: "Hotels", icon: <Hotel />, path: "/hotels" },
    { label: "Feedbacks", icon: <MessageCircle />, path: "/feedbacks" },
  ];

  return (
    <div className="h-screen p-4 bg-white shadow-md min-w-[200px]">
      <h1 className="text-2xl mb-5 font-serif flex font-bold text-blue-800">
        Wel
        <span>
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
        </span>
        Come
      </h1>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 text-gray-700 px-3 py-2 rounded-lg transition hover:bg-blue-100 ${
                location.pathname === item.path
                  ? "bg-blue-100 font-semibold"
                  : ""
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Slide;
