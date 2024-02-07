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
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 225,
    },
    description: {
      type: String,
      minlength: 8,
    },
    photos: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: { type: String, required: true },
      },
    ],
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
        ref: 'Comments',
      },
    ],
    status: {
      type: String,
      enum: ['public', 'subscribers'],
      default: 'public',
      required: true
    },
    category: {
      type: String,
      enum: [''],
      default: '',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
