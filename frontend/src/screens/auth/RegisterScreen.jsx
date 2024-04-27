import React, { useEffect } from 'react';
import Register from '../../components/auth/Register';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const RegisterScreen = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (authInfo?.creator) {
      navigate('/page-dashboard');
    } else if (authInfo?.user) {
      navigate('/feed');
    }
  });
  return (
    <>
      <Header/>
      <Register />
    </>
  );
};

export default RegisterScreen;
