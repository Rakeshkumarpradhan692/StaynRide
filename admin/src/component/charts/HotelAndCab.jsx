import React from "react";
import ReactApexChart from "react-apexcharts";

function HotelAndCab() {
  const getLastSixMonths = () => {
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      months.push(date.toISOString());
    }
    return months;
  };

  const [state] = React.useState({
    series: [
      {
        name: "Hotel Bookings",
        data: [31, 40, 28, 51, 42, 109],
      },
      {
        name: "Cab Rides",
        data: [11, 32, 45, 32, 34, 52],
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

  return (
    <div className="chart-container">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
}

export default HotelAndCab;
