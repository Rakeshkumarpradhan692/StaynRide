import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelCard from './HotelCard';
import Navbar from './Navbar';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    name: '',
    state: '',
    city: '',
    priceRanges: [],
    types: [],
    ratings: []
  });

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6;

  useEffect(() => {
    const fetchAllHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/public/all-hotels');
        setHotels(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch hotels.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllHotels();
  }, []);

  const clearFilters = () => {
    setFilters({
      name: '',
      state: '',
      city: '',
      priceRanges: [],
      types: [],
      ratings: []
    });
    setCurrentPage(1);
  };

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value]
    }));
  };

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

 
  const filteredHotels = hotels.filter((hotel) => {
    const matchesName = !filters.name || hotel.name?.toLowerCase().includes(filters.name.toLowerCase());
    const matchesState = !filters.state || hotel.address?.state === filters.state;
    const matchesCity = !filters.city || hotel.address?.city === filters.city;

    const matchesType = filters.types.length === 0 || filters.types.includes(hotel.type);
    const matchesRating = filters.ratings.length === 0 || filters.ratings.includes(String(hotel.rating));

    const price = parseInt(hotel.price, 10);
    const matchesPrice =
      filters.priceRanges.length === 0 ||
      filters.priceRanges.some((range) => {
        if (range.includes('+')) {
          const min = parseInt(range.replace(/[₹+]/g, ''), 10);
          return price >= min;
        } else {
          const [min, max] = range.replace(/[₹\s]/g, '').split('-').map(Number);
          return price >= min && price <= max;
        }
      });

    return matchesName && matchesState && matchesCity && matchesType && matchesRating && matchesPrice;
  });

  const indexOfLast = currentPage * hotelsPerPage;
  const indexOfFirst = indexOfLast - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
  
    const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <div className="p-4 space-y-4 px-8 md:px-[4rem] mt-[4.5rem]">
       <div className="w-10 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center">
  <button
    onClick={handleBackClick}
    className="flex items-center justify-center"
  >
    <ArrowLeft size={20} />
  </button>
</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Search by hotel name"
              value={filters.name}
              onChange={handleInputChange}
              className="w-full border p-2 pl-10 rounded"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={filters.state}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={clearFilters}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded flex items-center justify-center gap-2"
          >
            <FaFilter /> Clear Filters
          </button>
        </div>

       
        <div className="flex flex-col md:flex-row gap-4">
       
          <div className="w-full md:w-1/4 space-y-4">
            <div>
              <h2 className="font-bold mb-2">Price Range</h2>
              {["₹100 - ₹500", "₹300 - ₹500", "₹500+"].map((range) => (
                <label key={range} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.priceRanges.includes(range)}
                    onChange={() => handleCheckboxChange('priceRanges', range)}
                  />
                  {range}
                </label>
              ))}
            </div>

            <div>
              <h2 className="font-bold mb-2">Hotel Type</h2>
              {["Standard", "Luxury", "Deluxe"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.types.includes(type)}
                    onChange={() => handleCheckboxChange('types', type)}
                  />
                  {type}
                </label>
              ))}
            </div>

            <div>
              <h2 className="font-bold mb-2">Ratings</h2>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.ratings.includes(String(rating))}
                    onChange={() => handleCheckboxChange('ratings', String(rating))}
                  />
                  {Array(rating).fill('⭐').join('')}
                </label>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <p>Loading hotels...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : currentHotels.length === 0 ? (
              <p>No hotels found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentHotels.map((hotel) => (
                  <HotelCard key={hotel._id || hotel.id} hotel={hotel} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelsPage;







