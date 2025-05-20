import React from "react";
import Navbar from './Navbar';
import About from '../Components/Photo/AboutBanner.jpg';
import Footer from "./Footer";

const Contact = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white relative"
        style={{ backgroundImage: `url(${About})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-wide">Get in Touch</h1>
          <p className="mt-4 text-lg">We'd love to hear from you!</p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="text-gray-700 py-16 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Info with Map */}
          <div className="w-full lg:w-2/3 relative bg-white rounded-xl shadow-md overflow-hidden">
            <iframe
              title="map"
              className="w-full h-96 lg:h-full"
              src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              style={{ filter: "grayscale(1) contrast(1.2) opacity(0.6)" }}
              allowFullScreen
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-end justify-start p-6 bg-gradient-to-t from-white/90 via-white/80 to-transparent">
              <div>
                <h2 className="font-bold text-lg">Our Office</h2>
                <p className="text-gray-600">123 Travel Street, New York, NY</p>
                <p className="text-gray-600">info@staynride.com</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-3xl font-semibold text-blue-700">Contact Us</h2>
            <p className="text-gray-500">Have questions or feedback? Fill out the form below!</p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  className="w-full mt-1 px-4 py-2 border rounded-lg resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Why Contact Us Section */}
<section className="bg-blue-50 py-16 px-6 md:px-20 text-center">
  <h2 className="text-3xl font-bold text-blue-700 mb-6">Why Contact Us?</h2>
  <p className="text-gray-600 max-w-3xl mx-auto mb-10">
    Whether you're planning your next trip, need support, or just want to chat, we're here to help you every step of the way. Our team is passionate about providing prompt, friendly, and informative assistance.
  </p>
  <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="font-semibold text-lg mb-2 text-blue-600">📞 Quick Support</h3>
      <p className="text-gray-600">Fast and friendly assistance via email, phone, or chat. We aim to respond within 24 hours.</p>
    </div>
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="font-semibold text-lg mb-2 text-blue-600">📍 Visit Us</h3>
      <p className="text-gray-600">Want to drop by? Our office is open Mon–Fri, 9am–5pm. We love meeting our travelers in person.</p>
    </div>
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="font-semibold text-lg mb-2 text-blue-600">🤝 Partnerships</h3>
      <p className="text-gray-600">Interested in collaborating with StaynRide? We welcome ideas from brands, bloggers, and guides.</p>
    </div>
  </div>

  {/* Social Icons */}
  <div className="mt-12 flex justify-center gap-6 text-blue-700 text-2xl">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
      <i className="fab fa-facebook-square"></i>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
      <i className="fab fa-linkedin"></i>
    </a>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default Contact;
