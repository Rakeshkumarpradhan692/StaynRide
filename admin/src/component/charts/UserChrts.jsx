import React, { useEffect, useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { SkeletonChartBoxTwo } from "../Loader/dashboard";
const BookingPieChart = () => {
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  const [viewMode, setViewMode] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/all-booking"
        );
        setBookingData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = useMemo(() => {
    const counts = { pending: 0, reject: 0, success: 0 };

    bookingData.forEach((booking) => {
      if (viewMode === "hotel" && !booking.hotelBooking?.isHotelBooked) return;
      if (viewMode === "cab" && !booking.cabBooking?.isCabBooked) return;

      const status = booking.status;
      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    });

    return {
      series: [counts.pending, counts.reject, counts.success],
      labels: ["Pending", "Rejected", "Success"],
      counts,
    };
  }, [bookingData, viewMode]);

  const hotelCounts = useMemo(() => {
    const result = { pending: 0, reject: 0, success: 0 };
    bookingData.forEach((b) => {
      if (b.hotelBooking?.isHotelBooked && result.hasOwnProperty(b.status)) {
        result[b.status]++;
      }
    });
    return result;
  }, [bookingData]);

  const cabCounts = useMemo(() => {
    const result = { pending: 0, reject: 0, success: 0 };
    bookingData.forEach((b) => {
      if (b.cabBooking?.isCabBooked && result.hasOwnProperty(b.status)) {
        result[b.status]++;
      }
    });
    return result;
  }, [bookingData]);

  if (loading) {
    return <SkeletonChartBoxTwo />;
  }

  if (!bookingData.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          No booking data available.
        </div>
      </div>
    );
  }

  const { series, labels } = chartData;

  return (
    <div className="container mx-auto px-4 ">
      <div className="bg-white rounded-lg ">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Bokking status
        </h4>
        <div className="flex flex-col justify-center  items-center mb-6 gap-4">
          <div className="flex justify-center flex-wrap gap-2">
            <button
              onClick={() => setViewMode("all")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Bookings ({bookingData.length})
            </button>
            <button
              onClick={() => setViewMode("hotel")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === "hotel"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Hotel Only (
              {hotelCounts.pending + hotelCounts.reject + hotelCounts.success})
            </button>
            <button
              onClick={() => setViewMode("cab")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === "cab"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Cab Only (
              {cabCounts.pending + cabCounts.reject + cabCounts.success})
            </button>
          </div>
        </div>
        <ReactApexChart
          key={viewMode}
          options={{
            chart: { type: "pie" },
            labels: labels,
            colors: ["#facc15", "#f87171", "#4ade80"],
            legend: { position: "bottom" },
            tooltip: {
              y: {
                formatter: (val) => {
                  const total = series.reduce((a, b) => a + b, 0);
                  return `${val} bookings (${
                    total > 0 ? Math.round((val / total) * 100) : 0
                  }%)`;
                },
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: { width: 280 },
                  legend: { position: "bottom" },
                },
              },
            ],
          }}
          series={series}
          type="pie"
          height={400}
        />
      </div>
    </div>
  );
};

export default BookingPieChart;
