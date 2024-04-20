import React, { useState } from 'react';
// import {
//   BookOpenIcon,
//   Bars3BottomRightIcon,
//   XMarkIcon,
// } from '@heroicons/react/24/solid';
import { IoMdMenu } from 'react-icons/io';
import { FaXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const Header = () => {
  let Links = [
    { name: 'HOME', link: '/' },
    { name: 'WHO IS IT FOR?', link: '/' },
    { name: 'CREATORS', link: '/' },
    { name: 'LOGIN', link: '/login' },
  ];
  let [open, setOpen] = useState(false);

  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setHasShadow(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      className={`w-full fixed top-0 left-0 transition-all duration-200 ${hasShadow ? 'shadow-sm bg-white' : 'bg-[#E8EDFB]'}`}
    >
      <div className="md:flex items-center justify-between  py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="font-semibold text-2xl cursor-pointer font-Poppins flex items-center gap-1">
          {/* <BookOpenIcon className="w-7 h-7 text-blue-600" /> */}
          <Link to={'/'}>
            <span>Creators Club</span>
          </Link>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-5 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <FaXmark size={30} /> : <IoMdMenu size={30} />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 font-Poppins  absolute md:static ${
            hasShadow ? 'bg-white' : 'bg-[#E8EDFB]'
          } md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ${
            open ? 'top-12' : 'top-[-490px]'
          }`}
        >
          {Links.map((link, index) => (
            <li className="md:ml-8 md:my-0 my-7 font-medium" key={index}>
              <a
                href={link.link}
                className="black hover:text-blue-600 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <Link
            to={'/create-page'}
            className="bg-blue-600 text-white md:ml-8 hover:bg-blue-800 font-medium font-Poppins px-3 py-2 rounded duration-500 md:static flex items-center"
          >
            Create Your Page
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Header;
