import React from 'react';
import Register from '../../components/auth/Register';
const RegisterScreen = () => {
  const userInfo = localStorage.getItem('userInfo')
  if(userInfo){
    
  }
  return (
    <>
      <Register />
    </>
  );
};

export default RegisterScreen;
