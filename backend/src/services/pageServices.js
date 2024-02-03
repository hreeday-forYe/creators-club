import { asyncHandler } from '../middlewares/asyncHandler.js';
import Page from '../models/pagesModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const getProfile = asyncHandler(async (id, res) => {
  try {
    const creator = await Page.findById(id);
    if (creator) {
      res.status(200).json({
        success: true,
        creator,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Creator's Page does not exist`,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getPageById = asyncHandler(async (id, res) => {
  try {
    const creator = await Page.findById(id);
    if (creator) {
      res.status(200).json({
        success: true,
        creator,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Creator's Page does not exist`,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
