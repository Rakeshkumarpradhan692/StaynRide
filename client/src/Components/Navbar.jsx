import { AuthContext } from "../context/authContext";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../Components/Photo/logo.png";
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const { setAuth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    if (storedUser && authStatus) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Listen for scroll and auth changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setIsAuthenticated(authStatus);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinkStyles = ({ isActive }) => ({
    color: isActive ? "#3b82f6" : "#374151",
    borderBottom: isActive ? "2px solid #3b82f6" : "none",
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setAuth({ isLoggedIn: false });
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-0"
          : "bg-white/90 backdrop-blur-sm py-2"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-[4rem]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold text-blue-600 hidden sm:inline">
                StaynRide
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              style={navLinkStyles}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              style={navLinkStyles}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              style={navLinkStyles}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-blue-600 font-medium focus:outline-none"
                >
                  <FaUser className="mr-2" />
                  {user?.name || "User"}
                  <FaChevronDown className="ml-1" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <FaUserPlus className="mr-2" />
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white shadow-xl`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/"
            style={navLinkStyles}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            style={navLinkStyles}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            style={navLinkStyles}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 px-5">
          {isAuthenticated ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaUser className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
              >
                <FaSignOutAlt className="mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
              >
                <FaUserPlus className="mr-2" />
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
