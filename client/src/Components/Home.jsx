// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// import HotelCard from './HotelCard';
// import CabCard from './CabCard';
// import Navbar from './Navbar';
// import Banner from './Banner';
// import HotelIntroSection from './HotelintroSection';
// import HotelFacilities from './HotelFacilitys';
// import Cabintro from './Cabintro';
// import SeatsSection from './SeatsSection';
// import FeedbackFrom from './FeedbakFrom';
// import Footer from './Footer';

// function Home() {
//   const navigate = useNavigate();
//   const [hotels, setHotels] = useState([]);
//   const [cabs, setCabs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [hotelsRes, cabsRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/public/all-hotels'),
//           axios.get('http://localhost:5000/api/public/all-cabs')
//         ]);

//         setHotels(hotelsRes.data || []);
//         setCabs(cabsRes.data || []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Animation variants
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="bg-gray-50">
//       <Navbar />
//       <Banner />

//       {/* Hotel Section */}
//       <section className="relative py-16 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 -skew-y-3 transform origin-top-left"></div>
        
//         <div className="relative w-full mx-auto px-6 lg:px-8">
//           <HotelIntroSection />
          
//           <div className="flex flex-col md:flex-row justify-between items-center mb-12">
//             <motion.h2 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl md:text-5xl font-bold text-gray-900 font-serif"
//             >
//               Our <span className="text-blue-600">Premium</span> Stays
//             </motion.h2>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate('/hotels')}
//               className="mt-6 md:mt-0 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
//             >
//               Explore All
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//               </svg>
//             </motion.button>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : (
//             <motion.div 
//               variants={container}
//               initial="hidden"
//               animate="show"
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
//             >
//               {hotels.slice(0, 4).map((hotel, index) => (
//                 <motion.div key={hotel._id} variants={item}>
//                   <HotelCard hotel={hotel} index={index} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </div>
//       </section>

//       <HotelFacilities />

//       {/* Cabs Section */}
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
//         <div className="w-full mx-auto px-6 lg:px-8">
//           <Cabintro />
          
//           <div className="flex flex-col md:flex-row justify-between items-center mb-12">
//             <motion.h2 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl md:text-5xl font-bold text-gray-900 font-serif"
//             >
//               Luxury <span className="text-green-600">Rides</span> Await
//             </motion.h2>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate('/cabs')}
//               className="mt-6 md:mt-0 px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
//             >
//               View Fleet
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//               </svg>
//             </motion.button>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//           ) : (
//             <motion.div 
//               variants={container}
//               initial="hidden"
//               animate="show"
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
//             >
//               {cabs.slice(0, 4).map((cab, index) => (
//                 <motion.div key={cab._id || cab.id} variants={item}>
//                   <CabCard cab={cab} index={index} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </div>
//       </section>

//       <SeatsSection />
      
//       {/* Testimonials Section */}
//       <section className="py-20 bg-gradient-to-b from-white to-gray-50">
//         <div className="w-full mx-auto px-6 lg:px-8">
//           <FeedbackFrom />
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import HotelCard from './HotelCard';
import HotelIntroSection from './HotelintroSection';
import HotelFacilities from './HotelFacilitys';
import CabCard from './CabCard';
import Cabintro from './Cabintro';
import Navbar from './Navbar';
import Banner from './Banner';
// import SeatsSection from './SeatsSection';
import FeedbackFrom from './FeedbakFrom';
import Footer from './Footer';
// ... other component imports

function Home() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

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
    <div className="bg-gray-50 overflow-x-hidden ">
      <Navbar />
      <Banner />

      {/* Hotel Section */}
      <section className="relative py-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 -skew-y-2 lg:-skew-y-3 transform origin-top-left"></div>
        
        <div className="relative w-full mx-auto px-8  lg:px-[4rem] ">
          <HotelIntroSection />
           {/* <SeatsSection /> */}
          <div className="flex flex-col md:flex-row justify-between items-center  my-8 md:my-12 px-4 sm:px-0">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-serif text-center md:text-left"
            >
              Our <span className="text-blue-600">Premium</span> Stays
            </motion.h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/hotels')}
              className="mt-4 md:mt-0 px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center text-sm md:text-base"
            >
              Explore All
              <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </motion.button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0"
            >
              {hotels.slice(0, 4).map((hotel) => (
                <motion.div key={hotel._id} variants={item}>
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <HotelFacilities />

      {/* Cabs Section */}
      <section className="pt-8 md:pt-10  bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full mx-auto  px-8 sm:px-10 lg:px-[4rem]">
         
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-8 px-4 sm:px-0">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-serif text-center md:text-left"
            >
              Luxury <span className="text-green-600">Rides</span> Await
            </motion.h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cabs')}
              className="mt-4 md:mt-0 px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center text-sm md:text-base"
            >
              View Fleet
              <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </motion.button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0"
            >
              {cabs.slice(0, 4).map((cab) => (
                <motion.div key={cab._id || cab.id} variants={item}>
                  <CabCard cab={cab} />
                </motion.div>
              ))}
            </motion.div>
          )}
           <Cabintro />
        </div>
      </section>
      
     
      
      
      <section className="py-8  bg-gradient-to-b from-white to-gray-50">
        <div className="w-full mx-auto px-8  sm:px-10 lg:px-[4rem]">
          <FeedbackFrom />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;