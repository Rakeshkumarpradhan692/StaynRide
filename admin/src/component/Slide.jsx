import React from "react";
import {
  Home,
  Users,
  Image,
  CalendarCheck,
  Car,
  MessageCircle,
  Hotel,
  Bed,
  LogOut,
} from "lucide-react";

function Slide() {
  const menuItems = [
    { label: "Dashboard", icon: <Home />, path: "/dashboard" },
    { label: "All Users", icon: <Users />, path: "/users" },
    { label: "Banners", icon: <Image />, path: "/banners" },
    { label: "Booking", icon: <CalendarCheck />, path: "/booking" },
    { label: "Cabs", icon: <Car />, path: "/cabs" },
    { label: "Feedbacks", icon: <MessageCircle />, path: "/feedbacks" },
    { label: "Hotels", icon: <Hotel />, path: "/hotels" },
    { label: "Rooms", icon: <Bed />, path: "/rooms" },
    { label: "Logout", icon: <LogOut />, path: "/logout" },
  ];

  return (
    <div className="h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">StayNRide</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-lg cursor-pointer transition"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Slide;
