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
pageRouter.get('/logout-page', isCreator, logoutCreator);
pageRouter.get('/page-profile', isCreator, getPageProfile);
pageRouter.get('get-page-info/:id', getPageInfo);
pageRouter.put('/update-page-avatar', isCreator, updatePageAvatar);
pageRouter.put('/update-page-info', isCreator, updatePageInfo);
pageRouter.put('/update-cover-image', isCreator, updateCoverImage);
pageRouter.post('page-social-auth', pageSocialAuth);

// admin routes
pageRouter.get(
  '/get-all-pages',
  isAuthenticated,
  authorizeRoles('Admin'),
  getAllPages
);

pageRouter.delete(
  '/delete-page/:id',
  isAuthenticated,
  authorizeRoles('Admin'),
  deletePageById
);

export default pageRouter;
