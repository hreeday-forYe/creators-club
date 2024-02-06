import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/auth/Login';
import Header from '../../components/Header';

const LoginScreen = () => {
  const navigate = useNavigate();
  // const { isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     navigate('/');
  //   }
  // }, []);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const pageInfo = JSON.parse(localStorage.getItem('pageInfo'));
  useEffect(() => {
    if (userInfo) {
      navigate('/feed');
      
    } else if (pageInfo) {
      navigate('/page-dashboard');
    } else {
      navigate('/login');
    }
  });
  return (
    <div>
      <Header />
      <Login />
    </div>
  );
};

export default LoginScreen;
