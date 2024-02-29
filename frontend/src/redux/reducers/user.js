import { createReducer } from '@reduxjs/toolkit';
import { loadUser } from '../actions/user';
const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {

  // Load user 
  builder.addCase(LoadUserRequest, (state, action) => {
    state.loading = true;
  }),
  builder.addCase(LoadUserSuccess, (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  }),
  builder.addCase(LoadUserFail, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  }),
  
  // update user information
  builder.addCase(updateUserInfoRequest, (state) => {
    state.loading = true;
  }),
  builder.addCase(updateUserInfoSuccess, (state, action) => {
    state.loading = false;
    state.user = action.payload;
  }),
  builder.addCase(updateUserInfoFailed, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }),
  
  

  // Get all users --admin
  builder.addCase(getAllUsersRequest, (state) => {
    state.usersLoading = true;
  }),
  
  builder.addCase(getAllUsersSuccess, (state) => {
    state.usersLoading = false;
    state.users = action.payload;
  }),
  
  builder.addCase(getAllUsersFailed, (state) => {
    state.usersLoading = false;
    state.error = action.payload;
  }),

  // ERRORS AND SUCCESS MESSAGE
  builder.addCase(clearErrors, (state) => {
    state.error = null;
  }),
  builder.addCase(clearMessages, (state) =>{
    state.successMessage = null;
  })
});
