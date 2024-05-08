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

// Anyone Routes
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import CreatePageScreen from './screens/auth/CreatePageScreen';
import VerificationScreen from './screens/auth/VerificationScreen';

// Creator Routes
import PageDashboardScreen from './screens/page/PageDashboardScreen';
import PageProfileScreen from './screens/page/PageProfileScreen';
import CreatePostScreen from './screens/page/CreatePostScreen';
import GetAllPostsScreen from './screens/page/GetAllPostsScreen';
import PageAllSubscribersScreen from './screens/page/PageAllSubscribersScreen';
import PageSettingsScreen from './screens/page/PageSettingsScreen';
import PageWithdrawMoneyScreen from './screens/page/PageWithdrawMoneyScreen';

// User Routes
import UserFeedScreen from './screens/users/UserFeedScreen';
import UserProfileScreen from './screens/users/UserProfileScreen';
import UserSubscriptionScreen from './screens/users/UserSubscriptionScreen';
import UserFollowingsScreen from './screens/users/UserFollowingsScreen';
import ExploreScreen from './screens/ExploreScreen';

import { Provider } from 'react-redux';
import store from './redux/store';

// ADMIN SCREENS
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import AdminWithdrawRequestScreen from './screens/admin/AdminWithdrawRequestScreen';

// Protect middlewares
import PrivateRoute from './routes/PrivateRoute';
import PagePrivateRoute from './routes/PagePrivateRoute';
import AdminAllCreatorsScreen from './screens/admin/AdminAllCreatorsScreen';
import AdminAllPostsScreen from './screens/admin/AdminAllPostsScreen';
import AdminAllSubscriptionsScreen from './screens/admin/AdminAllSubscriptionsScreen';
import AdminPrivateRoute from './routes/AdminPrivateRoute';
import NotFoundScreen from './screens/NotFoundScreen';
import PageInboxScreen from './screens/page/PageInboxScreen';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      {/* Anyone routes */}
      <Route path="/register" element={<RegisterScreen />}></Route>
      <Route path="/create-page" element={<CreatePageScreen />}></Route>
      <Route path="/verification" element={<VerificationScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="*" element={<NotFoundScreen />}></Route>

      {/* registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/feed" element={<UserFeedScreen />}></Route>
        <Route
          path="/my-subscriptions"
          element={<UserSubscriptionScreen />}
        ></Route>
        <Route path="/explore" element={<ExploreScreen />}></Route>
        <Route path="/my-followings" element={<UserFollowingsScreen />}></Route>
        <Route path="/profile" element={<UserProfileScreen />}></Route>
        <Route path="/page/:id" element={<PageProfileScreen />}></Route>
      </Route>

      {/* Registered Creators */}
      <Route path="" element={<PagePrivateRoute />}>
        <Route path="/page-dashboard" element={<PageDashboardScreen />}></Route>
        <Route path="/create-post" element={<CreatePostScreen />}></Route>
        <Route path="/page-posts" element={<GetAllPostsScreen />}></Route>
        <Route
          path="/page-subscribers"
          element={<PageAllSubscribersScreen />}
        ></Route>
        <Route path="/page-settings" element={<PageSettingsScreen />}></Route>
        <Route path="/page-messages" element={<PageInboxScreen />}></Route>
        <Route
          path="/page-withdraw-money"
          element={<PageWithdrawMoneyScreen />}
        ></Route>
      </Route>

      {/* Admin User protect middleware */}
      <Route path="" element={<AdminPrivateRoute />}>
        <Route
          path="/admin-dashboard"
          element={<AdminDashboardScreen />}
        ></Route>
        <Route
          path="/all-creators"
          element={<AdminAllCreatorsScreen />}
        ></Route>
        <Route path="/all-posts" element={<AdminAllPostsScreen />}></Route>
        <Route
          path="/all-subscriptions"
          element={<AdminAllSubscriptionsScreen />}
        ></Route>
        <Route
          path="/admin-withdraw-request"
          element={<AdminWithdrawRequestScreen />}
        ></Route>
      </Route>
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
