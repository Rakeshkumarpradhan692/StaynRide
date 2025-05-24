const SkelitonLoader = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
        <div className="h-8 w-32 bg-gray-300 rounded"></div>
      </div>
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-9 bg-gray-300 rounded-md" />
          ))}
          <div className="h-9 w-28 bg-gray-300 rounded-md" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative animate-pulse"
          >
            <div className="w-full h-44 bg-gray-300"></div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
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
