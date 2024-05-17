import express from 'express';
import ErrorHandler from '../utils/ErrorHandler.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { generateLast12Monthsdata } from '../utils/analyticsData.js';
import User from '../models/usersModel.js';
import Page from '../models/pagesModel.js';
import Post from '../models/postsModel.js';
import Subscription from '../models/subscriptionsModel.js';

// get Users Analytics ---ADMIN
export const getUserAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const users = await generateLast12Monthsdata(User);
    // console.log(users);
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get Creators Analytics ---ADMIN
export const getCreatorsAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const creators = await generateLast12Monthsdata(Page);
    // console.log(creators);
    res.status(201).json({
      success: true,
      creators,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get Posts Analytics ---ADMIN
export const getPostAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const posts = await generateLast12Monthsdata(Post);
    // console.log(creators);
    res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get Subscription Analytics ---ADMIN
export const getSubscriptionAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const subscriptions = await generateLast12Monthsdata(Subscription);
    // console.log(creators);
    res.status(201).json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
