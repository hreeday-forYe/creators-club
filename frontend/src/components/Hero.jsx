import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input, FormHelperText } from '@mui/material';
import hero from '../assets/hero.png';
const Hero = () => {
  const notify = () => toast.success('Here is your toast.');
  return (
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Make money directly from what you do
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Creators Club empowers content creators and influencers start their
            own subscription page and turn their passion into income.
          </p>
          <Link
            to={'/create-page'}
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 transition duration-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
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
          <Link
            to={'/explore'}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border transition duration-200 border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
          >
            Explore Creators
          </Link>
        </div>
        <div className="sm:w-50% lg:mt-0 lg:col-span-5 lg:flex">
          <img src={hero} alt="hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
