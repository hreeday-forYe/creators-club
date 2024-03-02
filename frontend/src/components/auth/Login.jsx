import { React, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { user_url, page_url } from '../../constants';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('subscriber');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption === 'creator') {
      try {
        const response = await axios.post(
          `${page_url}/login-page`,
          { email, password },
          { withCredentials: true }
        );
        console.log(response.data.creator);
        localStorage.setItem(
          'pageInfo',
          JSON.stringify(response.data?.creator)
        );
        toast.success(response.data.message);
        navigate('/page-dashboard');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else if (selectedOption === 'subscriber') {
      try {
        const response = await axios.post(
          `${user_url}/login-user`,
          { email, password },
          { withCredentials: true }
        );
        console.log(response.data.user);
        localStorage.clear();
        localStorage.setItem('userInfo', JSON.stringify(response.data?.user));
        navigate('/feed');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Login to your Page or Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 mb-4">
                Choose your Account type
              </span>
              <div className="flex items-center ps-4 border mt-4 rounded cursor-pointer">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  name="account-type"
                  value="subscriber"
                  checked={selectedOption === 'subscriber'}
                  onChange={() => setSelectedOption('subscriber')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 cursor-pointer "
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ms-2 text-sm font-normal text-gray-600 "
                >
                  I'm a Subscriber
                </label>
              </div>
              <div className="flex items-center ps-4 mt-2 border border-gray-200 cursor-pointer rounded">
                <input
                  id="bordered-radio-2"
                  type="radio"
                  name="account-type"
                  value="creator"
                  checked={selectedOption === 'creator'}
                  onChange={() => setSelectedOption('creator')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 cursor-pointer "
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ms-2 text-sm font-normal text-gray-600 "
                >
                  I'm a Creator
                </label>
              </div>
            </div>

            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Don't have any account?</h4>
              <Link to="/register" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
