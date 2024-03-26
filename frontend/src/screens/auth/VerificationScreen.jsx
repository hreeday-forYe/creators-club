import React, { useEffect } from 'react';
import Verify from '../../components/auth/Verify';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VerificationScreen = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (authInfo?.creator) {
      navigate('/page-dashboard');
    } else if (authInfo?.user) {
      navigate('/feed');
    }
  }, [authInfo]);
  return (
    <>
      <Header />
      <Verify />
    </>
  );
};

export default VerificationScreen;
