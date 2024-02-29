import { configureStore } from '@reduxjs/toolkit';
// now adding our apislice to our store
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
import { userReducer } from './reducers/user';
const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
