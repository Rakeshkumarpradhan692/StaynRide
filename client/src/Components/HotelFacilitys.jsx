import React from "react";
import { motion } from "framer-motion";
import bed from '../Components/Photo/bed.jpg';
import { FaWifi, FaSwimmingPool, FaUtensils, FaParking, FaSnowflake, FaTv } from "react-icons/fa";

const HotelFacilities = () => {
  const facilities = [
    { name: "Room Service", value: 82, icon: <FaUtensils className="text-blue-600" /> },
    { name: "Breakfast Included", value: 55, icon: <FaUtensils className="text-yellow-500" /> },
    { name: "Laundry Service", value: 73, icon: <FaSnowflake className="text-blue-400" /> },
  ];

  const amenities = [
    { icon: <FaWifi className="text-2xl" />, name: "Free WiFi" },
    { icon: <FaSwimmingPool className="text-2xl" />, name: "Swimming Pool" },
    { icon: <FaParking className="text-2xl" />, name: "Parking" },
    { icon: <FaTv className="text-2xl" />, name: "Smart TV" },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-8 lg:px-8">
      <div className="w-full mx-auto">
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
        
          <motion.div 
            className="w-full lg:w-1/2 space-y-8"
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 }
            }}
          >
            <div className="space-y-4">
              <motion.span 
                className="inline-block text-yellow-600 font-semibold text-sm uppercase tracking-wider"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                Premium Amenities
              </motion.span>
              <motion.h2 
                className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                Unmatched <span className="text-blue-700">Comfort</span>
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                Experience luxury redefined with our exceptional facilities designed to make your stay unforgettable. 
                From premium services to thoughtful amenities, we've curated every detail for your comfort.
              </motion.p>
            </div>

           
            <motion.div 
              className="space-y-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {facilities.map((facility, index) => (
                <motion.div 
                  key={index}
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {facility.icon}
                      </div>
                      <span className="font-medium text-gray-800">{facility.name}</span>
                    </div>
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
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {amenities.map((amenity, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-blue-50 rounded-full mb-2">
                    {amenity.icon}
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{amenity.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        
          <motion.div 
            className="w-full lg:w-1/2 relative"
            variants={{
              hidden: { opacity: 0, x: 20 },
              show: { opacity: 1, x: 0 }
            }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img 
                src={bed} 
                alt="Luxury Hotel Room" 
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-xl font-semibold">Premium Suite</h3>
                  <p className="text-sm opacity-90">Experience ultimate comfort</p>
                </div>
              </div>
            </div>
            
          
            <div className="hidden lg:block absolute -bottom-8 -left-8 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            <div className="hidden lg:block absolute -top-8 -right-8 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HotelFacilities;