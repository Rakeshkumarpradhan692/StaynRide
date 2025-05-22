import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">StaynRide</h2>
            </div>
            <p className="text-gray-400 mb-4">Your trusted partner for seamless cab & hotel booking experiences with comfort and reliability.</p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaFacebook className="text-lg" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                <FaInstagram className="text-lg" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors">
                <FaTwitter className="text-lg" />
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Cabs", path: "/cabs" },
                { name: "Hotels", path: "/hotels" },
                { name: "Contact", path: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Our Location</h4>
                  <p className="text-gray-400 text-sm">123 Travel Street, Suite 100<br />New Delhi, India 110001</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                  <FaPhone className="text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Phone Number</h4>
                  <p className="text-gray-400 text-sm">+91 98050 63636<br />+91 98765 43210</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Email Address</h4>
                  <p className="text-gray-400 text-sm">support@staynride.com<br />bookings@staynride.com</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest offers and travel tips.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Payment Methods</h4>
              <div className="flex space-x-2">
                {['visa', 'mastercard', 'paypal', 'upi'].map((method, i) => (
                  <div key={i} className="bg-gray-800 p-2 rounded-lg">
                    <img 
                      src={`https://logo.clearbit.com/${method}.com`} 
                      alt={method} 
                      className="h-6 w-auto object-contain"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} StaynRide. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-400">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-blue-400">Cookie Policy</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}