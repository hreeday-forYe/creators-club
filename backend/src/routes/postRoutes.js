import express from 'express';
import {
  isCreator,
  isAuthenticated,
  authorizeRoles,
  isUserOrCreator,
} from '../middlewares/auth.js';
import {
  adminAllPosts,
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  getMyPosts,
  getPostsOfFollowing,
  getPostsOfPage,
  likeUnlikePost,
  updatePost,
  approvePost,
  adminDeletePost,
} from '../controllers/postsController.js';
const postRouter = express.Router();

postRouter.post('/create-post', isCreator, createPost);
postRouter.patch('/:id', isUserOrCreator, likeUnlikePost); // #TODO: Make sure the creator can also like an unlike the post
postRouter.put('/:id', isCreator, updatePost);

postRouter.delete('/:id', isCreator, deletePost);
postRouter.get('/', isAuthenticated, getPostsOfFollowing);
postRouter.get('/my-posts', isCreator, getMyPosts);
postRouter.put('/comment/:id', isUserOrCreator, commentOnPost);
postRouter.delete('/comment/:id', isUserOrCreator, deleteComment);
// Checks if the user is authenticated if not then sends the public posts if user is authenticated and subscribed to user then it sends private and public posts elese public posts
postRouter.get('/page-posts/:id', isAuthenticated, getPostsOfPage);

postRouter.put(
  '/approve/:id',
  isAuthenticated,
  authorizeRoles('Admin'),
  approvePost
);
postRouter.delete(
  '/admin-post-delete/:id',
  isAuthenticated,
  authorizeRoles('Admin'),
  adminDeletePost
);
postRouter.get(
  '/admin-all-posts',
  isAuthenticated,
  authorizeRoles('Admin'),
  adminAllPosts
);
export default postRouter;
