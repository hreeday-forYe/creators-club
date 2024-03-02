import React from 'react';
import Register from '../../components/auth/Register';
import Header from '../../components/Header';
const RegisterScreen = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
  }
  return (
    <>
      <Header />
      <Register />
    </>
  );
};

export default RegisterScreen;
