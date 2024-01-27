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
      index: true,
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
      enum: ['user', 'creator', 'admin'],
      default: 'user',
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    paymentMethod: {
      type: String,
      required: true,
      default: 'stripe',
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

// SIGN ACCESS TOKEN
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', {
    expiresIn: '5m',
  });
};

// SIGN REFRESH TOKEN
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', {
    expiresIn: '7d',
  });
};

// Compare password for the login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Returns true or false
};
const User = mongoose.model('User', userSchema);

export default User;
