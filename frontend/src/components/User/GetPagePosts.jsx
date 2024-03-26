import React from 'react';
import { usePagePostsQuery } from '../../redux/slices/postApiSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const GetPagePosts = () => {
  const { id: pageId } = useParams();
  console.log(pageId);
  const { pagePosts, isLoading, refetch, error } = usePagePostsQuery(pageId);
  console.log(error);
  console.log(pagePosts);
  // useEffect(() => {
  //   refetch();
  // }, [pagePosts]);
  return (
    <div>
      <h1>Get Page Posts</h1>
    </div>
  );
};

export default GetPagePosts;
