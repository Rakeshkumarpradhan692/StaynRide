import React, { useState, useEffect, useCallback, memo } from "react";
import axios from "axios";
import { Users, Hotel, Car, CalendarCheck } from "lucide-react";
import HotelAndCab from "../component/charts/HotelAndCab";
import SkeletonDashboard from "../component/Loader/dashboard";
import UserChrts from "../component/charts/UserChrts";

function Dashboard() {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [loading, setloading] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    hotels: 0,
    cabs: 0,
  });

  const fetchStats = useCallback(async () => {
    setloading(true);
    try {
      const [uRes, bRes, hRes, cRes] = await Promise.all([
        axios.get(`${server_url}admin/all-users`),
        axios.get(`${server_url}admin/all-booking`),
        axios.get(`${server_url}public/all-hotels`),
        axios.get(`${server_url}public/all-cabs`),
      ]);
      setloading(false);

      setStats({
        users: Array.isArray(uRes.data.users) ? uRes.data.users.length : 0,
        bookings: Array.isArray(bRes.data.data) ? bRes.data.data.length : 0,
        hotels: Array.isArray(hRes.data) ? hRes.data.length : 0,
        cabs: Array.isArray(cRes.data) ? cRes.data.length : 0,
      });
    } catch (err) {
      setloading(!loading);

      console.error("Failed to load dashboard stats:", err);
    }
  }, [server_url]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const cards = [
    {
      name: "Total Users",
      count: stats.users,
      icon: <Users className="w-6 h-6 text-gray-500" />,
    },
    {
      name: "Total Bookings",
      count: stats.bookings,
      icon: <CalendarCheck className="w-6 h-6 text-gray-500" />,
    },
    {
      name: "Total Hotels",
      count: stats.hotels,
      icon: <Hotel className="w-6 h-6 text-gray-500" />,
    },
    {
      name: "Total Cabs",
      count: stats.cabs,
      icon: <Car className="w-6 h-6 text-gray-500" />,
    },
  ];

  return (
    <div className="p-5">
      {loading === true ? (
        <SkeletonDashboard />
      ) : (
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-all"
              >
                <div className="p-3 rounded-lg bg-gray-100">{item.icon}</div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {item.name}
                  </p>
                  <h4 className="text-2xl font-bold text-gray-800">
                    {item.count}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mt-10">
            <div className="w-full lg:w-[65%] border border-gray-200 rounded-xl bg-white p-4 sm:p-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Hotel & Cab Analysis
              </h4>
              <HotelAndCab />
            </div>
            <div className="w-full lg:w-[35%] border border-gray-200 rounded-xl bg-white p-4 sm:p-6">
              <UserChrts />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(Dashboard);
