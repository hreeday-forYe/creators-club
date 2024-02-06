import React from 'react';
import CreatePage from '../../components/auth/CreatePage';
import { useNavigate } from 'react-router-dom';
const CreatePageScreen = () => {
  const userInfo = localStorage.getItem('userInfo');
  const pageInfo = localStorage.getItem('pageInfo');
  const navigate = useNavigate();

  if (userInfo) {
    navigate('/feed');
  } else if (pageInfo) {
    navigate('/page-dashbaord');
  }
  return (
    <div>
      <CreatePage />
    </div>
  );
};

export default CreatePageScreen;
