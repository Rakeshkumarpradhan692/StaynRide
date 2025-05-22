import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

function HotelAndCab() {
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
      // Set to first day of month for consistent grouping
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

        // Get the last 6 months dates (first day of each month)
        const monthKeys = getLastSixMonthsAsKeys();

        // Initialize counters for hotel and cab bookings
        const hotelCounts = {};
        const cabCounts = {};

        monthKeys.forEach((month) => {
          hotelCounts[month] = 0;
          cabCounts[month] = 0;
        });

        // Process each booking
        bookings.forEach((booking) => {
          const bookingDate = new Date(booking.createdAt);
          // Create a key in format "YYYY-MM" for grouping
          const monthKey = `${bookingDate.getFullYear()}-${String(
            bookingDate.getMonth() + 1
          ).padStart(2, "0")}`;

          // Count hotel bookings
          if (booking.hotelBooking.isHotelBooked) {
            if (monthKeys.includes(monthKey)) {
              hotelCounts[monthKey]++;
            }
          }

          // Count cab bookings
          if (booking.cabBooking.isCabBooked) {
            if (monthKeys.includes(monthKey)) {
              cabCounts[monthKey]++;
            }
          }
        });

        // Prepare data for chart
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

  // Helper function to get last 6 months in "YYYY-MM" format
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
