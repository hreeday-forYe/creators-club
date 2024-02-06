import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IoIosHome } from 'react-icons/io';
import { MdExplore } from 'react-icons/md';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import React from 'react';
import CreatePost from './CreatePost';

const Sidebar = () => {
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: 'none', sm: 'block' }, position: 'sticky' }}
    >
      <Box position={'fixed'}>
        <List>
          <ListItem>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <IoIosHome size={30} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <MdExplore size={30} />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <FaUserFriends size={30} />
              </ListItemIcon>
              <ListItemText primary="Following" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <BiSolidPurchaseTag size={30} />
              </ListItemIcon>
              <ListItemText primary="Subscriptions" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <RxAvatar size={30} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
        {/* if the user is creator then show this button else don't show */}
        <CreatePost />
      </Box>
    </Box>
  );
};

export default Sidebar;
