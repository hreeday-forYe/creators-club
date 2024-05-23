import express from 'express';
import { isAuthenticated, isCreator } from '../middlewares/auth.js';
import {
  getCreatorNotification,
  getUserNotifications,
  updateCreatorNotification,
  updateUserNotification,
} from '../controllers/notificationController.js';
const notificationRouter = express.Router();

notificationRouter.get(
  '/get-creator-notifications',
  isCreator,
  getCreatorNotification
);
notificationRouter.get(
  '/get-user-notifications',
  isAuthenticated,
  getUserNotifications
);

notificationRouter.put(
  '/update-creator-notifications/:id',
  isCreator,
  updateCreatorNotification
);
notificationRouter.put(
  '/update-user-notifications/:id',
  isAuthenticated,
  updateUserNotification
);

export default notificationRouter;
