import React from "react";
import Navbar from './Navbar';
import About from '../Components/Photo/AboutBanner.jpg';
import Footer from "./Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="font-sans bg-white">
      <Navbar />

      <div
        className="h-[70vh] min-h-[500px] bg-cover bg-center flex items-center justify-center text-white relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${About})`,
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Contact StaynRide</h1>
          <p className="text-xl md:text-2xl w-full mx-auto">
            We're here to help you plan your perfect journey across India
          </p>
        </div>
      </div>

     
      <section className="py-6 md:py-8 px-4 sm:px-6 lg:px-[4rem] bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
           
            <div className="w-full lg:w-1/2 relative bg-white rounded-xl shadow-xl overflow-hidden">
              <iframe
                title="India Map"
                className="w-full h-96 lg:h-full"
                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=India+(StaynRide)&ie=UTF8&t=&z=5&iwloc=B&output=embed"
                style={{ filter: "grayscale(20%) contrast(1.1) opacity(0.9)" }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end justify-start p-6  bg-gradient-to-t from-white via-white/90 to-transparent">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">Our India Offices</h2>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Delhi Headquarters</p>
                      <p className="text-gray-600">123 Travel Street, Connaught Place, Delhi 110001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Mumbai Branch</p>
                      <p className="text-gray-600">456 Coastal Road, Bandra West, Mumbai 400050</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-4 md:p-8 space-y-6">
              <h2 className="text-3xl font-bold text-blue-700">Send Us a Message</h2>
              <p className="text-gray-600">
                Have questions about your trip? Need custom itinerary suggestions? Reach out to our travel experts.
              </p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent h-36"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-4 md:py-8 px-4 sm:px-6 lg:px-[4rem]">
        <div className="w-full mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Why Contact StaynRide?</h2>
          <p className="text-gray-600 w-full mx-auto text-lg mb-12">
            We're committed to providing exceptional service to travelers exploring India's incredible diversity.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">📞</div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800">24/7 Support</h3>
              <p className="text-gray-600">
                Our travel concierge team is available round-the-clock to assist with bookings, changes, or emergencies.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">📍</div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800">Local Expertise</h3>
              <p className="text-gray-600">
                Get authentic recommendations from our India-based team who know every hidden gem.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800">Partnerships</h3>
              <p className="text-gray-600">
                Hotels, drivers, or local experiences - we welcome collaborations to enhance Indian tourism.
              </p>
            </div>
          </div>

         
          <div className="mt-16 grid sm:grid-cols-3 gap-8 w-full mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaPhone className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-gray-600">+91 11 2345 6789</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                <p className="text-gray-600">info@staynride.in</p>
                <p className="text-gray-600">support@staynride.in</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                <p className="text-gray-600">123 Travel Street</p>
                <p className="text-gray-600">Delhi 110001, India</p>
              </div>
            </div>
          </div>

         
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Connect With Us</h3>
            <div className="flex justify-center gap-6 text-2xl text-blue-600">
              <a href="#" className="hover:text-blue-800 transition">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-pink-600 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-700 transition">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;