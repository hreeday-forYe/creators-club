import express from 'express';
import { isAuthenticated, isCreator } from '../middlewares/auth.js';
import {
  getCreatorNotification,
  updateCreatorNotification,
} from '../controllers/notificationController.js';
const notificationRouter = express.Router();

notificationRouter.get(
  '/get-creator-notifications',
  isCreator,
  getCreatorNotification
);

notificationRouter.put(
  '/update-creator-notifications/:id',
  isCreator,
  updateCreatorNotification
);

export default notificationRouter;
