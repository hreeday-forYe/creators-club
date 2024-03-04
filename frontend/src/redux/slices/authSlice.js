import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authInfo: localStorage.getItem('authInfo')
    ? JSON.parse(localStorage.getItem('authInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.authInfo = action.payload;
      localStorage.setItem('authInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      // NOTE: here we need to also remove the other things from storage so the next
      // logged in user doesn't inherit the previous users payment history
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
