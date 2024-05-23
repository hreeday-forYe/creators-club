import path from 'path';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import ErrorHandler from '../utils/ErrorHandler.js';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import sendMail from '../utils/sendMail.js';
import dotenv from 'dotenv';
dotenv.config();
import { sendCreatorToken } from '../utils/jwt.js';
import Page from '../models/pagesModel.js';
import createActivationToken from '../utils/activation.js';
import { getProfile, getPageById } from '../services/pageServices.js';
import Post from '../models/postsModel.js';
import User from '../models/usersModel.js';
// Create Page Route - Anyone
const createPage = asyncHandler(async (req, res, next) => {
  try {
    const { email, name, password, address, phoneNumber } = req.body;
    const hasCreatorEmail = await Page.findOne({ email });
    const hasUserEmail = await User.findOne({ email });
    const hasCreatorName = await Page.findOne({ name });
    if (hasCreatorEmail || hasUserEmail) {
      return next(new ErrorHandler('Email already Exists', 400));
    }

    if (hasCreatorName) {
      return next(new ErrorHandler('Page name already Exists', 400));
    }

    // Uploading the page avatar to the cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
    });

    const creator = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: address,
      phoneNumber: phoneNumber,
    };

    // Creating the activation Token
    const activationToken = createActivationToken(creator);
    const activationCode = activationToken.activationCode;

    const data = { user: { name: creator.name }, activationCode };

    // Getting the current directory
    const __filename = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(__filename);

    const mailPath = path.join(currentDirectory, '../mails/activationMail.ejs');

    const html = await ejs.renderFile(mailPath, data);

    // Send Mail Function call
    try {
      await sendMail({
        email: creator.email,
        subject: 'Activate your Page',
        template: 'activationMail.ejs',
        data,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:${creator.email} to activate your Page.`,
        activationToken: activationToken.token,
      });
    } catch (err) {
      // console.log(err);
      return next(new ErrorHandler(err.message, 400));
    }
  } catch (err) {
    // console.log(err);
    return next(new ErrorHandler(err.message, 400));
  }
});

// Activate Page Route after create Page request
const activatePage = asyncHandler(async (req, res, next) => {
  try {
    const { activation_code, activation_token } = req.body;
    const newCreator = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );
    // console.log(newCreator);
    // console.log(newCreator.activationCode);

    if (newCreator.activationCode !== activation_code) {
      return next(new ErrorHandler('Invalid activation Code', 400));
    }

    // console.log(newCreator.hasOwnProperty('creator'));

    const { name, email, password, avatar, address, phoneNumber } =
      newCreator.userdata;

    let creator = await Page.findOne({ email });
    let user = await User.findOne({ email });

    if (creator || user) {
      return next(new ErrorHandler('Email already exists', 400));
    }

    creator = await Page.create({
      name,
      email,
      avatar,
      password,
      address,
      phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: 'Page has been successfully created',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Login Creator Function: which logins the creator to the site
const loginCreator = asyncHandler(async (req, res, next) => {
  // console.log('loginPage');
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler('Please enter your email or password', 400));
    }
    const creator = await Page.findOne({ email }).select('+password');

    if (!creator) {
      return next(new ErrorHandler('Invalid Email or Password', 400));
    }
    if (creator.isBanned) {
      return next(new ErrorHandler('Your Account is Currently Banned', 403));
    }
    const isPasswordMatch = await creator.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler('Invalid Email or Password', 400));
    }

    sendCreatorToken(creator._id, res);
    delete creator._doc.password;

    // Response to the frontend
    res.status(201).json({
      success: true,
      message: 'Creator is Successfully logged in',
      creator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Logout Creator -GET Request for only seller
const logoutCreator = asyncHandler(async (req, res, next) => {
  try {
    const jwt = res.cookie('jwt');
    const creator_jwt = res.cookie('creator_jwt');
    if (jwt || creator_jwt) {
      // clearning the user jwt if it exists
      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      // Clearing the creator jwt if it exists
      res.cookie('creator_jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
    }

    // response to the fronted
    res.status(200).json({
      success: true,
      message: 'Creator logged out Successfully',
    });
  } catch (error) {
    // console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

// Load Page Profile for the Owner of the page
// Route: get-page-profile GET REQUEST
const getPageProfile = asyncHandler(async (req, res, next) => {
  try {
    const pageId = req.creator?._id;
    getProfile(pageId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Social Authentication for the Page
const pageSocialAuth = asyncHandler(async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;
    const creator = await Page.findOne({ email });
    if (!creator) {
      const newCreator = await Page.create({ email, name, avatar });
      sendCreatorToken(newCreator, res);
      res.status(201).json({
        success: true,
        message: 'New Page validated successfully',
        newCreator,
      });
    } else {
      sendToken(creator, res);
      res.status(201).json({
        success: true,
        message: 'Page validated successfully',
        creator,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get Page info -- For others and users without subscription
// Route: get-page/:id
const getPageInfo = asyncHandler(async (req, res, next) => {
  try {
    const pageId = req.params.id;
    getPageById(pageId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Update Page Info for creators only- PUT REQUEST
const updatePageInfo = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      description,
      phoneNumber,
      address,
      subscriptionCharge,
      password,
    } = req.body;

    const creator = await Page.findOne(req.creator?._id);

    if (!creator) {
      return next(new ErrorHandler('Creator not found', 400));
    }

    creator.name = name ? name : creator.name;
    creator.description = description ? description : creator.description;
    creator.phoneNumber = phoneNumber ? phoneNumber : creator.phoneNumber;
    creator.address = address ? address : creator.address;
    creator.subscriptionCharge = subscriptionCharge
      ? subscriptionCharge
      : creator.subscriptionCharge;

    // Creator update save
    await creator.save();
    res.status(201).json({
      success: true,
      message: 'Profile updated Successfully',
      creator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update Page avatar- PUT Request
const updatePageAvatar = asyncHandler(async (req, res, next) => {
  try {
    let existsCreator = await Page.findById(req.creator._id);

    // Getting the current imageId
    const imageId = existsCreator.avatar.public_id;

    // Destroy the image
    await cloudinary.v2.uploader.destroy(imageId);

    // Uploading the new image to the cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      // width: 150,
    });

    existsCreator.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await existsCreator.save();

    res.status(200).json({
      success: true,
      creator: existsCreator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update page coverImage - PUTPOST Requset
const updateCoverImage = asyncHandler(async (req, res, next) => {
  try {
    let currentCreator = await Page.findById(req.creator._id);

    // checking if the current cover image exists
    const imageId = currentCreator.coverImage?.public_id;

    if (imageId) {
      await cloudinary.v2.uploader.destroy(imageId);
    }

    // uploading the new image to the cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(req.body.coverImage, {
      folder: 'coverImage',
      // width: 700,
    });

    currentCreator.coverImage = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await currentCreator.save();

    res.status(200).json({
      success: true,
      message: 'cover image updated successfully',
      creator: currentCreator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

/* TODO: Creator WithDraw method and update withdraw method function */
export const updateWithdrawMethod = asyncHandler(async (req, res, next) => {
  try {
    const { withdrawMethod } = req.body;
    const creator = await Page.findByIdAndUpdate(req.creator._id, {
      withdrawMethod,
    });

    res.status(201).json({
      success: true,
      creator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete withdraw method
export const deleteWithdrawMethod = asyncHandler(async (req, res, next) => {
  try {
    const creator = await Page.findById(req.creator._id);

    if (!creator) {
      return next(new ErrorHandler('Creator not found with this id', 400));
    }

    creator.withdrawMethod = null;

    await creator.save();

    res.status(201).json({
      success: true,
      creator,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all Pages/Creators for admin
const getAllPages = asyncHandler(async (req, res, next) => {
  try {
    const creators = await Page.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      message: 'Creators are found',
      creators,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

// Feature creator page for admin
export const featureCreator = asyncHandler(async (req, res, next) => {
  try {
    const pageId = req.body.pageId;
    const page = await Page.findById(pageId);
    if (page.isFeatured) {
      page.isFeatured = false;
      await page.save();
      res.status(201).json({
        success: true,
        message: 'UnFeatured Successfully',
      });
    } else {
      page.isFeatured = true;
      await page.save();
      res.status(201).json({
        success: true,
        message: 'Featured Successfully',
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

// export const getfeaturedCreators = asyncHandler(async (req, res, next) => {
//   try {
//     // Find up to two featured creators
//     const featuredCreators = await Page.find({ isFeatured: true }).limit(2);

//     // If less than two featured creators are found, find any creator
//     if (featuredCreators.length < 2) {
//       const remainingCreatorsCount = 2 - featuredCreators.length;
//       const additionalCreators = await Page.find().limit(
//         remainingCreatorsCount
//       );

//       // Concatenate the additional creators to the featured creators array
//       featuredCreators.push(...additionalCreators);
//     }

//     res.status(200).json({
//       success: true,
//       data: featuredCreators,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message), 500);
//   }
// });

export const getfeaturedCreators = asyncHandler(async (req, res, next) => {
  try {
    // Projecting only the required fields
    const featuredPages = await Page.find({ isFeatured: true, isBanned: false })
      .limit(3)
      .select('name coverImage avatar description');

    // If less than two featured pages are found, find any page
    if (featuredPages.length < 3) {
      const remainingPagesCount = 3 - featuredPages.length;
      const additionalPages = await Page.find()
        .limit(remainingPagesCount)
        .select('name coverImage avatar description');

      // Concatenate the additional pages to the featured pages array
      featuredPages.push(...additionalPages);
    }

    res.status(200).json({
      success: true,
      data: featuredPages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
// Ban Creator Page for admin
const banPageById = asyncHandler(async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id);

    if (!page) {
      return next(new ErrorHandler('Page is not available with this id', 400));
    }

    // ban the page
    page.isBanned = !page.isBanned;

    // Update all posts of the page to set isVerified to either false or true based on the previous value
    const newVerificationStatus = !page.isBanned;
    await Post.updateMany(
      { creator: page._id },
      { isVerified: newVerificationStatus}
    );

    await page.save();

    // message to the frontend
    res.status(201).json({
      success: true,
      message: 'Page banned Successfully',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export {
  createPage,
  activatePage,
  loginCreator,
  logoutCreator,
  getPageProfile,
  getPageInfo,
  updatePageInfo,
  updatePageAvatar,
  updateCoverImage,
  pageSocialAuth,

  // for admin
  getAllPages,
  banPageById,
};
