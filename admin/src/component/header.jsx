import React, { useState, useRef, useEffect, useContext } from "react";
import people from "../assets/images/people.jpg";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";

function Header(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    console.log("Navigate to profile");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    logout();
    console.log("Logging out...");
    setIsDropdownOpen(false);
  };

  const handleSettings = () => {
    // Add your settings navigation logic here
    console.log("Navigate to settings");
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex w-full flex-row justify-between items-center gap-4 p-4 py-2 shadow-md bg-white px-5 sticky top-0">
      <h1 className="text-xl font-serif flex font-bold text-blue-800">
        Stayn
        <span>
          <img src={Logo} alt="Logo" className="h-8 w-8 object-contain" />
        </span>
        Ride
      </h1>

      <div
        className="flex flex-row items-center gap-4 w-auto relative"
        ref={dropdownRef}
      >
        <Menu
          className="lg:hidden cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => props.setisActive(!props.isActive)}
        />

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src={people}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-400 transition-all"
          />
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {isDropdownOpen && (
          <div className="origin-top-right z-50 absolute right-0 top-10 w-56 rounded-lg shadow-xl bg-white  focus:outline-none overflow-hidden animate-fade-in">
            <div className="py-1">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <Link to="profile">
                {" "}
                <div
                  onClick={handleProfileClick}
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                >
                  <User className="mr-3 h-4 w-4 text-gray-400" />
                  Profile
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors border-t border-gray-100"
              >
                <LogOut className="mr-3 h-4 w-4 text-red-400" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
