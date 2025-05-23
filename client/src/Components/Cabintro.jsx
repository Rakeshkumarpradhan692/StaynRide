import React from 'react';
import { motion } from 'framer-motion';
import Cab from '../Components/Photo/Cabpic.jpg';

function Cabintro() {
  const facilities = [
    { name: "Cab Service", value: 82 },
    { name: "Breakfast Included", value: 55 },
    { name: "Laundry & Ironing", value: 73 },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className=" py-10 px-2 ">
      <div className="w-full mx-auto  ">
        <motion.div 
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          {/* Image Section */}
          <motion.div 
            className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-xl"
            variants={item}
          >
            <img 
              src={Cab} 
              alt="Luxury Cab" 
              className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-8"
            variants={item}
          >
            <div className="space-y-4">
              <motion.span 
                className="inline-block text-yellow-600 font-semibold text-sm uppercase tracking-wider"
                variants={item}
              >
                Cab Facilities
              </motion.span>
              <motion.h2 
                className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
                variants={item}
              >
                Premium <span className="text-blue-700">Travel</span> Experience
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed"
                variants={item}
              >
                Our cab services are designed for comfort and convenience. With professional drivers, 
                well-maintained vehicles, and premium amenities, we ensure your journey is as enjoyable 
                as your destination.
              </motion.p>
            </div>

            
            <motion.div 
              className="space-y-6"
              variants={container}
            >
              {facilities.map((facility, index) => (
                <motion.div 
                  key={index}
                  className="space-y-2"
                  variants={item}
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">{facility.name}</span>
                    <span className="font-semibold text-blue-600">{facility.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${facility.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

          
            <motion.div 
              className="grid grid-cols sm:grid-cols-2 gap-4 mt-6"
              variants={container}
            >
              {[
                { icon: "🚗", text: "24/7 Availability" },
                { icon: "🛋️", text: "Luxury Seating" },
                { icon: "📱", text: "Easy Booking" },
                { icon: "🧳", text: "Ample Storage" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
                  variants={item}
                  whileHover={{ y: -5 }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Cabintro;