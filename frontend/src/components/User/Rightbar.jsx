import React, { useEffect } from 'react';
import SuggestedPages from './SuggestedPages';
import { useGetSuggestedPagesQuery } from '../../redux/slices/usersApiSlice';
import Loader from '../Loader';
const Rightbar = () => {
  const { data, refetch, isLoading } = useGetSuggestedPagesQuery();
  const pages = data?.pages;
  // console.log(data);
  useEffect(() => {
    refetch();
  }, [data]);

  return (
    <div className="mt-4">
      <h2 className="text-gray-900 text-xl pl-2">Suggested Pages</h2>
      <div className="mt-4 p-2">
        {isLoading ? (
          <Loader />
        ) : (
          pages.map((creator, index) => (
            <SuggestedPages creator={creator} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Rightbar;
