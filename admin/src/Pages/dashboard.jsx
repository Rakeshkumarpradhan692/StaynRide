import React from "react";
import HotelAndCab from "../component/charts/HotelAndCab";
import UserChrts from "../component/charts/UserChrts";
import { Users, Hotel, Car, CalendarCheck } from "lucide-react";

function Dashboard() {
  const carts = [
    {
      name: "total users",
      count: 100,
      icon: <Users className="w-6 h-6 text-gray-500" />,
    },
    {
      name: "total bookings",
      count: 2560,
      icon: <CalendarCheck className="w-6 h-6 text-gray-500" />,
    },
    {
      name: "total hotels",
      count: 52,
      icon: <Hotel className="w-6 h-6 text-gray-500" />,
    },
    {
      name: "total cabs",
      count: 89,
      icon: <Car className="w-6 h-6 text-gray-500" />,
    },
  ];

  return (
    <div className="p-5">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {carts.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-all"
          >
            <div className="p-3 rounded-lg bg-gray-100">{item.icon}</div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {item.name}
              </p>
              <h4 className="text-2xl font-bold text-gray-800">{item.count}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        <div className="w-full lg:w-[65%] border border-gray-200 rounded-xl bg-white p-2 sm:p-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Hotel & Cab Analysis
          </h4>
          <HotelAndCab />
        </div>
        <div className="w-full lg:w-[35%] border border-gray-200 rounded-xl bg-white p-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            User Growth
          </h4>
          <UserChrts />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
