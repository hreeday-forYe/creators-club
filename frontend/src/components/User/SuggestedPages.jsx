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
import { Link } from 'react-router-dom';
const SuggestedPages = () => {
  return (
    // <Link to={'/page/:id'}>
    //   <Card sx={{ maxWidth: 345 }} className="mt-4">
    //     <CardActionArea>
    //       <CardMedia
    //         component="img"
    //         style={{ height: 150 }}
    //         image="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZWNlfGVufDB8fDB8fHww"
    //         alt="green iguana"
    //       />
    //       <CardContent>
    //         <Box className="flex items-center space-x-4">
    //           <Avatar src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    //           <Typography gutterBottom variant="h5" component="div">
    //             Creators Club
    //           </Typography>
    //         </Box>
    //         <Typography variant="body2" color="text.secondary">
    //           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
    //           eius, rem cumque accusamus ipsa earum illo officia vel expedita.
    //           Voluptatem fugiat
    //         </Typography>
    //       </CardContent>
    //     </CardActionArea>
    //     <CardActions>
    //       <Button size="small" className="hover:shadow-md">
    //         View More
    //       </Button>
    //     </CardActions>
    //   </Card>
    // </Link>
    <Link to="/page/:id">
      <div className="max-w-xs sm:max-w-sm lg:max-w-md mt-4">
        <div className="bg-white shadow-md hover:shadow-lg rounded-md overflow-hidden">
          <img
            className="w-full h-28 sm:h-52 object-cover"
            src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZWNlfGVufDB8fDB8fHww"
            alt="green iguana"
          />
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="avatar"
              />
              <h2 className="text-lg">Creators Club</h2>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              eius, rem cumque accusamus ipsa earum illo officia vel expedita.
              Voluptatem fugiat
            </p>
            <div className="mt-4">
              <Link
                to="/page/:id"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SuggestedPages;
