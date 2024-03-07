import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Footer from '../components/Footer';
const HomeScreen = () => {
  return (
    <>
      <Header />
      <div className="mt-16">
        <Hero />
      </div>
      <Footer />
    </>
  );
};

export default HomeScreen;
