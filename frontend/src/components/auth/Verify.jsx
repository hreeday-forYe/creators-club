import React from 'react';
import styles from '../../styles/styles';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { page_url, user_url } from '../../constants';
import axios from 'axios';
import toast from 'react-hot-toast';
const Verify = () => {
  const location = useLocation();
  const activation_token = location.state?.activationToken;
  const registerType = location.state?.registerType;
  const [otp, setotp] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const activation_code = otp;

    if (registerType === 'user') {
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
    } else if (registerType === 'page') {
      try {
        const response = await axios.post(`${page_url}/activate-page`, {
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
    }
  };
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
          <VscWorkspaceTrusted size={60} className='text-blue-600'/>
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>
                We have sent a code to your email. Please check and verify your
                account
              </p>
            </div>
          </div>
          <div>
            <form onSubmit={submitHandler}>
              <div className="flex flex-col space-y-10">
                <div className="flex flex-row items-center justify-between w-full mx-auto max-w-xs">
                  <div className="w-full h-16">
                    <input
                      placeholder="Enter Your OTP"
                      className="w-full h-full flex items-center justify-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      value={otp}
                      onChange={(e) => setotp(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-row items-center justify-between">
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-blue-600 border-none text-white text-sm shadow-sm hover:shadow-lg font-medium hover:bg-blue-800">
                      Verify Account
                    </button>
                    
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Already Have an Account?</p>{' '}
                    <Link
                      className="flex flex-row items-center text-blue-600"
                      to={'/login'}
                      rel="login"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
