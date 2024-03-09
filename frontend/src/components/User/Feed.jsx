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
const Feed = () => {
  const { data, isLoading } = usePostsOfFollowingsQuery();
  const posts = data?.posts;
  console.log(posts);
  return isLoading ? (
    <Loader />
  ) : (
    <Box flex={4} p={6}>
      <Post posts={posts} />
    </Box>
  );
};

export default Feed;
