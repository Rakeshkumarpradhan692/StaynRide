import React from "react";

function skelitonhotelcab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl shadow hover:shadow-lg transition overflow-hidden animate-pulse bg-white"
        >
          <div className="w-full h-40 bg-gray-300" />

          <div className="p-6 space-y-3">
            <div className="h-5 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
              ))}
            </div>
            <div className="h-4 bg-gray-300 rounded w-1/3" />
            <div className="h-8 bg-blue-300 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default skelitonhotelcab;
