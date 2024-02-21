import express from 'express';
import {
  activateUser,
  followUnfollowPage,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateProfilePicture,
  updateUserInfo,
  updateUserPassword,
} from '../controllers/userControllers.js';
import { isAuthenticated } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register-user', registerUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login-user', loginUser);
userRouter.post('/logout', isAuthenticated, logoutUser);
userRouter.get('/profile', isAuthenticated, getUserProfile);
userRouter.post('/social-auth', socialAuth);
userRouter.put('/update-user-info', isAuthenticated, updateUserInfo);
userRouter.put('/update-password', isAuthenticated, updateUserPassword);
userRouter.put('/update-avatar', isAuthenticated, updateProfilePicture);

userRouter.put('/follow/:id', isAuthenticated, followUnfollowPage);

export default userRouter;
