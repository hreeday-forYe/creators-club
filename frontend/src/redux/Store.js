import { configureStore } from '@reduxjs/toolkit';
// now adding our apislice to our store
import { apiSlice } from './slices/apislice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  // Now adding the middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
