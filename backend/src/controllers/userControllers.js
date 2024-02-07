import User from '../models/usersModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler.js';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import sendMail from '../utils/sendMail.js';
import dotenv from 'dotenv';
import { sendToken } from '../utils/jwt.js';
import { getUserById } from '../services/userServices.js';
import createActivationToken from '../utils/activation.js';
dotenv.config();

/*
 * USER REGISTRATION CONTROLLER
 * CONTROLS THE USER REGISTRATION PROCESS
 */

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
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

    console.log(newUser);
    console.log(newUser.activationCode);
    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler('Invalid activation Code', 400));
    }

    const { name, email, password } = newUser?.userdata;

    const existUser = await User.findOne({ email });

    if (existUser) {
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
    getUserById(userId, res);
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
    const { name, email } = req.body;
    const userId = req.user?._id;
    const user = await User.findById(userId);

    // Checking if we are actually gettting the user and the email
    if (email && user) {
      const isEmailExist = await User.findOne({ email });

      if (isEmailExist) {
        return next(new ErrorHandler('Email Already Exists', 400));
      }
      // Changing the email here
      user.email = email;
    }

    // Now if we are getting name instead of the email
    if (name && user) {
      // Changing the name
      user.name = name;
    }

    // Saving the updates to the redis and database
    await user?.save();

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
    console.log(user);

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
    const userId = req.user?.id;

    const user = await userModel.findById(userId);

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
          width: 150,
        });
        user.avatar = {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        };
      }
    }
    // Here is the portioin where we save the new user to the database
    await user?.save();
    await redis.set(userId, JSON.stringify(user));

    // Response
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
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
