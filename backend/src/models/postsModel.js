import mongoose from 'mongoose';

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
          // required: true,
        },
        url: {
          type: String,
          // required: true
        },
      },
    ],
    video: {
      type: String,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
      },
    ],
    status: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
