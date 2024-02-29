import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';

const HomeScreen = () => {
  return (
    <>
      <Header />
      <div className="mt-16">
        <Hero />
      </div>
      <About/>
      <div className="flex">
        <div className="bg-teal-500 text-white flex-col hidden sm:block w-64">
          <div className="p-6">
            <span className="font-semibold text-xl tracking-tight">My App</span>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="#dashboard"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#kanban"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  Kanban
                </a>
              </li>
              <li>
                <a
                  href="#inbox"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  Inbox
                </a>
              </li>
              <li>
                <a
                  href="#e-commerce"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  E-commerce
                </a>
              </li>
              <li>
                <a
                  href="#users"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  Users
                </a>
              </li>
              <li>
                <a
                  href="#pages"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  Pages
                </a>
              </li>
              <li>
                <a
                  href="#flowbite"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  Flowbite
                </a>
              </li>
              <li>
                <a
                  href="#authentication"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  Authentication
                </a>
              </li>
              <li>
                <a href="#docs" className="block p-3 rounded hover:bg-teal-700">
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="#components"
                  className="block p-3 rounded hover:bg-teal-700"
                >
                  Components
                </a>
              </li>
              <li>
                <a href="#help" className="block p-3 rounded hover:bg-teal-700">
                  Help
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Content goes here */}
      </div>
    </>
  );
};

export default HomeScreen;
