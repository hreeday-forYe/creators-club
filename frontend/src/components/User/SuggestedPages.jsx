import React from 'react';
import { Link } from 'react-router-dom';
const SuggestedPages = ({ creator, index }) => {
  console.log(creator);
  return (
    <Link to={`/page/${creator._id}`}>
      <div className="max-w-xs sm:max-w-sm lg:max-w-md mt-4">
        <div className="bg-white shadow-md hover:shadow-lg rounded-md overflow-hidden">
          {/* Cover Image */}
          {creator.coverImage ? (
            <img
              className="w-full h-36 object-cover"
              src={creator.coverImage.url}
              alt="green iguana"
            />
          ) : (
            <>
              <div className="w-full h-36 bg-gray-300 animate-pulse"></div>
            </>
          )}
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={creator?.avatar.url}
                alt="avatar"
              />
              <h2 className="text-lg">{creator.name}</h2>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {(creator.description && creator.description) || ''}
            </p>
            <div className="mt-4">
              <Link
                to="/page/:id"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SuggestedPages;
