import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import CreatePageScreen from './screens/auth/CreatePageScreen';
import VerificationScreen from './screens/auth/VerificationScreen';
import PageDashboardScreen from './screens/page/PageDashboardScreen';
import UserFeedScreen from './screens/users/UserFeedScreen';
import UserProfileScreen from './screens/users/UserProfileScreen';
import PageProfileScreen from './screens/page/PageProfileScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
// import CreatePost from './components/main/CreatePost';

import { Provider } from 'react-redux';
import store from './redux/store';
import CreatePostScreen from './screens/page/CreatePostScreen';
import GetAllPostsScreen from './screens/page/GetAllPostsScreen';
import PageAllSubscribersScreen from './screens/page/PageAllSubscribersScreen';
import PageSettingsScreen from './screens/page/PageSettingsScreen';
import PageWithdrawMoneyScreen from './screens/page/PageWithdrawMoneyScreen';
import SubscribePageScreen from './screens/users/SubscribePageScreen';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>
      <Route path="/create-page" element={<CreatePageScreen />}></Route>
      <Route path="/verification" element={<VerificationScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/page-dashboard" element={<PageDashboardScreen />}></Route>
      <Route path="/feed" element={<UserFeedScreen />}></Route>
      <Route path="/profile" element={<UserProfileScreen />}></Route>
      <Route path="/admin-dashboard" element={<AdminDashboardScreen />}></Route>
      <Route path="/create-post" element={<CreatePostScreen />}></Route>
      <Route path="/page-posts" element={<GetAllPostsScreen />}></Route>
      <Route
        path="/page-subscribers"
        element={<PageAllSubscribersScreen />}
      ></Route>
      <Route path="/page-settings" element={<PageSettingsScreen />}></Route>
      <Route
        path="/page-withdraw-money"
        element={<PageWithdrawMoneyScreen />}
      ></Route>
      <Route path="/page/:id" element={<PageProfileScreen />}></Route>
      <Route
        path="/page/subscribe/:id"
        element={<SubscribePageScreen />}
      ></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

//  To run the prettier over all files in the project just run the below command
// npx prettier --write .
