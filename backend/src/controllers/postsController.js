// POST CRUD IS IN THIS FILE
import Post from '../models/postsModel.js';
import cloudinary from 'cloudinary';
import Page from '../models/pagesModel.js';
// import Subscription from '../models/subscriptionsModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import User from '../models/usersModel.js';

// Create Post
export const createPost = asyncHandler(async (req, res, next) => {
  try {
    const page = await Page.findById(req.creator._id);
    console.log(page);
    if (!page) {
      return next(new ErrorHandler('Page Id is invalid!', 400));
    }
    const { title, photos, video, status } = req.body;

    if (!title) {
      return next(new ErrorHandler('Post title is required', 400));
    }

    let post; // undefined variable for creating the post

    // checking if the images are in from of arrary or string
    if (title && photos) {
      // Converting the image to the array if only one image is provided
      let images = [];
      if (typeof req.body.photos === 'string') {
        images.push(req.body.photos);
      } else {
        images = req.body.photos;
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

      // Creating the Post
      post = await Post.create({
        creator: page._id,
        title,
        photos: images,
        status,
      });
    } else if (title && video) {
      console.log('or this one video');
      post = await Post.create({
        creator: page._id,
        title,
        status,
      });
      page.posts.push(post._id);
    } else {
      post = await Post.create({
        creator: page._id,
        title,
        status,
      });
      console.log('this one after post in title');
    }
    page.posts.push(post._id);
    await page.save();
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
    const user = await User.findById(req.user._id);

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
    console.log(post);
    if (!post) {
      return next(new ErrorHandler('Post is not found with this id', 400));
    }
    console.log(post.creator.toString(), req.creator._id.toString());
    if (post.creator.toString() !== req.creator._id.toString()) {
      return next(new ErrorHandler('UnAuthorized Creator', 400));
    }

    for (let i = 0; i < post.photos.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        post.images[i].public_id
      );
    }

    await Post.deleteOne(post._id);

    // Now deleting the post from the creator post array
    const page = await Page.findById(req.creator._id);
    const index = page.posts.indexOf(req.params.id);

    page.posts.splice(index, 1);
    await page.save();

    res.status(201).json({
      success: true,
      message: 'Post Deleted Successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// like or unlike Post
export const likeUnlikePost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorHandler('post not found', 400));
    }
    if (post.likes.includes(req.user._id || req.creator._id)) {
      const index = post.likes.indexOf(req.user._id || req.creator._id);
      post.likes.splice(index, 1);
      await post.save();

      return res.status(201).json({
        success: true,
        message: 'Post Unliked Successfully',
      });
    } else {
      post.likes.push(req.user._id || req.creator._id);
      await post.save();
      return res.status(201).json({
        success: true,
        message: 'Post liked Successfully',
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get posts of following pages only public posts
export const getPostsOfFollowing = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      creator: {
        $in: user.following,
      },
      status: 'public',
    });

    res.status(201).json({
      success: true,
      message: 'Posts of the pages you are following is fetched',
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
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
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
