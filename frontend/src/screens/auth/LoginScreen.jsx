import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/auth/Login';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
const LoginScreen = () => {
  return (
    <div>
      {/* <Header /> */}
      <Login />
    </div>
  );
};

export default LoginScreen;
