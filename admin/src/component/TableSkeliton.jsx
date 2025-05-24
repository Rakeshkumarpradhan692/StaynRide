import React from "react";

function TableSkeleton() {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded" />
        <div className="h-8 w-32 bg-gray-300 rounded" />
      </div>
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-9 bg-gray-300 rounded-md" />
          ))}
          <div className="h-9 w-28 bg-gray-300 rounded-md" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <tbody>
            {skeletonRows.map((_, index) => (
              <tr key={index} className="animate-pulse border-b">
                <td className="p-2">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                </td>
                <td className="p-2 hidden sm:table-cell">
                  <div className="h-4 w-32 bg-gray-300 rounded" />
                </td>
                <td className="p-2">
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </td>
                <td className="p-2 hidden md:table-cell">
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </td>
                <td className="p-2 hidden md:table-cell">
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </td>
                <td className="p-2 hidden lg:table-cell">
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </td>
                <td className="p-2 hidden lg:table-cell">
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </td>
                <td className="p-2 hidden xl:table-cell">
                  <div className="h-4 w-32 bg-gray-300 rounded" />
                </td>
                <td className="p-2 flex gap-2">
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableSkeleton;
