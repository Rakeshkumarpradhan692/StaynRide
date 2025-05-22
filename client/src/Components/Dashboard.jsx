import React from "react";

const DashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
      <p className="mt-4 text-gray-700">This page is protected and only visible to logged-in users.</p>
    </div>
  );
};

export default DashboardPage;
