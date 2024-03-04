import React, { useEffect } from 'react';
import CreatePage from '../../components/auth/CreatePage';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
const CreatePageScreen = () => {
  const userInfo = localStorage.getItem('userInfo');
  const pageInfo = localStorage.getItem('pageInfo');
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/feed');
    } else if (pageInfo) {
      navigate('/page-dashboard');
    }
  }, [userInfo, pageInfo]);
  return (
    <div>
      <Header />
      <div className="mt-8">
        <CreatePage />
      </div>
    </div>
  );
};

export default CreatePageScreen;
