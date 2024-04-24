import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import { MdExplore } from 'react-icons/md';
import hero from '../assets/hero.png';
import svg1 from '../assets/svg1.png'
import svg2 from '../assets/svg2.png'
import svg3 from '../assets/svg3.png'
const Hero = () => {
  const notify = () => toast.success('Here is your toast.');
  return (
    <section className="bg-[#E8EDFB]">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-semibold font-Poppins tracking-tight leading-none md:text-5xl xl:text-6xl">
            Make money directly from your content
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 font-Poppins md:text-lg lg:text-xl">
            Creators Club empowers content creators and influencers start their
            own subscription page and turn their passion into income.
          </p>
          <Link
            to={'/create-page'}
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 transition duration-200 hover:bg-blue-800 hover:scale-105 focus:ring-4 focus:ring-blue-300 font-Poppins"
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
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-blue-600 border-blue-600 border-2 transition duration-200 hover:scale-105 hover:shadow-md rounded-lg focus:ring-4 font-Poppins  focus:ring-gray-100"
          >
            Explore Creators
          </Link>
        </div>
        <div className="sm:w-50% lg:mt-0 lg:col-span-5 lg:flex">
          <img src={hero} alt="hero" />
        </div>
      </div>
      <div className=" rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-4 border flex flex-col items-center  border-gray-200 rounded-lg">
            {/* <FaScrewdriverWrench size={30} className="text-blue-600" /> */}
            <img src={svg3} alt="" />

            <h3 className="text-lg font-semibold my-2">Custom Content</h3>
            <p className="text-gray-600">
              Create a custom content for subscribers only
            </p>
          </div>
          <div className="p-4 border border-gray-200 flex flex-col items-center rounded-lg">
            <img src={svg1} alt="" />
            <h3 className="text-lg font-semibold mb-2">Explore Creators</h3>
            <p className="text-gray-600">
              Discover a variety of creators and their content.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg flex flex-col items-center">
          <img src={svg2} alt="" />

            <h3 className="text-lg font-semibold mb-2">Earn Money</h3>
            <p className="text-gray-600">
              Turn your passion into income with Creators Club.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
