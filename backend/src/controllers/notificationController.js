import Notification from '../models/notificationsModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import cron from 'node-cron';
export const getCreatorNotification = asyncHandler(async (req, res, next) => {
  try {
    const notifications = await Notification.find({ to: req.creator._id }).sort(
      { createdAt: -1 }
    );
    res.status(201).json({
      success: true,
      message: 'Creator Notification fetched',
      notifications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const updateCreatorNotification = asyncHandler(
  async (req, res, next) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler('Notification not found', 401));
      } else {
        notification.status
          ? (notification.status = 'read')
          : notification.status;
      }
      await notification.save();

      const notifications = await Notification.find({
        to: req.creator._id,
      }).sort({ createdAt: -1 });

      res.status(202).json({
        success: true,
        notifications,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


export const getUserNotifications = asyncHandler(async (req, res, next) => {
  try {
    const notifications = await Notification.find({ to: req.user._id }).sort(
      { createdAt: -1 }
    );
    res.status(201).json({
      success: true,
      message: 'User Notification fetched',
      notifications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


export const updateUserNotification = asyncHandler(
  async (req, res, next) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler('Notification not found', 401));
      } else {
        notification.status
          ? (notification.status = 'read')
          : notification.status;
      }
      await notification.save();

      const notifications = await Notification.find({
        to: req.user._id,
      }).sort({ createdAt: -1 });

      res.status(202).json({
        success: true,
        notifications,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// Delete notifications automaticallly
cron.schedule('0 0 0 * * *', async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: 'read',
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log('Deleted Read notifications');
});
