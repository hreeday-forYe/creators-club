import React, { useEffect } from 'react';
import CreatePage from '../../components/auth/CreatePage';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
const CreatePageScreen = () => {
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
      <CreatePage />
    </>
  );
};

export default CreatePageScreen;
