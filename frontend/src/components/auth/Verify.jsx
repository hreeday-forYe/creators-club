import React from 'react';
import styles from '../../styles/styles';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { user_url } from '../../constants';
import axios from 'axios';
import toast from 'react-hot-toast';
const Verify = () => {
  const location = useLocation();
  const activation_token = location.state?.activationToken;
  const [otp, setotp] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const activation_code = otp;
    try {
      const response = await axios.post(`${user_url}/activate-user`, {
        activation_token,
        activation_code,
      });
      console.log(response);
      if (response) {
        toast.success(response.data.message);
        setotp('');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          className="mx-8 w-26 border border-black h-8"
          value={otp}
          placeholder="enter email verification Code"
          onChange={(e) => setotp(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Verify;
