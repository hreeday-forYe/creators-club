import express from 'express';
import {
  isCreator,
  authorizeRoles,
  isAuthenticated,
} from '../middlewares/auth.js';

import {
  adminAllSubscriptions,
  cancelSubscriptions,
  createSubscription,
  getCreatorSubscriptions,
  getUserSubscriptions,
} from '../controllers/subscriptionController.js';

const subscribeRouter = express.Router();

subscribeRouter.post(
  '/create-subscription',
  isAuthenticated,
  createSubscription
);
subscribeRouter.get(
  '/user-subscriptions/:id',
  isAuthenticated,
  getUserSubscriptions
);
subscribeRouter.get(
  '/creator-subscriptions/:id',
  isCreator,
  getCreatorSubscriptions
);
subscribeRouter.delete(
  '/cancel-subscriptions/:id',
  isAuthenticated,
  cancelSubscriptions
);
subscribeRouter.get(
  '/admin-all-subscriptions',
  isAuthenticated,
  authorizeRoles('Admin'),
  adminAllSubscriptions
);
export default subscribeRouter;