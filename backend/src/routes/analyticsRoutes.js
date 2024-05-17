import express from 'express';
import {
  getUserAnalytics,
  getCreatorsAnalytics,
  getPostAnalytics,
  getSubscriptionAnalytics,
} from '../controllers/analyticsController.js';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js';
const analyticsRouter = express.Router();

analyticsRouter.get(
  '/get-users-analytics',
  isAuthenticated,
  authorizeRoles('Admin'),
  getUserAnalytics
);

analyticsRouter.get(
  '/get-creators-analytics',
  isAuthenticated,
  authorizeRoles('Admin'),
  getCreatorsAnalytics
);
analyticsRouter.get(
  '/get-posts-analytics',
  isAuthenticated,
  authorizeRoles('Admin'),
  getPostAnalytics
);
analyticsRouter.get(
  '/get-subscription-analytics',
  isAuthenticated,
  authorizeRoles('Admin'),
  getSubscriptionAnalytics
);

export default analyticsRouter;
