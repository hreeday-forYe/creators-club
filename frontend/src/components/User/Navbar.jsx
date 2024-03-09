import {
  AppBar,
  styled,
  Typography,
  Toolbar,
  Box,
  Avatar,
} from '@mui/material';
import React, { useState } from 'react';
import { InputBase, Menu, MenuItem } from '@mui/material';
import { IoSearchOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '5px 10px',
  borderRadius: '10px',
  width: '30%',
}));
const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: '10px',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: { display: 'flex' },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: { display: 'none' },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  const { authInfo } = useSelector((state) => state.auth);
  
  

  console.log(authInfo);
  const { user } = authInfo?.user;
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: { xs: 'none', sm: 'block' },
            fontFamily: 'ui-sans-serif',
          }}
        >
          Creators Club
        </Typography>
        {/* TODO: Here we can use our own logo and give the sx property */}
        {/* <RxButton size={40} className="none md:block" /> */}
        <Search className="flex items-center justify-between">
          <InputBase placeholder="Search..." />
          <IoSearchOutline className="text-gray-700" size={25} />
        </Search>
        <Icons>
          {/* <Badge badgeContent={4} color="error">
            <IoNotifications size={25} />
          </Badge> */}
          <Avatar
            src={user?.avatar?.url}
            sx={{ width: 40, height: 40, cursor: 'pointer' }}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30 }} />
          <Typography className="-pl-2">
            noneman
            {/* {userInfo ? userInfo.name : pageInfo.name} */}
          </Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className="mt-4 "
      >
        <Link to={'/profile'}>
          <MenuItem>Profile</MenuItem>
        </Link>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
