import express from 'express';
import { isAuthenticated, isCreator } from '../middlewares/auth.js';
import { getCreatorNotification } from '../controllers/notificationController.js';
const notificationRouter = express.Router();

notificationRouter.get(
  '/get-creator-notifications',
  isCreator,
  getCreatorNotification
);

export default notificationRouter;
