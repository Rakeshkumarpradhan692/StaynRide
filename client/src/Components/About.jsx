import React from "react";
import TeamMember from "./TeamMember"; 
import aboutBg from "../Components/Photo/Header.png"; 
import Navbar from './Navbar'
import Footer from "./Footer";
const team = [
  {
    name: "Diwakar Sharma",
    role: "Founder & CEO",
    image: "/images/diwakar.jpg",
  },
  {
    name: "Preeti Thakur",
    role: "Travel Consultant",
    image: "/images/preeti.jpg",
  },
  {
    name: "Bipin Bisht",
    role: "Operations Manager",
    image: "/images/bipin.jpg",
  },
];

const AboutPage = () => {
  return (
    <>
    <Navbar/>
    <div className="text-gray-800">
      
     <div>
       <section
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white relative"
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full absolute"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We are passionate travel planners helping you explore the world stress-free.
          </p>
        </div>
      </section>
     </div>

     
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          At StaynRide, we aim to redefine travel planning with personalized, budget-friendly experiences that create lifelong memories.
        </p>
      </section>

      
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/images/mission.jpg"
            alt="Our Vision"
            className="rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              We envision a world where travel is accessible, seamless, and joyful for every individual—guided by trust, care, and authentic experiences.
            </p>
          </div>
        </div>
      </section>

      
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default AboutPage;
