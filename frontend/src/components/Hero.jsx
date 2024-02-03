import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div>
      <h1 className="py-3">Hello From the HERO</h1>

      <Link
        to={'/login'}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        LOGIN
      </Link>

      <Link
        to={'/register'}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        REGISTER
      </Link>

      <Link
        to={'/create-page'}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        CREATE PAGE
      </Link>

      <Link
        to={'/verification'}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        VERIFICATION
      </Link>
    </div>
    // <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
    //   <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    //     <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
    //       {/* content - start */}
    //       <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
    //         <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
    //           Make money directly from what you do
    //         </h1>
    //         <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
    //           creators club empowers content creators and influencers start their own subscription page and turn their passion into income.
    //         </p>
    //         <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
    //           <Link
    //             to={'/sign-up'}
    //             className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
    //           >
    //             Get Started
    //           </Link>
    //           <a
    //             href="/explore"
    //             className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
    //           >
    //             Explore
    //           </a>
    //         </div>
    //       </div>
    //       {/* content - end */}
    //       {/* image - start */}
    //       <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
    //         <img
    //           src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?auto=format&q=75&fit=crop&w=1000"
    //           loading="lazy"
    //           alt="Photo by Fakurian Design"
    //           className="h-full w-full object-cover object-center"
    //         />
    //       </div>
    //       {/* image - end */}
    //     </section>
    //   </div>
    // </div>
  );
};

export default Hero;
