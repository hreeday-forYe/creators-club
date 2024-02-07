import express from 'express';
import {
  isCreator,
  isAuthenticated,
  authorizeRoles,
} from '../middlewares/auth.js';

const postRouter = express.Router();

postRouter.post('/create-post', isCreator, createPost);
