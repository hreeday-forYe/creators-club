import React from 'react';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
// import {
//   footercompanyLinks,
//   footerProductLinks,
//   footerSupportLinks,
// } from '../../static/data';

const Footer = () => {
  const footercompanyLinks = [
    {
      name: 'Game & Video',
    },
    {
      name: 'Phone &Tablets',
    },
    {
      name: 'Computers & Laptop',
    },
    {
      name: 'Sport Watches',
    },
    {
      name: 'Events',
    },
  ];
  const footerSupportLinks = [
    {
      name: 'FAQ',
    },
    {
      name: 'Reviews',
    },
    {
      name: 'Contact Us',
    },
    {
      name: 'Shipping',
    },
    {
      name: 'Live chat',
    },
  ];

  const footerProductLinks = [
    {
      name: 'About us',
      link: '/about',
    },
    {
      name: 'Careers',
      link: '/carrers',
    },
    {
      name: 'Store Locations',
    },
    {
      name: 'Our Blog',
    },
    {
      name: 'Reviews',
    },
  ];
  return (
    <div className="bg-[#0e0e0e] text-white">
      <div className="grid grid-cols-2 sm:gird-cols-3 lg:grid-cols-4  sm:px-6 px-5 py-6 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <h1 className="text-2xl font-bold">Creators Club</h1>
          <br />
          <p>Start Earning by providing exclusive offers for your followers</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: '15px', cursor: 'pointer' }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: '15px', cursor: 'pointer' }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: '15px', cursor: 'pointer' }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start flex flex-wrap justify-center sm:justify-start space-x-4">
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2024 Creators Club. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <span></span>
      </div>
    </div>
  );
};

export default Footer;
