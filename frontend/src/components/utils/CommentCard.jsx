import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useGetPageInfoQuery } from '../../redux/slices/pagesApiSlice';

const CommentCard = ({
  comment,
  isCreator,
  user,
  deleteCommentHandler,
  creatorId,
}) => {
  const commentId = comment._id;
  // console.log(comment._id);
  // console.log(comment.user);
  const authInfo = useSelector((state) => state.auth);
  // console.log(authInfo);

  const { data } = useGetPageInfoQuery(creatorId);
  const creator = data?.creator;

  return (
    <div
      className="flex border mb-2 justify-start items-center p-2 space-x-4"
      key={comment?._id}
    >
      <Avatar src={comment?.user?.avatar?.url || creator?.avatar?.url}>
        {user?.name?.charAt(0).toUpperCase()}
      </Avatar>
      <Typography style={{ minWidth: '6vmax' }} className="mr-2 capitalize">
        {comment?.user?.name || `${creator?.name}  `}:
      </Typography>
      <Typography>{comment.comment}</Typography>

      {isCreator ? (
        <Button onClick={() => deleteCommentHandler(commentId)}>
          <FaRegTrashAlt size={20} />
        </Button>
      ) : comment.user?._id === user._id ? (
        <Button onClick={() => deleteCommentHandler(commentId)}>
          <FaRegTrashAlt size={20} />
        </Button>
      ) : null}
    </div>
  );
};

CommentCard.defaultProps = {
  isCreator: false,
};

export default CommentCard;
