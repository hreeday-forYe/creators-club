import React, { useState, useEffect } from 'react';
import ApprovedPosts from './PostNav/ApprovedPosts';
import UnapprovedPosts from './PostNav/UnApprovedPosts';

const AllPosts = () => {
  const [selectedTab, setSelectedTab] = useState('approved');

  const handleApprovedTabClick = () => {
    setSelectedTab('approved');
  };

  const handleUnapprovedTabClick = () => {
    setSelectedTab('unapproved');
  };

  return (
    <>
      <div className="w-[80vw] 800px:p-8">
        <div className="flex justify-center w-[100%]">
          <div className="w-[100%] 800px:w-[800px] border-red-600 flex flex-col justify-center">
            <div className="flex items-center mt-2 justify-center">
              <button
                className={`px-4 py-2 mr-2 ${
                  selectedTab === 'approved'
                    ? 'bg-blue-500 text-white rounded-md'
                    : 'bg-gray-200 text-gray-800 rounded-md'
                }`}
                onClick={handleApprovedTabClick}
              >
                Approved Posts
              </button>
              <button
                className={`px-4 py-2 ${
                  selectedTab === 'unapproved'
                    ? 'bg-blue-500 text-white rounded-md shadow-md'
                    : 'bg-gray-200 text-gray-800 rounded-md shadow-md'
                }`}
                onClick={handleUnapprovedTabClick}
              >
                Unapproved Posts
              </button>
            </div>

            {selectedTab === 'approved' ? (
              <ApprovedPosts />
            ) : (
              <UnapprovedPosts />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPosts;
