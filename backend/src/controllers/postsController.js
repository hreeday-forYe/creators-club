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
      console.log('I am here');
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
      console.log('image upload successfull');
      // Creating the Post
      post = await Post.create({
        creator: page._id,
        title,
        photos: imagesLinks,
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
    return next(new ErrorHandler(error.message, 400));
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
        post.photos[i].public_id
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

    // checking if the user or creator is making request
    let validId;
    if (req.user._id) {
      validId = req.user._id;
    } else {
      validId = req.creator._id;
    }
    if (post.likes.includes(validId)) {
      const index = post.likes.indexOf(validId);
      post.likes.splice(index, 1);
      await post.save();

      return res.status(201).json({
        success: true,
        message: 'Post Unliked Successfully',
      });
    } else {
      post.likes.push(validId);
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

export const commentOnPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler('Post not found', 400));
    }

    // Checking if comment already exists
    let commentIndex = -1;
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });
    console.log('comment: ', req.body.comment);
    // Updating the comment from the body
    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
      await post.save();
      res.status(201).json({
        success: true,
        messsage: 'Comment Updated',
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      await post.save();
      res.status(201).json({
        success: true,
        messsage: 'Comment Added',
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler(error.message, 400));
    }
    // Checking if it is user or creator
    // console.log(req.user._id, req.creator._id);
    let validId;
    if (req.user && req.user._id) {
      validId = req.user._id;
    } else if (req.creator && req.creator._id) {
      validId = req.creator._id;
    } else {
      return next(new ErrorHandler('validation error in line 245', 400));
    }

    if (validId) {
      console.log(validId);
    }

    // if else for post owner and comment owner
    if (post.creator.toString() === validId.toString()) {
      // function to delete any comment the post owner wants
      if (req.body.commentId === undefined) {
        return next(new ErrorHandler('Comment Id is required', 400));
      }
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      res.status(201).json({
        success: true,
        message: 'Selected Comment has deleted',
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === validId.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        messasge: 'Your comment has deleted',
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Update the posts for the owner of the posts
export const updatePost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler('Post not found', 400));
    }
    // Checking if the post owner is the one who wants to change the post info
    if (post.creator.toString() !== req.creator._id.toString()) {
      return next(new ErrorHandler('Un authorized post creator', 400));
    }

    // Updating the post title
    post.title = req.body.title;
    await post.save();
    res.status(201).json({
      success: true,
      message: 'Success True',
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get posts of following pages only public posts
export const getPostsOfFollowing = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ErrorHandler('User does not exists', 404));
    }

    const posts = await Post.find({
      $or: [
        { creator: { $in: user.following }, status: 'public' },
        {
          creator: { $in: user.subscriptions },
          status: { $in: ['public', 'private'] },
        },
      ],
    })
      .populate('creator', 'name avatar')
      .populate({
        path: 'comments.user', // Specify path to populate
        select: 'name avatar', // Select fields to populate
      })
      .sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      message: 'Posts of the pages you are following or subscribed is fetched',
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get my posts
export const getMyPosts = asyncHandler(async (req, res, next) => {
  try {
    const creatorId = req.creator._id;
    const posts = await Post.find({ creator: creatorId })
      .populate('creator', 'name avatar')
      .populate({
        path: 'comments.user', // Specify path to populate
        select: 'name avatar', // Select fields to populate
      })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Your Posts fetched',
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get posts of a page
export const getPostsOfPage = asyncHandler(async (req, res, next) => {
  try {
    const pageId = req.params.id;
    const userId = req.body._id;

    let isSubscribed = false;

    if (userId) {
      const user = await User.findById(userId);
      // If the user doesnot exists here the isSubscribed will not be changed
      if (user) {
        isSubscribed =
          user.subscriptions && user.subscriptions.includes(pageId);
      }
    }

    const posts = await Post.find({
      creator: pageId,
      status: isSubscribed ? { $in: ['public', 'private'] } : 'public',
    })
      .populate('creator', 'name avatar')
      .populate({
        path: 'comments.user', // Specify path to populate
        select: 'name avatar', // Select fields to populate
      })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

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
