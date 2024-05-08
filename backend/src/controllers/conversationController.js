import { asyncHandler } from '../middlewares/asyncHandler.js';
import Conversation from '../models/conversationModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const createNewConversation = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {}
});

export const getCreatorConversation = asyncHandler(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });
    res.status(201).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getUserConversation = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {}
});

export const updateLastMessage = asyncHandler(async (req, res, next) => {
  try {
  } catch (error) {}
});
