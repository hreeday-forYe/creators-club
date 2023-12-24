import { asyncHandler } from './asyncHandler.js';
import jwt from 'jsonwebtoken';
import { redis } from '../config/redis.js';
import ErrorHandler from '../utils/ErrorHandler.js';

// Authenticate the user if he is actually logged in or not
const isAuthenticated = asyncHandler(async (req, res, next) => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return next(new ErrorHandler('Please login to access this resource', 400));
  }

  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);

  if (!decoded) {
    return next(new ErrorHandler('Access token is invalid', 400));
  }

  // Getting the user from the redis
  const user = await redis.get(decoded.id);

  // Checking if the user is not there
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }

  req.user = JSON.parse(user);
  next();
});

// validate the user role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role || '')) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.id} is not allowed to access this routes`,
          403
        )
      );
    }
    next();
  };
};

export { isAuthenticated, authorizeRoles };
