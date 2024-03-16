import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineCamera } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useProfileQuery } from '../../redux/slices/usersApiSlice';
const UserProfile = () => {
  const { data, isLoading, refetch } = useProfileQuery();
  console.log(data);
  const user = data?.user;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState(null);
  // Handle Image
  const handleImage = () => {};
  const handleSubmit = () => {};

  useEffect(() => {
    refetch();
    setName(user?.name);
    setEmail(user?.email);
  }, [user]);

  return (
    <>
      <div className="flex justify-center w-full p-3 800px:p-8">
        <div className="relative">
          {user?.avatar?.url ? (
            <>
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-blue"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </>
          ) : (
            <>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  backgroundColor: '#FFA500',
                  fontSize: '2.5rem',
                }}
              >
                {name && name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 my-3">
        <div className="font-semibold text-center text-lg px-2 w-28 mx-1">
          <p className="text-black">{user?.following?.length}</p>
          <Link
            to={'/my-followings'}
            className="text-gray-400 hover:text-blue-900 cursor-pointer"
          >
            Followings
          </Link>
        </div>
        <div className="font-semibold text-center text-lg px-2 w-28 mx-1">
          <p className="text-black">{user?.subscriptions?.length}</p>
          <Link
            to={'/my-subscriptions'}
            className="text-gray-400 hover:text-blue-900 cursor-pointer"
          >
            Subscriptions
          </Link>
        </div>
      </div>

      <div className="w-full px-5 py-2">
        <form
          // aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Full Name:</label>
            </div>
            <input
              type="name"
              placeholder={`Choose your Page Name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Email Address</label>
            </div>
            <input
              type="email"
              placeholder={'Enter your address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Password</label>
            </div>
            <input
              type="number"
              placeholder={'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Profile"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-12 cursor-pointer`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
