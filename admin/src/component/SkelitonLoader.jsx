import React from "react";

const SkelitonLoader = () => {
  return (
    <div>
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
        <div className="h-8 w-32 bg-gray-300 rounded"></div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative animate-pulse"
          >
            {/* Image placeholder */}
            <div className="w-full h-44 bg-gray-300"></div>

            {/* Top-right buttons */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>

            {/* Content placeholders */}
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>

              {/* Action buttons */}
              <div className="flex justify-between pt-2">
                <div className="h-8 w-20 bg-gray-300 rounded"></div>
                <div className="h-8 w-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkelitonLoader;
