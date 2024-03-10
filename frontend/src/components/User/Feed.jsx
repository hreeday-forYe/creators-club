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
  const user = authInfo?.user;
  console.log(user);
  return isLoading ? (
    <Loader />
  ) : (
    <Box flex={4} p={6}>
      {posts &&
        posts.map((post) => <Post post={post} refetch={refetch} user={user} />)}
    </Box>
  );
};

export default Feed;
