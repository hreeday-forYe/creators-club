import Subscription from '../models/subscriptionsModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const createSubscription = asyncHandler(async (req, res, next) => {
  try {
    // Logic for creating subscription add the creator id to user.subscriptions and user id to creator.subscribers
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all subscriptions of user ROUTE: user-subscriptions/:userId
export const getUserSubscriptions = asyncHandler(async (req, res, next) => {
  try {
    // user subscriptions for getting the user subscriptioins in detail
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all subscribers for Creator ROUTE: page-subscribers/:pageId
export const getCreatorSubscriptions = asyncHandler(async (req, res, next) => {
  try {
    // Creator subscribers list of all the users who are subscribed to creators
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// cancel subscriptions for user ROUTE: /cancel-subscriptions/:subscriptionsID
export const cancelSubscriptions = asyncHandler(async (req, res, next) => {
  try {
    // LOGIC TO CANCEL THE SUBSCRIPTIONS STATUS REMOVE THE USER FROM SUBSCRIBER LIST of creator and remove the
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET ALL SUBSCRIPTIONS ADMIN ROUTE: /admin-all-subscriptions
export const adminAllSubscriptions = asyncHandler(async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
