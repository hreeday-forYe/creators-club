import React from 'react';
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

const Post = ({ posts }) => {
  const likeUnlikeHandler = () => {
    console.log('liked');
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
          <Avatar
            sx={{ bgcolor: 'red' }}
            aria-label="recipe"
            src={post.creator.avatar.url}
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={post?.creator?.name}
        subheader={timeAgo(post.createdAt)}
      />
      {console.log(post.photos)}
      {post.photos && post.photos.length > 0 ? (
        <>
          <CardMedia
            component="img"
            height="30%"
            image={post.photos[0]}
            alt="Paella dish"
            allow="autoplay"
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
      </CardActions>
    </Card>
  ));
};

export default Post;
