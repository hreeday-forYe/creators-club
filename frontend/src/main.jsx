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
import PageDashboard from './screens/page/PageDashboard';
import UserFeedScreen from './screens/users/UserFeedScreen';
// import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>
      <Route path="/create-page" element={<CreatePageScreen />}></Route>
      <Route path="/verification" element={<VerificationScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/page-dashboard" element={<PageDashboard />}></Route>
      <Route path="/feed" element={<UserFeedScreen />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

//  To run the prettier over all files in the project just run the below command
// npx prettier --write .
