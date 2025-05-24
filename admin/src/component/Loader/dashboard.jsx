import React from "react";

export function SkeletonCard() {
  return (
    <div className="flex items-center gap-4 border border-gray-200 rounded-xl p-5 shadow-sm bg-white animate-pulse">
      <div className="p-3 rounded-lg bg-gray-200 w-10 h-10" />
      <div className="flex-1 space-y-2">
        <div className="h-2 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export function SkeletonChartBoxOne() {
  return (
    <div className="w-full  bg-white p-4 sm:p-6 animate-pulse">
      <div className="h-5 w-1/3 bg-gray-200 mb-4 rounded" />
      <div className="h-60 bg-gray-100 rounded" />
    </div>
  );
}

export function SkeletonChartBoxTwo() {
  return (
    <div className="w-full   bg-white p-4 sm:p-6 animate-pulse">
      <div className="h-5 w-1/3 bg-gray-200 mb-4 rounded" />
      <div className="flex flex-col justify-center items-center gap-y-3">
        <div className="flex justify-center items-center gap-3 flex-wrap *:w-32 *:h-10 ">
          <span className=" bg-gray-200 rounded" />
          <span className=" bg-gray-200 rounded" />
          <span className=" bg-gray-200 rounded" />
        </div>
        <div className="h-80 w-80 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}

function SkeletonDashboard() {
  return (
    <div className="p-5">
      <div className="h-8 w-40 bg-gray-200 mb-6 rounded animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        <div className="w-full lg:w-[65%]">
          <SkeletonChartBoxOne />
        </div>
        <div className="w-full lg:w-[35%]">
          <SkeletonChartBoxTwo />
        </div>
      </div>
    </div>
  );
}

export default SkeletonDashboard;
