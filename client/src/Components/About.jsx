import React from "react";
import TeamMember from "./TeamMember"; 
import aboutBg from "../Components/Photo/Header.png"; 
import Navbar from './Navbar';
import Footer from "./Footer";
import img from '../Components/Photo/logoone.png';
import ver from '../Components/Photo/verson.avif'
const team = [
  {
    name: "Diwakar Sharma",
    role: "Founder & CEO",
    image: img,
  },
  {
    name: "Preeti Thakur",
    role: "Travel Consultant",
    image: img,
  },
  {
    name: "Bipin Bisht",
    role: "Operations Manager",
    image: img,
  },
];

const testimonials = [
  {
    name: "Anjali Mehta",
    feedback: "StaynRide made my trip unforgettable. Excellent service and stress-free planning!",
  },
  {
    name: "Rahul Verma",
    feedback: "Highly recommend! Their hotel and cab packages are top-notch and affordable.",
  },
  {
    name: "Sonal Rajput",
    feedback: "Professional, reliable, and friendly team. Loved my whole travel experience!",
  },
];

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="text-gray-800">

        {/* Hero Section */}
        <section
          className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white relative"
          style={{ backgroundImage: `url(${aboutBg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              We are passionate travel planners helping you explore the world stress-free.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg">
            At <span className="font-semibold text-blue-600">StaynRide</span>, we aim to redefine travel planning with personalized,
            budget-friendly experiences that create lifelong memories.
          </p>
        </section>

        {/* Vision Section */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <img
              src={ver}
              alt="Our Vision"
              className="rounded-xl shadow-lg w-[10rem]"
            />
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                We envision a world where travel is accessible, seamless, and joyful for every individual—
                guided by trust, care, and authentic experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-8">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-700">
            <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2">Affordable Packages</h4>
              <p className="text-sm">Tailored options for every budget without compromising on comfort.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2">24/7 Support</h4>
              <p className="text-sm">Our support team is here to assist you anytime, anywhere.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2">Trusted Network</h4>
              <p className="text-sm">We partner with verified hotels and drivers for your safety.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2">Easy Booking</h4>
              <p className="text-sm">Book cabs and stays in just a few clicks through our simple interface.</p>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-12">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-blue-50 py-16 px-6">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-12">What Our Clients Say</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
                <h4 className="font-semibold text-blue-600 text-right">— {t.name}</h4>
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
