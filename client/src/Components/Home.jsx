import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import HotelCard from './HotelCard'
import { useNavigate } from 'react-router-dom';
import hotels from './HotelData';
import CabCard from './CabCard';
import cabs from './CabData';
import SeatsSection from './SeatsSection'
import FeedbackFrom from './FeedbakFrom'
import Footer from './Footer';
function Home() {
     const navigate = useNavigate();
  return (
    <div>
        <Navbar/>
        <Banner/>
         <SeatsSection/>
         <div className="w-full  mx-auto px-[4rem] py-8">
      <div className='flex flex-col md:flex-row justify-between px-8  items-center text-center'>
        <div className='flex  text-center' ><h2 className="md:text-2xl font-bold mb-6">Top Hotels</h2></div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/hotels')}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          View All
        </button>
      </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {hotels.slice(0, 4).map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

    
    </div>
    <div className="w-full mx-auto px-[4rem] py-8">
      <div className='flex flex-col md:flex-row justify-between items-center p-6'>
        <div>
        <h2 className="text-2xl font-bold mb-6">Popular Cabs</h2>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/cabs')}
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          View All
        </button>
      </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cabs.slice(0, 4).map(cab => (
          <CabCard key={cab.id} cab={cab} />
        ))}
      </div>

      
    </div>
   
    <FeedbackFrom/>
    <Footer/>
    </div>
  )
}

export default Home