import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Checkbox,
  Dialog,
  Input,
  Button,
  // Box,
} from '@mui/material';
import { MdOutlineFavorite } from 'react-icons/md';
import { LiaCommentSolid } from 'react-icons/lia';
import { formatDistanceToNow, format } from 'date-fns';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import CommentCard from './CommentCard';
import { FaLocationArrow, FaEdit } from 'react-icons/fa';
import { useLikeUnlikePostMutation } from '../../redux/slices/postApiSlice';
import { useCreateCommentMutation } from '../../redux/slices/postApiSlice';
import { useDeleteCommentMutation } from '../../redux/slices/postApiSlice';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import socketIO from 'socket.io-client';
import { socket_server_url } from '../../constants';
const socketId = socketIO(socket_server_url, { transports: ['websocket'] });

const Post = ({ post, isCreator, deletePost, refetch, user }) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [commentDialog, setCommentDialog] = useState(false);

  const [likeUnlikePost] = useLikeUnlikePostMutation();
  const [commentOnPost] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const postId = post?._id;

  useEffect(() => {
    if (post.likes.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post]);
  // console.log(user);
  // console.log(post.comments);
  // console.log(user._id);
  const likeUnlikeHandler = async (post) => {
    try {
      await likeUnlikePost(post._id).unwrap();
      setLiked(!liked);
      refetch();
      socketId.emit('notification', {
        title: 'liked your post',
        message: `${user.name} just liked your post`,
        userId: user._id,
      });
      // console.log(post.likes);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('the post ID ', postId);
      console.log(comment);
      await commentOnPost({ postId, comment }).unwrap();
      setComment('');
      refetch();
      toast.success('comment added ');
      socketId.emit('notification', {
        title: 'Comment on your post',
        message: `${user.name} just commented on your post`,
        userId: user._id,
      });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      await deleteComment({ postId, commentId }).unwrap();
      refetch();
      toast.success('comment deleted Succesfully');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // format date and time
  const timeAgo = (getDate) => {
    const date = new Date(getDate);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo;
  };

  return !post ? (
    <Loader />
  ) : (
    <Card className="shadow-md mb-12 w-[100%] 800px:w-[100%] border">
      <CardHeader
        avatar={
          <Link to={`/page/${post?.creator?._id}`}>
            <Avatar
              sx={{ bgcolor: 'red' }}
              aria-label="recipe"
              src={post?.creator?.avatar?.url}
            >
              R
            </Avatar>
          </Link>
        }
        title={
          <div>
            <span className="text-lg font-medium capitalize">
              {post?.creator?.name}
            </span>
            <span className="text-md ml-2 font-light text-gray-600">
              just posted
            </span>
          </div>
        }
        subheader={
          <div>
            <span>{timeAgo(post.createdAt)}</span>
            <span className="ml-2">
              {post.status === 'public' ? 'Public' : 'Private'}
            </span>
          </div>
        }
      />
      {console.log(post.photos)}
      {post.photos && post.photos.length > 0 ? (
        <>
          <CardMedia
            component="img"
            className="w-[20%] h-[500px]"
            image={post.photos[0].url}
            alt="Paella dish"
          />
          {/* <Box size={2}>
            <Carousel photos={post.photos} />
          </Box> */}
          <CardContent>
            <h4 className="text-black font-medium">{post.title}</h4>
          </CardContent>
        </>
      ) : (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.title}
          </Typography>
        </CardContent>
      )}
      <CardActions className="flex space-x-4">
        <div className="flex items-center ml-4">
          {/* Like Section */}
          {liked ? (
            <MdFavorite
              size={30}
              onClick={() => likeUnlikeHandler(post)}
              className="cursor-pointer text-red-600"
            />
          ) : (
            <MdFavoriteBorder
              size={30}
              onClick={() => likeUnlikeHandler(post)}
              className="cursor-pointer"
            />
          )}
          <span className="pl-1 hidden 800px:block text-black font-medium">
            {post.likes.length} likes
          </span>
        </div>
        {/* Comment Section */}
        <div className="flex items-center">
          <IconButton
            aria-label="Comments"
            onClick={() => setCommentDialog(!commentDialog)}
          >
            <LiaCommentSolid size={30} className="text-black mr-2" />
          </IconButton>
          <form onSubmit={(e) => commentHandler(e, post)}>
            <Input
              type=""
              placeholder="comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit">
              <FaLocationArrow size={20} className="hidden 800px:inline" />
            </Button>
          </form>
        </div>
        {isCreator && (
          <>
            <IconButton
              aria-label="deletePost"
              onClick={() => deletePost(post._id)}
            >
              <FaRegTrashAlt size={25} className="text-gray-700" />
            </IconButton>
            <IconButton
              aria-label="updatePost"
              onClick={() => updatePost(post._id)}
            >
              <FaEdit size={25} className="text-gray-700" />
            </IconButton>
          </>
        )}
      </CardActions>

      <Dialog
        open={commentDialog}
        onClose={() => setCommentDialog(!commentDialog)}
      >
        <div className=" min-w-[350px] 800px:min-w-[500px]  h-[100vh] p-2">
          <Typography variant="h4">Comments</Typography>

          <form className="flex m-6" onSubmit={(e) => commentHandler(e, post)}>
            <input
              type="text"
              value={comment}
              className="w-[100%] py-2 px-4 outline-none border rounded-md font-Roboto"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment here..."
              required
            />

            <Button type="submit" className="rounded-sm" variant="contained">
              <FaLocationArrow size={20} />
            </Button>
          </form>
          {post.comments.length > 0 ? (
            post.comments.map((comment, index) => {
              return (
                <>
                  <CommentCard
                    comment={comment}
                    key={index}
                    isCreator={isCreator}
                    user={user}
                    deleteCommentHandler={deleteCommentHandler}
                  />
                </>
              );
            })
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>
    </Card>
  );
};

Post.defaultProps = {
  isCreator: false,
};
export default Post;
