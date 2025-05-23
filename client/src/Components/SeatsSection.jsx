// import React from "react";
// import { motion } from "framer-motion";
// import { FaUsers, FaBell, FaDownload, FaBoxOpen } from "react-icons/fa";

// const stats = [
//   { value: "2.7K", label: "Users", icon: <FaUsers className="text-2xl" /> },
//   { value: "1.8K", label: "Subscribers", icon: <FaBell className="text-2xl" /> },
//   { value: "35", label: "Downloads", icon: <FaDownload className="text-2xl" /> },
//   { value: "4", label: "Products", icon: <FaBoxOpen className="text-2xl" /> },
// ];

// const StatsSection = () => {
//   return (
//     <div className="bg-gradient-to-r from-gray-800 to-black py-8 px-4 sm:px-6 lg:px-8">
//       <motion.section 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="w-full mx-auto"
//       >
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/50 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="mb-4 p-3 bg-blue-400/10 rounded-full text-blue-400">
//                   {stat.icon}
//                 </div>
//                 <h3 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">
//                   {stat.value}
//                 </h3>
//                 <p className="text-gray-300 font-medium">{stat.label}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

       
//         <div className="hidden lg:block">
//           <div className="absolute left-0 -mt-20 w-32 h-32 bg-blue-400 rounded-full mix-blend-screen opacity-10 filter blur-3xl"></div>
//           <div className="absolute right-0 -mt-20 w-32 h-32 bg-blue-400 rounded-full mix-blend-screen opacity-10 filter blur-3xl"></div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default StatsSection;