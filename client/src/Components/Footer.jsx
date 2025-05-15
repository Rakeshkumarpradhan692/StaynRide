import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-700 py-8 mt-12 border-t">
      <div className="w-full h-auto mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        
        <div>
          <h2 className="text-xl  text-blue-600 font-bold mb-2">Staynride</h2>
          <p className="text-sm text-white">Providing reliable cab & hotel booking services with comfort and trust.</p>
        </div>

     
        <div>
          <h3 className="text-lg  text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-white text-sm">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500">Contact Us</Link></li>
            <li><Link to="/cabs" className="hover:text-blue-500">Cabs</Link></li>
            <li><Link to="/hotels" className="hover:text-blue-500">Hotels</Link></li>
          </ul>
        </div>

        
        <div className='text-white'>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@yourcompany.com</p>
          <p className="text-sm">Phone: +1 (555) 123-4567</p>
          <p className="text-sm">Location: 123 Main St, City</p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-2xl  text-white">
            <a href="#" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-white mt-8">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}
