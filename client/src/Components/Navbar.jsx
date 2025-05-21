// import React, { useState, useEffect } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import Logo from "../Components/Photo/logo.png";
// import { useAuth0 } from "@auth0/auth0-react";
// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//    const { loginWithRedirect } = useAuth0();
//   useEffect(() => {
//     // Check login state from localStorage
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const navLinkStyles = ({ isActive }) => ({
//     fontWeight: isActive ? "bold" : "normal",
//     color: isActive ? "orange" : "inherit",
//     textDecoration: isActive ? "underline" : "none",
//   });

//   const handleLogin = () => navigate("/login");
//   const handleRegister = () => navigate("/register");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   return (
//     <header className="bg-white sticky top-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <h1 className="text-xl md:text-2xl font-bold text-blue-700 flex items-center gap-1">
//             Stayn
//             <img src={Logo} alt="Logo" className="h-8 w-8 object-contain" />
//             Ride
//           </h1>
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-6 font-semibold text-gray-700">
//           <NavLink style={navLinkStyles} to="/" className="hover:text-blue-600 transition">Home</NavLink>
//           <NavLink style={navLinkStyles} to="/about" className="hover:text-blue-600 transition">About Us</NavLink>
//           <NavLink style={navLinkStyles} to="/contact" className="hover:text-blue-600 transition">Contact Us</NavLink>
//         </nav>

//         {/* Desktop Auth Buttons */}
//         <div className="hidden md:flex space-x-4">
//           {/* {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <button onClick={handleLogin} className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
//                 Login
//               </button>
//               <button onClick={handleRegister} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//                 Register
//               </button>
//             </>
//           )} */}
//           <button onClick={(handleRegister) => loginWithRedirect()}>Log In</button>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-blue-700 focus:outline-none"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//             {isMenuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden px-4 pb-4 fixed w-full bg-slate-400 space-y-3">
//           <div className="flex flex-col space-y-2 font-semibold text-gray-700">
//             <NavLink style={navLinkStyles} to="/" className="hover:text-blue-600 transition">Home</NavLink>
//             <NavLink style={navLinkStyles} to="/about" className="hover:text-blue-600 transition">About Us</NavLink>
//             <NavLink style={navLinkStyles} to="/contact" className="hover:text-blue-600 transition">Contact Us</NavLink>
//           </div>
//           <div className="pt-2 flex flex-col space-y-2">
//             {isLoggedIn ? (
//               <button onClick={handleLogout} className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <button onClick={handleLogin} className="w-full py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
//                   Login
//                 </button>
//                 <button onClick={handleRegister} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//                   Register
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;



import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../Components/Photo/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    if (storedUser && authStatus) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Listen for auth changes in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setIsAuthenticated(authStatus);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const navLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "orange" : "inherit",
    textDecoration: isActive ? "underline" : "none",
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="w-full mx-auto flex items-center justify-between px-[1rem] md:px-[4rem] py-3">
       
        <div className="flex items-center space-x-2">
          <h1 className="text-xl md:text-2xl font-bold text-blue-700 flex items-center gap-1">
            Stayn
            <img src={Logo} alt="Logo" className="h-8 w-8 object-contain" />
            Ride
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-semibold text-gray-700">
          <NavLink style={navLinkStyles} to="/" className="hover:text-blue-600 transition">Home</NavLink>
          <NavLink style={navLinkStyles} to="/about" className="hover:text-blue-600 transition">About Us</NavLink>
          <NavLink style={navLinkStyles} to="/contact" className="hover:text-blue-600 transition">Contact Us</NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-blue-600 font-medium">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-blue-700 focus:outline-none"
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

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 fixed w-full bg-slate-400 space-y-3 z-40">
          <div className="flex flex-col space-y-2 font-semibold text-gray-700">
            <NavLink style={navLinkStyles} to="/" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink style={navLinkStyles} to="/about" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
            <NavLink style={navLinkStyles} to="/contact" className="hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
          </div>
          <div className="pt-2 flex flex-col space-y-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/register");
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;



