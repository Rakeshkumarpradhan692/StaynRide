// import React, { useEffect, useState } from 'react';
// import CabCard from './CabCard';
// import axios from 'axios';
// import Navbar from './Navbar';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

// export default function CabsPage() {
//   const [cabs, setCabs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Filters
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedCapacity, setSelectedCapacity] = useState('');
//   const [searchName, setSearchName] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const cabsPerPage = 6;

//   useEffect(() => {
//     const fetchCabs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/public/all-cabs');
//         setCabs(response.data);
//       } catch (err) {
//         setError('Failed to load cabs');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCabs();
//   }, []);

//   const handleClearFilters = () => {
//     setSelectedType('');
//     setSelectedCapacity('');
//     setSearchName('');
//     setSelectedState('');
//     setSelectedCity('');
//     setCurrentPage(1);
//   };

//   const filteredCabs = cabs.filter((cab) => {
//     const nameMatch = !searchName || cab.name.toLowerCase().includes(searchName.toLowerCase());
//     const stateMatch = !selectedState || cab.address?.state === selectedState;
//     const cityMatch = !selectedCity || cab.address?.city === selectedCity;
//     const typeMatch = !selectedType || cab.name.toLowerCase() === selectedType.toLowerCase();
//     const capacityMatch =
//       !selectedCapacity ||
//       String(cab.passengerCapacity || cab.capacity || '') === selectedCapacity;

//     return nameMatch && stateMatch && cityMatch && typeMatch && capacityMatch;
//   });

//   // Pagination logic
//   const indexOfLast = currentPage * cabsPerPage;
//   const indexOfFirst = indexOfLast - cabsPerPage;
//   const currentCabs = filteredCabs.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredCabs.length / cabsPerPage);

//   const uniqueStates = [...new Set(cabs.map((cab) => cab.address?.state).filter(Boolean))];
//   const uniqueCities = [...new Set(cabs.map((cab) => cab.address?.city).filter(Boolean))];

//   if (loading) return <p className="text-center py-10">Loading...</p>;
//   if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  
//     const navigate = useNavigate(); // ✅ call at top level

//   const handleBackClick = () => {
//     navigate(-1); // ✅ use inside a function
//   };

//   const someCondition = false;

//   if (someCondition) {
//     return <Navigate to="/some-other-route" />; // ✅ use Navigate after import
//   }


//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col lg:flex-row mt-[5rem] px-6 lg:px-[4rem] py-8">
        
//          <button 
//         onClick={handleBackClick}
//         className="top-24 left-4 md:left-8 z-50 flex items-center gap-2 "
//       >
//         <ArrowLeft />
        
//       </button>
//         <div className="lg:w-1/4 w-full mb-6 lg:mb-0 lg:pr-4">
//           <h3 className="text-xl font-bold mb-4">Filter by:</h3>

//           <div className="mb-4">
//             <label className="block font-semibold mb-2">Car Type</label>
//             <select className="w-full p-2 border rounded" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
//               <option value="">All Types</option>
//               <option value="Hatchback">Hatchback</option>
//               <option value="Sedan">Sedan</option>
//               <option value="SUV">SUV</option>
//               <option value="Traveller">Traveller</option>
//               <option value="Mini">Mini</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block font-semibold mb-2">Passenger Capacity</label>
//             <select className="w-full p-2 border rounded" value={selectedCapacity} onChange={(e) => setSelectedCapacity(e.target.value)}>
//               <option value="">All Capacities</option>
//               <option value="4">4 Passenger Seater</option>
//               <option value="5">5 Passenger Seater</option>
//               <option value="7">7 Passenger Seater</option>
//               <option value="10">10 Passenger Seater</option>
//               <option value="15">15 Passenger Seater</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block font-semibold mb-2">Search by Name</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Search by name"
//               value={searchName}
//               onChange={(e) => setSearchName(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block font-semibold mb-2">State</label>
//             <select className="w-full p-2 border rounded" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
//               <option value="">All States</option>
//               {uniqueStates.map((state) => (
//                 <option key={state} value={state}>
//                   {state}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block font-semibold mb-2">City</label>
//             <select className="w-full p-2 border rounded" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
//               <option value="">All Cities</option>
//               {uniqueCities.map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             onClick={handleClearFilters}
//             className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded w-full flex items-center justify-center"
//           >
//             <span className="mr-2">✖</span> Clear Filters
//           </button>
//         </div>

//         {/* Results */}
//         <div className="lg:w-3/4 w-full">
//           <h2 className="text-2xl font-bold mb-6 text-center">All Available Cabs</h2>

//           {filteredCabs.length === 0 ? (
//             <p className="text-center text-gray-500">No cabs match your filters.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {currentCabs.map((cab) => (
//                   <CabCard key={cab._id} cab={cab} />
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center mt-8 space-x-2">
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 border rounded disabled:opacity-50"
//                 >
//                   Prev
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 border rounded disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from 'react';
import CabCard from './CabCard';
import axios from 'axios';
import Navbar from './Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CabsPage() {
  const navigate = useNavigate(); // ✅ Hook at top level

  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedType, setSelectedType] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const cabsPerPage = 6;

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/public/all-cabs');
        setCabs(response.data);
      } catch (err) {
        setError('Failed to load cabs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

  const handleClearFilters = () => {
    setSelectedType('');
    setSelectedCapacity('');
    setSearchName('');
    setSelectedState('');
    setSelectedCity('');
    setCurrentPage(1);
  };

  const filteredCabs = cabs.filter((cab) => {
    const nameMatch = !searchName || cab.name.toLowerCase().includes(searchName.toLowerCase());
    const stateMatch = !selectedState || cab.address?.state === selectedState;
    const cityMatch = !selectedCity || cab.address?.city === selectedCity;
    const typeMatch = !selectedType || cab.name.toLowerCase() === selectedType.toLowerCase();
    const capacityMatch =
      !selectedCapacity ||
      String(cab.passengerCapacity || cab.capacity || '') === selectedCapacity;

    return nameMatch && stateMatch && cityMatch && typeMatch && capacityMatch;
  });

  const indexOfLast = currentPage * cabsPerPage;
  const indexOfFirst = indexOfLast - cabsPerPage;
  const currentCabs = filteredCabs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCabs.length / cabsPerPage);

  const uniqueStates = [...new Set(cabs.map((cab) => cab.address?.state).filter(Boolean))];
  const uniqueCities = [...new Set(cabs.map((cab) => cab.address?.city).filter(Boolean))];

  const handleBackClick = () => {
    navigate(-1);
  };

  const someCondition = false;
  if (someCondition) {
    return <Navigate to="/some-other-route" />;
  }

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <>
      <Navbar />

     
      <div className="flex flex-col lg:flex-row mt-[5rem] px-6 lg:px-[4rem] py-8">
        

        {/* Filters */}
        <div className="lg:w-1/4 w-full mb-6 lg:mb-0 lg:pr-4">
        <div className="w-10 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center">
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
          <h3 className="text-xl font-bold mb-4">Filter by:</h3>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Car Type</label>
            <select className="w-full p-2 border rounded" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Traveller">Traveller</option>
              <option value="Mini">Mini</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Passenger Capacity</label>
            <select className="w-full p-2 border rounded" value={selectedCapacity} onChange={(e) => setSelectedCapacity(e.target.value)}>
              <option value="">All Capacities</option>
              <option value="4">4 Passenger Seater</option>
              <option value="5">5 Passenger Seater</option>
              <option value="7">7 Passenger Seater</option>
              <option value="10">10 Passenger Seater</option>
              <option value="15">15 Passenger Seater</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Search by Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">State</label>
            <select className="w-full p-2 border rounded" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              <option value="">All States</option>
              {uniqueStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">City</label>
            <select className="w-full p-2 border rounded" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded w-full flex items-center justify-center"
          >
            <span className="mr-2">✖</span> Clear Filters
          </button>
        </div>

        {/* Results */}
        <div className="lg:w-3/4 w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">All Available Cabs</h2>

          {filteredCabs.length === 0 ? (
            <p className="text-center text-gray-500">No cabs match your filters.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCabs.map((cab) => (
                  <CabCard key={cab._id} cab={cab} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
