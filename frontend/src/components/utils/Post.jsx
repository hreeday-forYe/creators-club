import React, { useState } from 'react';
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
} from '@mui/material';
import { MdOutlineFavorite } from 'react-icons/md';
import { LiaCommentSolid } from 'react-icons/lia';
import { formatDistanceToNow, format } from 'date-fns';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Post = ({ posts, isCreator, deletePost }) => {
  const [liked, setLiked] = useState(false);
  const likeUnlikeHandler = () => {
    console.log('liked');
    setLiked(!liked);
  };

  // format date and time
  const timeAgo = (getDate) => {
    const date = new Date(getDate);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return timeAgo;
  };

  return posts.map((post, index) => (
    <Card className="shadow-md mb-12" key={index}>
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
          <p className="text-lg font-medium capitalize">
            {post?.creator?.name}
          </p>
        }
        subheader={timeAgo(post.createdAt)}
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
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.title}
            </Typography>
          </CardContent>
        </>
      ) : (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.title}
          </Typography>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <Checkbox
          icon={<MdOutlineFavorite size={30} className="text-gray-300" />}
          checkedIcon={
            <MdOutlineFavorite size={30} className="text-red-700 " />
          }
          onChange={likeUnlikeHandler}
        />
        <IconButton aria-label="Comments">
          <LiaCommentSolid size={30} className="text-gray-700" />
        </IconButton>
        {isCreator && (
          <IconButton
            aria-label="deletePost"
            onClick={() => deletePost(post._id)}
          >
            <FaRegTrashAlt size={25} className="text-gray-700" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  ));
};

Post.defaultProps = {
  isCreator: false,
};
export default Post;
