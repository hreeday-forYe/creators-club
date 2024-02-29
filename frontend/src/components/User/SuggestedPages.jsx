import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from '@mui/material';
const SuggestedPages = () => {
  return (
    <Card sx={{ maxWidth: 345 }} className="mt-4">
      <CardActionArea>
        <CardMedia
          component="img"
          style={{ height: 150 }}
          image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="green iguana"
        />
        <CardContent>
          <Box className="flex items-center space-x-4">
            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Hey, I am a Funny guy who likes to play guitar I make content
            regarding it
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" className="hover:shadow-md">
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

export default SuggestedPages;
