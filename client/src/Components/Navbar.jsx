import React, { useState } from "react";
import Logo from '../Components/Photo/logo.png'
// import { RiHotelFill } from "react-icons/ri";
// import { FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Header = () => {
   const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      color:isActive?'orange':'',
      textDecoration: isActive ? 'underline' : 'none',
    }
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  // const handleHotelBooking = () => {
  //   alert("Hotel booking function triggered!");
  //   // Add actual navigation or modal logic here
  // };

  // const handleCabBooking = () => {
  //   alert("Cab booking function triggered!");
  //   // Add actual navigation or modal logic here
  // };
  return (
    <header className="bg-white sticky z-50 top-0 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="flex flex-col items-center space-x-2">
          
          <h1 className="text-2xl flex font-bold text-blue-700">Stayn <span><img src={Logo} alt="Logo" className="h-10 w-10 object-contain" /></span>Ride</h1>
        </div>


        <nav className="gap-6 text-gray-700 font-bold hidden md:flex">
          <NavLink style={navLinkStyles} to="/" className="hover:text-blue-500 transition">Home</NavLink>
          <NavLink style={navLinkStyles} to="/about" className="hover:text-blue-500 transition">About Us</NavLink>
          <NavLink style={navLinkStyles} to="/contact" className="hover:text-blue-500 transition">Contact Us</NavLink>
        </nav>
        {/* <div className="flex  gap-2">
           <button onClick={handleHotelBooking} className="flex items-center gap-1 hover:text-blue-600 transition">
            <RiHotelFill className="w-5 h-5" />
            Hotel
          </button>
          <button onClick={handleCabBooking} className="flex items-center gap-1 hover:text-blue-600 transition">
            <FaCar className="w-5 h-5" />
            Cab
          </button>
         </div> */}

        <div className="space-x-4 hidden md:flex">
          <button onClick={handleLogin} className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
            Login
          </button>
          <button onClick={handleRegister} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Register
          </button>
        </div>


        <button
          className="md:hidden text-blue-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>


      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
         <NavLink  style={navLinkStyles} to="/" className="hover:text-blue-500 transition">Home</NavLink>
          <NavLink style={navLinkStyles} to="/about" className="hover:text-blue-500 transition">About Us</NavLink>
          <NavLink style={navLinkStyles} to="/contact" className="hover:text-blue-500 transition">Contact Us</NavLink>
          <div className="space-y-2 pt-2">
            <button onClick={handleLogin} className="w-full border border-blue-600 text-blue-600 rounded py-2 hover:bg-blue-50 transition">
              Login
            </button>
            <button onClick={handleRegister} className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition">
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
