import express from 'express';
import { isAuthenticated, isCreator } from '../middlewares/auth.js';
import {
  createNewConversation,
  getCreatorConversation,
  getUserConversation,
  updateLastMessage,
} from '../controllers/conversationController.js';
const conversationRouter = express.Router();

conversationRouter.post('/create-new-conversation', createNewConversation);

conversationRouter.get(
  '/get-all-conversation-creator/:id',
  isCreator,
  getCreatorConversation
);

conversationRouter.get(
  '/get-all-conversation-user/:id',
  isAuthenticated,
  getUserConversation
);

conversationRouter.get('/update-last-message/:id', updateLastMessage);

export default conversationRouter;
