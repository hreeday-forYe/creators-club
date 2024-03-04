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
const Post = () => {
  const likeUnlikeHandler = () => {
    console.log('liked');
  };
  return (
    <Card className="shadow-lg mb-12">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title="John Doe"
        subheader="January 14, 2024"
      />
      <CardMedia
        component="img"
        height="30%"
        image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
        alt="Paella dish"
        allow="autoplay"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
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
  );
};

export default Post;
