import express from 'express';
import {
  activateUser,
  followUnfollowPage,
  getSuggestedPage,
  getUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateProfilePicture,
  updateUserInfo,
  updateUserPassword,
  getUserFollowings,
  getAllUsers,
  adminAddUser,
  adminDeleteUser,
  adminUpdateUser
} from '../controllers/userControllers.js';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js';
import { getUserAnalytics } from '../controllers/analyticsController.js';

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
userRouter.get('/suggested-pages', isAuthenticated, getSuggestedPage);
userRouter.get('/my-followings', isAuthenticated, getUserFollowings);
userRouter.get(
  '/get-users-analytics',
  isAuthenticated,
  authorizeRoles('Admin'),
  getUserAnalytics
);
userRouter.post(
  '/admin-add-user',
  isAuthenticated,
  authorizeRoles('Admin'),
  adminAddUser
);
userRouter.delete(
  '/admin-delete-user',
  isAuthenticated,
  authorizeRoles('Admin'),
  adminDeleteUser
);
userRouter.get(
  '/admin-all-users',
  isAuthenticated,
  authorizeRoles('Admin'),
  getAllUsers
);
userRouter.get(
  '/admin-update-user',
  isAuthenticated,
  authorizeRoles('Admin'),
  adminUpdateUser
);
userRouter.get('/:id', isAuthenticated, getUser);
userRouter.put('/follow/:id', isAuthenticated, followUnfollowPage);
export default userRouter;
