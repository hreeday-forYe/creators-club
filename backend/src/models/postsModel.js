import mongoose from 'mongoose';

// video mini Schema
const videoSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 4,
    },
    description: {
      type: String,
      min: 8,
    },
    photo: {
      type: [String],
      default: [],
    },
    video: {
      type: [videoSchema],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"  
      }
    ],
    status: {
      type: String,
      enum: ['PUBLIC', 'SUBSCRIBERS'],
      default: 'PUBLIC',
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
