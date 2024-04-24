import React from 'react';
import facebook from '../assets/images/icon-facebook.svg';
import instagram from '../assets/images/icon-instagram.svg';
import twitter from '../assets/images/icon-twitter.svg';
import pinterest from '../assets/images/icon-pinterest.svg';
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container max-w-6xl py-10 mx-auto">
        {/* Footer Flex Container */}
        <div className="flex flex-col items-center mb-8 space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-start">
          {/* MENU and LOGO Container */}
          <div className="flex flex-col items-center space-y-8 md:items-start md:space-y-4">
            {/* Logo */}
            <div className="h-8">
              <img src={logo} alt className="w-44 md:ml-3" />
            </div>
            {/* MENU conatiner */}
            <div className="flex flex-col items-center space-y-4 font-medium text-white md:flex-row md:space-y-0 md:space-x-6 md:ml-3">
              {/* Item 2 */}
              <div className="h-10 group">
                <a href="#">About</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50" />
              </div>
              {/* Item 3 */}
              <div className="h-10 group">
                <a href="#">Careers</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50" />
              </div>
              {/* Item 4 */}
              <div className="h-10 group">
                <a href="#">Events</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50" />
              </div>
              {/* Item 5 */}
              <div className="h-10 group">
                <a href="#">Products</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50" />
              </div>
              {/* Item 6 */}
              <div className="h-10 group">
                <a href="#">Support</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50" />
              </div>
            </div>
          </div>
          {/* SOcial and COpy right container */}
          <div className="flex flex-col items-start justify-between space-y-4 text-gray-500">
            {/* Icons Container */}
            <div className="flex items-center mx-auto md:mx-0 justify-center space-x-4 md:justify-end">
              {/* Icon One */}
              <div className="h-8 group">
                <a href="#">
                  <img src={facebook} className="h-6" alt />
                </a>
              </div>
              {/* Icon two */}
              <div className="h-8 group">
                <a href="#">
                <img src={twitter} className="h-6" alt />
                </a>
              </div>
              {/* Icon three */}
              <div className="h-8 group">
                <a href="#">
                  <img src={pinterest} className="h-6" alt />
                </a>
              </div>
              {/* Icon Four */}
              <div className="h-8 group">
                <a href="#">
                <img src={instagram} className="h-6" alt />
                  
                </a>
              </div>
            </div>
            {/* Copy rgiht */}
            <div className="font-medium">
              © 2023 creators club. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
