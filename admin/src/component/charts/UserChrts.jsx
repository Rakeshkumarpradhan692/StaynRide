import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

function UserChrts() {
  const [state, setState] = useState({
    selectedOption: "all",
    series: [0, 0, 0],
    loading: true,
    error: null,
    options: {
      chart: {
        width: "100%",
        height: "100%",
        type: "pie",
      },
      labels: ["Pending", "Success", "Rejected"],
      colors: ["#f3f29c", "#a7e8bc", "#e0a096"],
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + "%"];
        },
      },
      legend: {
        position: "bottom",
      },
      title: {
        text: "All Bookings",
        align: "center",
        style: {
          fontSize: "16px",
        },
      },
    },
  });

  const [bookingData, setBookingData] = useState({
    all: { pending: 0, success: 0, reject: 0 },
    cab: { pending: 0, success: 0, reject: 0 },
    hotel: { pending: 0, success: 0, reject: 0 },
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/all-booking"
        );
        const bookings = response.data?.data;
        const newBookingData = {
          all: { pending: 0, success: 0, reject: 0 },
          cab: { pending: 0, success: 0, reject: 0 },
          hotel: { pending: 0, success: 0, reject: 0 },
        };

        bookings.forEach((booking) => {
          const status = booking.status?.toLowerCase();
          newBookingData.all[status] += 1;
          if (booking.cabBooking.isCabBooked) {
            newBookingData.cab[status] += 1;
          }
          if (booking.hotelBooking.isHotelBooked) {
            newBookingData.hotel[status] += 1;
          }
        });

        setBookingData(newBookingData);
        setState((prev) => ({
          ...prev,
          series: [
            newBookingData.all.pending,
            newBookingData.all.success,
            newBookingData.all.reject,
          ],
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setState((prev) => ({ ...prev, error: error.message, loading: false }));
      }
    };

    fetchBookingData();
  }, []);

  const handleOptionChange = (option) => {
    const newSeries = [
      bookingData[option].pending,
      bookingData[option].success,
      bookingData[option].reject,
    ];

    const titleMap = {
      all: "All Bookings",
      cab: "Cab Bookings",
      hotel: "Hotel Bookings",
    };

    setState({
      ...state,
      selectedOption: option,
      series: newSeries,
      options: {
        ...state.options,
        title: {
          ...state.options.title,
          text: titleMap[option],
        },
      },
    });
  };

  if (state.loading) {
    return (
      <div className="w-full mt-5 p-3 text-center">Loading booking data...</div>
    );
  }

  if (state.error) {
    return (
      <div className="w-full mt-5 p-3 text-center text-red-500">
        Error: {state.error}
      </div>
    );
  }

  return (
    <div className="w-full mt-5 p-3 flex flex-col items-center justify-center">
      <div className="flex gap-4 mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-blue-600"
            checked={state.selectedOption === "all"}
            onChange={() => handleOptionChange("all")}
          />
          <span className="ml-2 text-gray-700">All</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-blue-600"
            checked={state.selectedOption === "cab"}
            onChange={() => handleOptionChange("cab")}
          />
          <span className="ml-2 text-gray-700">Cab</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-blue-600"
            checked={state.selectedOption === "hotel"}
            onChange={() => handleOptionChange("hotel")}
          />
          <span className="ml-2 text-gray-700">Hotel</span>
        </label>
      </div>

      <div id="chart" className="w-96 lg:w-full">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default UserChrts;
