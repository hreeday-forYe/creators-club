import User from '../models/usersModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler.js';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary';
import sendMail from '../utils/sendMail.js';
import dotenv from 'dotenv';
import { sendToken } from '../utils/jwt.js';
import { getUserById } from '../services/userServices.js';
import createActivationToken from '../utils/activation.js';
import Page from '../models/pagesModel.js';
import Notification from '../models/notificationsModel.js';
dotenv.config();

/*
 * USER REGISTRATION CONTROLLER
 * CONTROLS THE USER REGISTRATION PROCESS
 */

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return next(new ErrorHandler('Name cannot be empty', 400));
    }

    if (!email) {
      return next(new ErrorHandler('Email cannot be empty', 400));
    }
    if (!password) {
      return next(new ErrorHandler('Name cannot be empty', 400));
    }
    const isEmailExist = await User.findOne({ email });
    const isPageExist = await Page.findOne({ email });

    if (isEmailExist || isPageExist) {
      return next(new ErrorHandler('Email already exists', 400));
    }
    // putting the destructured object variable in one object known as user
    const user = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };
    // getting the current directory
    const __filename = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(__filename);

    const mailPath = path.join(currentDirectory, '../mails/activationMail.ejs');

    // console.log('This is the mailPath', mailPath);
    const html = await ejs.renderFile(mailPath, data);

    // Send mail function call
    try {
      await sendMail({
        email: user.email,
        subject: 'Activate your account',
        template: 'activationMail.ejs',
        data,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account.`,
        activationToken: activationToken.token,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

// Activate User function for storing the data of the user to the database
const activateUser = asyncHandler(async (req, res, next) => {
  try {
    const { activation_code, activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    // console.log(newUser);
    // console.log(newUser.activationCode);
    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler('Invalid activation Code', 400));
    }

    const { name, email, password } = newUser?.userdata;

    const existUser = await User.findOne({ email });
    const existPage = await Page.findOne({ email });

    if (existUser || existPage) {
      return next(new ErrorHandler('Email already exits', 400));
    }

    await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: 'User has been successfully created',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/*
 * LOGIN USER FUNCTION: which logins the user to the site
 */

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler('Please enter your email or Password', 400));
    }
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorHandler('Invalid Email or Password', 400));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler('Invalid Email or Password', 400));
    }

    sendToken(user._id, res);

    delete user._doc.password;

    // response to the frontend
    res.status(201).json({
      success: true,
      message: 'User is successfully logged in',
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/*
 * LOGOUT USER FUNCTION- Logs the user out from the site clearing his cookies
 */

const logoutUser = asyncHandler(async (req, res, next) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// GET USER profile -- FUNCTION HELPS USE TO GET THE USER INFO ON THE BASIS OF HIS ID
const getUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user?._id;
    // console.log('USER PROFILE:', userId);
    getUserById(userId, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// SOCIAL AUTHENTICATION -- FUNCTION WHICH HANDLES THE SOCIAL CREDIENTIALS AUTH
const socialAuth = asyncHandler(async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = await User.create({ email, name, avatar });
      sendToken(newUser, res);
      res.status(201).json({
        success: true,
        message: 'New User validated successfully',
        newUser,
      });
    } else {
      sendToken(user, res);
      res.status(201).json({
        success: true,
        message: 'User validated successfully',
        user,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// UPDATE USER INFORMATION -- THIS FUNCTION UPDATES THE USER NAME AND EMAIL
const updateUserInfo = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user?._id;
    const user = await User.findById(userId).select('+password');

    // Check if user exists
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler('Invalid password', 400));
    }

    // Update email if provided
    if (email && email !== user.email) {
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler('Email already exists', 400));
      }
      user.email = email;
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Save user changes
    await user.save();
    delete user._doc.password;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// UPDATE USER PASSWORD - FUNCTION CHECKS THE OLD PASSWORD AND NEW ENTERED PASSWORD AND UPDATES THE PASSWORD FIELD
const updateUserPassword = asyncHandler(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword && !newPassword) {
      return next(new ErrorHandler('Please enter old and new password'), 400);
    }
    const user = await User.findById(req.user?._id).select('+password');

    // When the user has created the account with the social account they cannot change the password
    // console.log(user);

    if (user?.password === undefined) {
      return next(new ErrorHandler('Invalid User', 400));
    }

    const isPasswordMatch = await user?.comparePassword(oldPassword);

    if (!isPasswordMatch) {
      return next(new ErrorHandler('Invalid old password', 400));
    }

    user.password = newPassword;
    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// UPDATE THE USER AVATAR- FUNCTION WHICH CHECKS IF THE USER AVATAR EXITS IF EXITS IT DESTROYS IT AND SAVES THE NEW ONE
const updateProfilePicture = asyncHandler(async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (avatar && user) {
      // If we have one avatar then call this if
      if (user?.avatar?.public_id) {
        // First delete the old image
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

        // Then add the new image if the user already has the avatar
        const mycloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: 'avatars',
          width: 150,
        });
        user.avatar = {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        };
      } else {
        const mycloud = await cloudinary.v2.uploader.upload(avatar, {
          folders: 'avatars',
        });
        user.avatar = {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        };
      }
    }
    // Here is the portioin where we save the new user to the database
    await user?.save();

    // Response
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Follow Page User

export const followUnfollowPage = asyncHandler(async (req, res, next) => {
  try {
    const pageToFollow = await Page.findById(req.params.id);
    const user = await User.findById(req.user._id);
    // console.log(pageToFollow);
    if (!pageToFollow) {
      return next(new ErrorHandler('Page not found', 400));
    }

    // removing the following if the user already follows the page
    if (user.following.includes(pageToFollow._id)) {
      const indexfollowing = user.following.indexOf(pageToFollow._id);
      const indexfollowers = pageToFollow.followers.indexOf(user._id);

      user.following.splice(indexfollowing, 1);
      pageToFollow.followers.splice(indexfollowers, 1);

      await user.save();
      await pageToFollow.save();
      // console.log('latest user', user);
      res.status(201).json({
        success: true,
        message: 'Page Unfollowed Successfully',
      });
    } else {
      user.following.push(pageToFollow._id);
      pageToFollow.followers.push(user._id);
      await user.save();
      await pageToFollow.save();

      // Create Notification
      await Notification.create({
        from: user._id,
        to: pageToFollow._id,
        title: 'New Following',
        message: `${user.name} started following your page`,
      });

      res.status(201).json({
        success: true,
        message: 'Page followed Successfully',
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getUserFollowings = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Fetch the user's followings and populate additional information
    const user = await User.findById(userId).populate(
      'following',
      'name avatar description followers'
    );

    // Extract the followings from the user object
    const followings = user.following;
    // console.log('FOLLOwings: ', followings);

    res.status(200).json({
      success: true,
      message: 'Followings retrieved successfully',
      followings: followings,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Suggested Pages for User
// Suggested Pages for User
export const getSuggestedPage = asyncHandler(async (req, res, next) => {
  try {
    let pages;
    if (req.user) {
      const userId = req.user._id;
      // console.log('USERID ', userId);
      const user = await User.findById(userId);

      // Getting the followed and subscribed page id
      const followedPageIds = user.following.concat(user.subscriptions);

      // getting the pages id whose id does not exist in followedPageIds
      pages = await Page.find({ _id: { $nin: followedPageIds } });
    } else {
      pages = await Page.find();
    }

    // console.log(pages);
    res.status(200).json({
      success: true,
      pages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Admim route controller function
export const getUser = asyncHandler(async (req, res, next) => {
  try {
    getUserById(req.params.id, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
// Admin get all users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      message: 'users are found',
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const adminAddUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    console.log('role is here ', isAdmin);
    const user = await User.findOne({ email });
    const page = await User.findOne({ email });
    if (user || page) {
      return next(new ErrorHandler('Email already exists', 500));
    }
    const role = isAdmin ? 'Admin' : 'user';
    await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: 'User has been successfully Added',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const adminDeleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.body;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(new ErrorHandler('User not found', 500));
    }

    res.status(201).json({
      success: true,
      message: 'User has been deleted successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
export {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
  getUserProfile,
  socialAuth,
  updateUserInfo,
  updateUserPassword,
  updateProfilePicture,
};
