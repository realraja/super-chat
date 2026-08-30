import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Optional: If you use react-router for navigation

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyWebsite</Link>
        </div>

        {/* Search Bar */}
        <div className="relative text-gray-600">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="bg-gray-700 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none text-white"
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg className="h-4 w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" xmlSpace="preserve" width="512px" height="512px">
              <path d="M55.146,51.887L41.588,38.329c3.486-4.304,5.578-9.787,5.578-15.732C47.166,10.088,37.078,0,24.083,0   S1,10.088,1,22.597s10.088,22.597,22.597,22.597c5.545,0,10.697-1.92,14.88-5.419l13.696,13.696c0.781,0.781,2.047,0.781,2.828,0   l0.146-0.146C55.926,53.933,55.926,52.668,55.146,51.887z M23.597,40.195c-9.717,0-17.597-7.88-17.597-17.597   s7.88-17.597,17.597-17.597s17.597,7.88,17.597,17.597S33.314,40.195,23.597,40.195z" />
            </svg>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
            <img
              className="h-10 w-10 rounded-full border-2 border-gray-600 object-cover"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
              <button
                onClick={() => { /* Add your logout logic here */ }}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
