import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';

const CommentCard = ({
  comment,
  key,
  isCreator,
  user,
  deleteCommentHandler,
}) => {
  const commentId = comment._id;
  console.log(comment._id);
  console.log(comment.user);
  return (
    <div
      className="flex border justify-evenly items-center p-2 space-x-4"
      key={key}
    >
      <Avatar></Avatar>
      <Typography style={{ minWidth: '6vmax' }} className="mr-2 capitalize">
        {comment?.user?.name}:
      </Typography>
      <Typography>{comment.comment}</Typography>

      {isCreator ? (
        <Button onClick={() => deleteCommentHandler(commentId)}>
          <FaRegTrashAlt size={25} />
        </Button>
      ) : comment.user._id === user._id ? (
        <Button onClick={() => deleteCommentHandler(commentId)}>
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
