import React from 'react';
import SuggestedPages from './SuggestedPages';
const Rightbar = () => {
  // #TODO: GET THE SUGGESTED PAGES FOR THE USER using the rtk query 
  return (
    <div className="mt-4">
      <h2 className="text-gray-900 text-xl pl-2">Suggested Pages</h2>
      <div className="mt-4 p-2">
        <SuggestedPages />
        <SuggestedPages />
        <SuggestedPages />
        <SuggestedPages />
      </div>
    </div>
  );
};

export default Rightbar;
