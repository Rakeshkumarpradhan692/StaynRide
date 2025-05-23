import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaSignature } from "react-icons/fa";

const HotelIntroSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-yellow-600 font-semibold text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            HOTEL BAYVIEW
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Experience <span className="text-blue-600">Luxury</span> Redefined
          </motion.h1>
          <motion.div 
            className="w-20 h-1 bg-yellow-500 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="relative pl-8">
              <FaQuoteLeft className="absolute left-0 top-0 text-3xl text-blue-200" />
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Nestled in the heart of the city, Hotel Bayview offers an unparalleled luxury experience with breathtaking views, world-class amenities, and impeccable service that redefines hospitality.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our meticulously designed spaces blend contemporary elegance with timeless comfort, creating the perfect sanctuary for both leisure and business travelers.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative pl-8">
              <FaQuoteLeft className="absolute left-0 top-0 text-3xl text-blue-200" />
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                From our award-winning restaurants to our rejuvenating spa, every aspect of your stay is crafted to perfection by our team of dedicated hospitality professionals.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We take pride in creating memorable experiences that linger long after your departure, making Hotel Bayview not just a destination, but a cherished memory.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Signature Section */}
        <motion.div 
          className="grid md:grid-cols-2 items-center gap-8 bg-white w-full p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Manager Profile */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/03/avatar-150x150.png"
                alt="Andrew Stuart"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Andrew Stuart</h3>
              <p className="text-sm text-gray-500 mb-2">Hotel Manager</p>
              <p className="text-blue-600 text-sm font-medium">Since 2015</p>
            </div>
          </div>

          {/* Signature */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <FaSignature className="absolute -left-6 -top-6 text-4xl text-blue-200 opacity-70" />
              <img
                src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/03/signature.png"
                alt="Signature"
                className="w-64 h-auto"
              />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-100 rounded-full mix-blend-multiply opacity-30"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HotelIntroSection;