import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';

import React from 'react';
import Post from '../utils/Post';
import { usePostsOfFollowingsQuery } from '../../redux/slices/postApiSlice';
import Loader from '../Loader';
import { useSelector } from 'react-redux';

const Feed = () => {
  const { data, isLoading, refetch } = usePostsOfFollowingsQuery();
  const posts = data?.posts;
  console.log(posts);
  const { authInfo } = useSelector((state) => state.auth);
  console.log(authInfo);
  const user = authInfo.user;
  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full p-1 800px:p-8">
      {posts.map((post) => {
        return <Post post={post} user={user} refetch={refetch} />;
      })}
    </div>
  );
};

export default Feed;
