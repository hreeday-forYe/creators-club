import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  // Initial Schema Design
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },

    email: {
      type: String,
      required: [true, 'Please enter your email'],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: 'Please enter a valid email',
      },
      unique: true,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    paymentMethod: {
      type: String,
    },

    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },

    avatar: {
      public_id: String,
      url: String,
    },

    subscriptions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Subscription',
    },

    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Page"
    }
  },
  { timestamps: true }
);

// Pre hooks->Check the password if modified then hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// jwt token for each users
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ExPIRES,
  });
};

// Compare password for the login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Returns true or false
};
const User = mongoose.model('User', userSchema);

export default User;
