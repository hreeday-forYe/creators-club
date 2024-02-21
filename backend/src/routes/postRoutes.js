import express from 'express';
import {
  isCreator,
  isAuthenticated,
  authorizeRoles,
} from '../middlewares/auth.js';
import {
  createPost,
  deletePost,
  getPostsOfFollowing,
  likeUnlikePost,
} from '../controllers/postsController.js';
const postRouter = express.Router();

postRouter.post('/create-post', isCreator, createPost);
postRouter.get('/:id', isAuthenticated, likeUnlikePost); // #TODO: Make sure the creator can also like an unlike the post
postRouter.delete('/:id', isCreator, deletePost);
postRouter.get('/', isAuthenticated, getPostsOfFollowing);

export default postRouter;
