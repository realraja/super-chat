import React, { useState } from 'react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6h.01M12 12h.01M12 18h.01" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 mt-10 w-64 bg-gray-800 text-white rounded-lg shadow-lg p-4">
          <ul>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 6h18M3 18h18" />
              </svg>
              Saved Messages
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5-5m0 0l5 5m-5-5v12" />
              </svg>
              Contacts
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              My Stories
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V7a4 4 0 118 0v4M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
              </svg>
              Settings
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9V3m-6 6l6-6 6 6m0 6v6m-6-6l-6 6 6 6" />
              </svg>
              Night Mode
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5l14 14m-7 7a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
              Animations
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 16h6M12 9h.01" />
              </svg>
              Telegram Features
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6m-6-4h6" />
              </svg>
              Report a Bug
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Switch to K Version
            </li>
            <li className="p-2 hover:bg-gray-700 rounded flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Install App
            </li>
          </ul>
          <div className="p-2 mt-4 text-gray-400">
            Telegram Web A 10.9.7
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
