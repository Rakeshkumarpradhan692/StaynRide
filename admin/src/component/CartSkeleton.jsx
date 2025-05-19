import React from "react";

const CartSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4 border-b pb-4">
            <div className="w-[90%] h-28 bg-gray-300 rounded-md flex-shrink-0"></div>
            <div className="flex flex-col justify-between w-full space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSkeleton;
