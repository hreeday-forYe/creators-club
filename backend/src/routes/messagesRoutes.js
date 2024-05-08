import express from 'express';
import {
  CreateNewMessage,
  GetAllMessagesWithId,
} from '../controllers/messagesController.js';
const messagesRouter = express.Router();

messagesRouter.post('/create-new-message', CreateNewMessage);

messagesRouter.get('/get-all-messages/:id', GetAllMessagesWithId);

export default messagesRouter;
