import React from 'react';
import { Tooltip, Fab, Typography, Button } from '@mui/material';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
const CreatePost = () => {
  return (
    <Tooltip title="Create Post" className="flex items-center space-x-4">
      <Link
        to={'/create-post'}
        className="p-2 shadow-sm  rounded-xl hover:shadow-md"
      >
        <Fab color="primary" aria-label="add">
          <IoMdAdd size={40} />
        </Fab>
        <Typography className="font-bold">Create Post</Typography>
      </Link>
    </Tooltip>
  );
};

export default CreatePost;
