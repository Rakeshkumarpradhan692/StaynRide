function TableSkeliton() {
  const skeletonRows = Array(5).fill(null);
  return (
    <div className=" w-full">
      <div className="flex w-full items-center justify-between mb-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
        <div className="h-8 w-32 bg-gray-300 rounded"></div>
      </div>
      <tbody>
        {skeletonRows.map((_, index) => (
          <tr key={index} className="border-b animate-pulse">
            <td className="p-2">
              <div className="h-4 w-4 bg-gray-300 rounded" />
            </td>
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
            <td className="p-2 flex gap-1">
              <div className="h-4 w-16 bg-gray-300 rounded mb-1" />
              <div className="h-4 w-16 bg-gray-300 rounded" />
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default TableSkeliton;
