import { asyncHandler } from './asyncHandler.js';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler.js';
import User from '../models/usersModel.js';
import Page from '../models/pagesModel.js';
// Authenticate the user if he is actually logged in or not
const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  console.log(token);
  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new ErrorHandler('Token is invalid', 400));
  }

  // Getting the user from the database
  const user = await User.findById(decoded.userId).select('-password'); // Deletes the userID

  // Checking if the user is not there
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }
  req.user = user;
  next();
});

// Authenticate if the page creator is logged in or not
const isCreator = asyncHandler(async (req, res, next) => {
  const creator_token = req.cookies.creator_jwt;

  if (!creator_token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }
  const decoded = jwt.verify(creator_token, process.env.JWT_SECRET);

  // Getting the creator from the Page
  const creator = await Page.findById(decoded.creatorId).select('-password');

  // checking if the creator page exits or not
  if (!creator) {
    return next(new ErrorHandler('Creator Not Found', 400));
  }
  req.creator = creator;
  next();
});

// validate the user role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role || '')) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this routes`,
          403
        )
      );
    }
    next();
  };
};

export { isAuthenticated, isCreator, authorizeRoles };
