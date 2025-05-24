import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { SkeletonChartBoxOne } from "../Loader/dashboard";
function HotelAndCab() {
  const [loading, setloading] = useState(false);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Hotel Bookings",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        name: "Cab Rides",
        data: [0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ["#008FFB", "#00E396"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
      xaxis: {
        type: "datetime",
        categories: getLastSixMonths(),
        labels: {
          format: "MMM yyyy",
        },
      },
      yaxis: {
        title: {
          text: "Number of Bookings",
        },
      },
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
      legend: {
        position: "top",
      },
    },
  });

  function getLastSixMonths() {
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      months.push(date.toISOString());
    }
    return months;
  }

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/all-booking"
        );
        const bookings = response.data.data;
        const monthKeys = getLastSixMonthsAsKeys();
        const hotelCounts = {};
        const cabCounts = {};

        monthKeys.forEach((month) => {
          hotelCounts[month] = 0;
          cabCounts[month] = 0;
        });
        bookings.forEach((booking) => {
          const bookingDate = new Date(booking.createdAt);
          const monthKey = `${bookingDate.getFullYear()}-${String(
            bookingDate.getMonth() + 1
          ).padStart(2, "0")}`;
          if (booking.hotelBooking.isHotelBooked) {
            if (monthKeys.includes(monthKey)) {
              hotelCounts[monthKey]++;
            }
          }
          if (booking.cabBooking.isCabBooked) {
            if (monthKeys.includes(monthKey)) {
              cabCounts[monthKey]++;
            }
          }
        });
        const hotelData = monthKeys.map((key) => hotelCounts[key]);
        const cabData = monthKeys.map((key) => cabCounts[key]);

        setChartData((prev) => ({
          ...prev,
          series: [
            { ...prev.series[0], data: hotelData },
            { ...prev.series[1], data: cabData },
          ],
        }));
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
  }, []);
  function getLastSixMonthsAsKeys() {
    const keys = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      keys.push(`${year}-${month}`);
    }
    return keys;
  }

  if (loading) {
    return <SkeletonChartBoxOne />;
  }
  return (
    <div className="chart-container">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
}

export default HotelAndCab;
