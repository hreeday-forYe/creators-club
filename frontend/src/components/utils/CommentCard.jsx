import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useGetUserByIdQuery } from '../../redux/slices/usersApiSlice';
const CommentCard = ({ comment, key, isCreator, deleteCommentHandle }) => {
  const { authInfo } = useSelector((state) => state.auth);
  const { user } = authInfo;
  const [userInfo, setUserInfo] = useState();
  const { getUserById } = useGetUserByIdQuery();
  // useEffect(async () => {
  //   const userId = comment.user;
  //   const response = await getUserById({ userId });
  //   console.log('response;', response);
  //   setUserInfo(...response);
  // }, [comment]);
  return (
    <div className="flex items-center">
      <Avatar>R</Avatar>
      <Typography style={{ minWidth: '6vmax' }} className="mr-2">
        {comment.user}
      </Typography>
      <Typography>{comment.comment}</Typography>

      {isCreator ? (
        <Button onClick={deleteCommentHandle}>
          <FaRegTrashAlt size={25} />
        </Button>
      ) : comment.user === user._id ? (
        <Button onClick={deleteCommentHandle}>
          <FaRegTrashAlt />
        </Button>
      ) : null}
    </div>
  );
};

CommentCard.defaultProps = {
  isCreator: false,
};

export default CommentCard;
