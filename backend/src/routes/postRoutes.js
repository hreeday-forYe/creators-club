import express from 'express';
import {
  isCreator,
  isAuthenticated,
  authorizeRoles,
  isUserOrCreator,
} from '../middlewares/auth.js';
import {
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  getMyPosts,
  getPostsOfFollowing,
  likeUnlikePost,
  updatePost,
} from '../controllers/postsController.js';
const postRouter = express.Router();

postRouter.post('/create-post', isCreator, createPost);
postRouter.patch('/:id', isAuthenticated, likeUnlikePost); // #TODO: Make sure the creator can also like an unlike the post
postRouter.put('/:id', isCreator, updatePost);
postRouter.delete('/:id', isCreator, deletePost);
postRouter.get('/', isAuthenticated, getPostsOfFollowing);
postRouter.put('/comment/:id', isAuthenticated, commentOnPost);
postRouter.delete('/comment/:id', isUserOrCreator, deleteComment);
postRouter.get('/my-posts', isCreator, getMyPosts);
export default postRouter;
