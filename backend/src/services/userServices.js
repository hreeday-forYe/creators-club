import User from '../models/usersModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';

// Get user by id
export const getUserById = async (id, res, next) => {
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
