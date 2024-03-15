import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  recipients: [mongoose.Types.ObjectId],
  url: { type: String },
  text: String,
  content: String,
  image: String,
  isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notify', notificationSchema);
