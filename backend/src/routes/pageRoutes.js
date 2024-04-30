import {
  createPage,
  activatePage,
  loginCreator,
  logoutCreator,
  getPageProfile,
  getPageInfo,
  updatePageInfo,
  updatePageAvatar,
  updateCoverImage,
  pageSocialAuth,
  getAllPages,
  deletePageById,
  deleteMyPage,
  updateWithdrawMethod,
  deleteWithdrawMethod,
} from '../controllers/pageController.js';

import express from 'express';
import {
  isCreator,
  isAuthenticated,
  authorizeRoles,
} from '../middlewares/auth.js';

const pageRouter = express.Router();

pageRouter.post('/create-page', createPage);
pageRouter.post('/activate-page', activatePage);
pageRouter.post('/login-page', loginCreator);
pageRouter.post('/logout-page', isCreator, logoutCreator);
pageRouter.get('/page-profile', isCreator, getPageProfile);
pageRouter.put('/update-page-avatar', isCreator, updatePageAvatar);
pageRouter.put('/update-page-info', isCreator, updatePageInfo);
pageRouter.put('/update-cover-image', isCreator, updateCoverImage);
pageRouter.post('page-social-auth', pageSocialAuth);
pageRouter.delete('/delete-page', isCreator, deleteMyPage);
pageRouter.put('/update-payment-methods', isCreator, updateWithdrawMethod);
pageRouter.delete('/delete-withdraw-method', isCreator, deleteWithdrawMethod);
// admin routes
pageRouter.get(
  '/get-all-pages',
  isAuthenticated,
  authorizeRoles('Admin'),
  getAllPages
);

pageRouter.get('/:id', getPageInfo);
pageRouter.delete(
  '/delete-page/:id',
  isCreator,
  authorizeRoles('Admin'),
  deletePageById
);

export default pageRouter;
