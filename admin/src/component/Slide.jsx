import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Image,
  CalendarCheck,
  Car,
  MessageCircle,
  Hotel,
  LogOut,
} from "lucide-react";

function Slide() {
  const location = useLocation(); // to highlight active route
  const menuItems = [
    { label: "Dashboard", icon: <Home />, path: "/" },
    { label: "All Users", icon: <Users />, path: "/users" },
    { label: "Banners", icon: <Image />, path: "/banners" },
    { label: "Booking", icon: <CalendarCheck />, path: "/booking" },
    { label: "Cabs", icon: <Car />, path: "/cabs" },
    { label: "Feedbacks", icon: <MessageCircle />, path: "/feedbacks" },
    { label: "Hotels", icon: <Hotel />, path: "/hotels" },
    { label: "Logout", icon: <LogOut />, path: "/logout" },
  ];

  return (
    <div className="h-screen p-4 bg-white shadow-md min-w-[200px]">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">StayNRide</h2>
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
