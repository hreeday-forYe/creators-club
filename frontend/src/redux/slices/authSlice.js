// This will set the user credientials to the local storage and remove them
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  pageInfo: localStorage.getItem('pageInfo')
    ? JSON.parse(localStorage.getItem('pageInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userType, data } = action.payload;
      if (userType === 'user') {
        state.userInfo = action.payload;
        state.token = action.payload.token;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } else if (userType === 'page') {
        state.pageInfo = action.payload;
        localStorage.setItem('pageInfo', JSON.stringify(action.payload));
      }
    },
    logout: (state, action) => {
      const { userType } = action.payload;
      if (userType === 'user') {
        state.userInfo = null;
        localStorage.removeItem('userInfo');
      } else if (userType === 'page') {
        state.pageInfo = null;
        localStorage.removeItem('pageInfo');
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
