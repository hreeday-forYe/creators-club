import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/auth/Login';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
const LoginScreen = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if (authInfo?.creator) {
      navigate('/page-dashboard');
    } else if (authInfo?.user) {
      navigate('/feed');
    }
  })
  
  return (
    <div>
      <Header />
      <Login />
    </div>
  );
};

export default LoginScreen;
