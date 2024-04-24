import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Footer from '../components/Footer';
import Whoisit from '../components/Whoisit';
import Collabbrands from '../components/Collabbrands';
import { Link } from 'react-router-dom';
import followers from '../assets/followers.png'
import signup from '../assets/signup.png'
// Child component
const Followers = () => {
  return (
    <section id="followers" className="bg-[#DDE4F9] font-Poppins">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img className="w-full" src={followers} alt="dashboard image" />
        <img className="w-full hidden" src={followers} alt="dashboard image" />
        <div className="mt-4 md:mt-0 text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-normal text-gray-900 ">
            Build a Loyal Fanbase
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg">
            Connect with people who actually care about your content and showcase your creativity among the loyal followers
          </p>
          <Link
            to={'/create-page'}
            className="inline-flex items-center text-white hover:scale-105 duration-200 bg-blue-600 hover:bg-blue-800 focus:ring-4 text-base font-medium rounded-lg px-5 py-2.5 text-center"
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
      </div>
    </section>
  );
};


const CalltoAction = () =>{
  return (
    <div>
      

    </div>
  )
}
const HomeScreen = () => {
  return (
    <>
      <Header />
      <div className="my-16">
        <Hero />
      </div>
      <Whoisit />
      <Collabbrands />
      <Followers />
      <CalltoAction/>
      <Footer />
    </>
  );
};

export default HomeScreen;
