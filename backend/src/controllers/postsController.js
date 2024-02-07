// POST CRUD IS IN THIS FILE
import Post from '../models/pagesModel.js';
import cloudinary from 'cloudinary';
import Page from '../models/pagesModel.js';
import Subscription from '../models/subscriptionsModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import User from '../models/usersModel.js';

// Create Post
export const createPost = asyncHandler(async (req, res, next) => {
  try {
    const pageId = req.body.pageId;
    const page = await Page.findById(pageId);
    if (!page) {
      return next(new ErrorHandler('Page Id is invalid!', 400));
    }
    const { title, images, video, status } = req.body;

    // checking if the images are in from of arrary or string
    if (images) {
      // Converting the image to the array if only one image is provided
      let images = [];
      if (typeof req.body.images === 'string') {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      // Now uploading the images to the cloudinary
      const imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'posts',
        });

        // updating
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    // Creating the Post
    const post = await Post.create({
      creator: pageId,
      title,
      photos: images,
      video,
      status,
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get all posts of a Page- Subscriber or non subscriber
export const getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    const pageId = req.params.id;
    const allPosts = await Post.find({ creator: pageId });
    const publicPosts = await Post.find({ creator: pageId, status: 'public' });
    const user = await User.findById(req.body.userId);
    // each user will be able to view the posts which are public so to fetch either the user can view the page posts or not

    if (!user) {
      res.status(201).json({
        success: true,
        publicPosts,
      });
    }

    // Checking if the user is subscriber or not
    const isSubscribed = user.subscriptions.includes(pageId);
    if (isSubscribed) {
      res.status(201).json({
        success: true,
        allPosts,
      });
    } else {
      res.status(201).json({
        success: true,
        publicPosts,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Delete post of a page
export const deletePost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHandler('Post is not found with this id', 400));
    }

    for (let i = 0; i < post.photos.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        post.images[i].public_id
      );
    }

    await Post.deleteOne({ _id: req.params.id });

    res.status(201).json({
      success: true,
      message: 'Post Deleted Successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Like a post by any authenticated user if he sees the posts in the feed
export const likePosts = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.like.includes(req.user._id)) {
      if (post.dislike.includes(req.user._id)) {
        await post.updateOne({ $pull: { dislike: req.user._id } });
      }

      await post.updateOne({ $push: { like: req.user._id } });

      res.status(201).json({
        succcess: 'true',
        message: 'Post Has been liked',
      });
    } else {
      await post.updateOne({ $pull: { like: req.user._id } });
      return res.status(200).json({ message: 'Post has been disliked' });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Dislike a post by any authenticated user if he sees the posts in the feed
export const dislikePosts = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.dislike.includes(req.user._id)) {
      if (post.like.includes(req.user.id)) {
        await post.updateOne({ $pull: { like: req.user._id } });
      }
      await post.updateOne({ $push: { dislike: req.user._id } });
      res.status(201).json({
        succcess: true,
        message: 'Post has been disliked',
      });
    } else {
      await post.updateOne({ $pull: { dislike: req.user._id } });
      res.status(200).json('Post has been unliked');
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// comment on a post



// Get all posts of any page for admin
export const adminAllPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
