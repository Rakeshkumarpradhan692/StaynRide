// import React from "react";
// import TeamMember from "./TeamMember"; 
// import aboutBg from "../Components/Photo/Header.png"; 
// import Navbar from './Navbar';
// import Footer from "./Footer";
// import img from '../Components/Photo/logoone.png';
// import ver from '../Components/Photo/verson.avif'
// const team = [
//   {
//     name: "Diwakar Sharma",
//     role: "Founder & CEO",
//     image: img,
//   },
//   {
//     name: "Preeti Thakur",
//     role: "Travel Consultant",
//     image: img,
//   },
//   {
//     name: "Bipin Bisht",
//     role: "Operations Manager",
//     image: img,
//   },
// ];

// const testimonials = [
//   {
//     name: "Anjali Mehta",
//     feedback: "StaynRide made my trip unforgettable. Excellent service and stress-free planning!",
//   },
//   {
//     name: "Rahul Verma",
//     feedback: "Highly recommend! Their hotel and cab packages are top-notch and affordable.",
//   },
//   {
//     name: "Sonal Rajput",
//     feedback: "Professional, reliable, and friendly team. Loved my whole travel experience!",
//   },
// ];

// const AboutPage = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="text-gray-800">

//         {/* Hero Section */}
//         <section
//           className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white relative"
//           style={{ backgroundImage: `url(${aboutBg})` }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//           <div className="relative z-10 text-center px-6">
//             <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
//             <p className="text-lg max-w-2xl mx-auto">
//               We are passionate travel planners helping you explore the world stress-free.
//             </p>
//           </div>
//         </section>

//         {/* Mission Section */}
//         <section className="py-16 px-6 max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h2>
//           <p className="text-gray-600 text-lg">
//             At <span className="font-semibold text-blue-600">StaynRide</span>, we aim to redefine travel planning with personalized,
//             budget-friendly experiences that create lifelong memories.
//           </p>
//         </section>

//         {/* Vision Section */}
//         <section className="bg-gray-100 py-16 px-6">
//           <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//             <img
//               src={ver}
//               alt="Our Vision"
//               className="rounded-xl shadow-lg w-[10rem]"
//             />
//             <div>
//               <h3 className="text-2xl font-bold text-blue-700 mb-4">Our Vision</h3>
//               <p className="text-gray-700 text-lg leading-relaxed">
//                 We envision a world where travel is accessible, seamless, and joyful for every individual—
//                 guided by trust, care, and authentic experiences.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Us */}
//         <section className="py-16 px-6 max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl font-extrabold text-blue-700 mb-8">Why Choose Us</h2>
//           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-700">
//             <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
//               <h4 className="font-semibold text-lg mb-2">Affordable Packages</h4>
//               <p className="text-sm">Tailored options for every budget without compromising on comfort.</p>
//             </div>
//             <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
//               <h4 className="font-semibold text-lg mb-2">24/7 Support</h4>
//               <p className="text-sm">Our support team is here to assist you anytime, anywhere.</p>
//             </div>
//             <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
//               <h4 className="font-semibold text-lg mb-2">Trusted Network</h4>
//               <p className="text-sm">We partner with verified hotels and drivers for your safety.</p>
//             </div>
//             <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
//               <h4 className="font-semibold text-lg mb-2">Easy Booking</h4>
//               <p className="text-sm">Book cabs and stays in just a few clicks through our simple interface.</p>
//             </div>
//           </div>
//         </section>

//         {/* Meet Our Team */}
//         <section className="py-16 px-6 max-w-6xl mx-auto">
//           <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-12">Meet Our Team</h2>
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
//             {team.map((member, index) => (
//               <TeamMember key={index} {...member} />
//             ))}
//           </div>
//         </section>

//         {/* Testimonials */}
//         <section className="bg-blue-50 py-16 px-6">
//           <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-12">What Our Clients Say</h2>
//           <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
//             {testimonials.map((t, idx) => (
//               <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
//                 <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
//                 <h4 className="font-semibold text-blue-600 text-right">— {t.name}</h4>
//               </div>
//             ))}
//           </div>
//         </section>

//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AboutPage;


import React from "react";
import TeamMember from "./TeamMember"; 
import aboutBg from "../Components/Photo/Header.png"; 
import Navbar from './Navbar';
import Footer from "./Footer";
import img from '../Components/Photo/logoone.png';
import ver from '../Components/Photo/verson.avif';
import { FaStar, FaHandshake, FaHeadset, FaWallet, FaMobileAlt } from 'react-icons/fa';

const team = [
  {
    name: "Diwakar Sharma",
    role: "Founder & CEO",
    image: img,
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Preeti Thakur",
    role: "Travel Consultant",
    image: img,
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Bipin Bisht",
    role: "Operations Manager",
    image: img,
    social: { linkedin: "#", twitter: "#" }
  },
];

const testimonials = [
  {
    name: "Anjali Mehta",
    feedback: "StaynRide made my trip unforgettable. Excellent service and stress-free planning!",
    rating: 5
  },
  {
    name: "Rahul Verma",
    feedback: "Highly recommend! Their hotel and cab packages are top-notch and affordable.",
    rating: 4
  },
  {
    name: "Sonal Rajput",
    feedback: "Professional, reliable, and friendly team. Loved my whole travel experience!",
    rating: 5
  },
];

const features = [
  {
    icon: <FaWallet className="text-3xl text-blue-600" />,
    title: "Affordable Packages",
    desc: "Tailored options for every budget without compromising comfort"
  },
  {
    icon: <FaHeadset className="text-3xl text-blue-600" />,
    title: "24/7 Support",
    desc: "Our team is here to assist you anytime, anywhere"
  },
  {
    icon: <FaHandshake className="text-3xl text-blue-600" />,
    title: "Trusted Network",
    desc: "Verified hotels and drivers for your safety"
  },
  {
    icon: <FaMobileAlt className="text-3xl text-blue-600" />,
    title: "Easy Booking",
    desc: "Book cabs and stays in just a few clicks"
  }
];

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="font-sans text-gray-800 bg-white">

        {/* Hero Section */}
        <section
          className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white relative"
          style={{ backgroundImage: `url(${aboutBg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
            <p className="text-lg w-full mx-auto">
              We are passionate travel planners helping you explore the world stress-free.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:px-[4rem] bg-white">
          <div className="container mx-auto px-6  w-full text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">Our Mission</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-10"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              At <span className="font-bold text-blue-600">StaynRide</span>, we're committed to removing the stress from travel planning by 
              offering <span className="text-blue-600">curated experiences</span> that combine affordability with exceptional quality. 
              We believe every journey should create <span className="text-blue-600">lasting memories</span>.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 md:px-[4rem] bg-gray-50">
          <div className="container mx-auto px-6 w-full">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src={ver}
                  alt="Our Vision"
                  className="rounded-xl shadow-2xl w-[70%] h-64  mx-auto hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold text-blue-700 mb-6">Our Vision</h3>
                <div className="w-16 h-1 bg-blue-500 mb-8"></div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We envision a travel ecosystem where technology meets human touch—where every 
                  traveler enjoys <span className="font-semibold">seamless, authentic experiences</span> supported by our 
                  network of trusted partners.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Democratizing luxury travel experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Building trust through transparency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Sustainable tourism practices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:px-[4rem] bg-white">
          <div className="container mx-auto px-6 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-16">Why Travel With Us</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-20 md:px-[4rem] bg-gray-50">
          <div className="container mx-auto px-6 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-4">Meet Our Team</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              The passionate individuals who make your travel dreams come true
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {team.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:px-[4rem] bg-blue-600 text-white">
          <div className="container mx-auto px-6 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Traveler Stories</h2>
            <p className="text-center text-blue-100 w-full mx-auto mb-12">
              Don't just take our word for it - hear from our happy travelers
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-lg text-gray-800">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < t.rating ? "text-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <p className="italic text-lg mb-6">"{t.feedback}"</p>
                  <h4 className="font-bold text-blue-600 text-right">— {t.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default AboutPage;