import dotenv from 'dotenv';
import { redis } from '../config/redis.js';
dotenv.config();

// getting the expiry date for the access token and refresh token from environment variables
const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRY || '300',
  10
);

const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRY || '1200',
  10
);

// Date options for the cookies
export const accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httponly: true,
  sameSite: 'lax',
};

export const refreshTokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  httponly: true,
  sameSite: 'lax',
};

// Send the user token for login
export const sendToken = (user, statusCode, res) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // #TODO: UPload the session to the redis for maintaining cache
  redis.set(user._id, JSON.stringify(user));
  // only set secure to true if the env is production

  if (process.env.NODE_ENV === 'production') {
    accessTokenOptions.secure = true;
    refreshTokenOptions.secure = true;
  }

  // adding the cookie in the header of our
  res.cookie('access_token', accessToken, accessTokenOptions);
  res.cookie('refresh_token', refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
