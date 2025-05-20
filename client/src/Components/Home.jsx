import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import HotelCard from './HotelCard';
import CabCard from './CabCard';
import Navbar from './Navbar';
import Banner from './Banner';
import HotelIntroSection from './HotelintroSection';
import HotelFacilities from './HotelFacilitys';
import Cabintro from './Cabintro';
import SeatsSection from './SeatsSection';
import FeedbackFrom from './FeedbakFrom';
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [hotelsRes, cabsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/public/all-hotels'),
          axios.get('http://localhost:5000/api/public/all-cabs')
        ]);

        setHotels(hotelsRes.data || []);
        setCabs(cabsRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Banner />
      <HotelIntroSection />

      <div className="w-full mx-auto px-[4rem] py-8">
        <div className='flex flex-col md:flex-row justify-between px-8 items-center text-center'>
          <h2 className="md:text-4xl font-serif text-blue-700 mb-6">Top Hotels</h2>
          <button
            onClick={() => navigate('/hotels')}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            View All
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading hotels...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {hotels.slice(0, 4).map(hotel => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>

      <HotelFacilities />

      <div className="w-full mx-auto px-[4rem] py-8">
        <div className='flex flex-col md:flex-row justify-between items-center p-6'>
          <h2 className="text-4xl font-serif text-blue-700 mb-6">Popular Cabs</h2>
          <button
            onClick={() => navigate('/cabs')}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            View All
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading cabs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cabs.slice(0, 4).map(cab => (
              <CabCard key={cab._id || cab.id} cab={cab} />
            ))}
          </div>
        )}
      </div>

      <Cabintro />
      <SeatsSection />
      <FeedbackFrom />
      <Footer />
    </div>
  );
}

export default Home;
