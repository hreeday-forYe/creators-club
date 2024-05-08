import { asyncHandler } from '../middlewares/asyncHandler.js';
import Messages from '../models/messagesModel.js';

export const CreateNewMessage = asyncHandler(async (req, res, next) => {});

export const GetAllMessagesWithId = asyncHandler(async (req, res, next) => {
  try {
    const messages = await Messages.find({
      conversationId: req.params.id,
    });

    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});
