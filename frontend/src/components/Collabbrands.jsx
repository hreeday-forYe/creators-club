import React from 'react';
import { Link } from 'react-router-dom';
import collab from '../assets/collab.png';
const Collabbrands = () => {
  return (
    <div className="bg-[#1A46C2] text-[#E8EDFB]">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <div className="my-6 md:mt-0 text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-normal ">
            Collaborate With Brands
          </h2>
          <p className="mb-6 font-light md:text-lg">
            Find brands to collab and share it among the followers and subscribers and earn income on side.
          </p>
          <Link
            to={'/create-page'}
            className="inline-flex items-center text-black bg-[#E8EDFB] hover:bg-white transition duration-300 hover:scale-105 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
          >
            Register
            <svg
              className="ml-2 -mr-1 w-5 h-5"
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
        </div>
        <div>
        <img className="w-full" src={collab} alt="dashboard image" />
        <img className="w-full hidden" src={collab} alt="dashboard image" />
        </div>
      </div>
    </div>
  );
};

export default Collabbrands;
