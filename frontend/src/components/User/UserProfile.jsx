import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineCamera } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Avatar, Dialog, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useProfileQuery,
  useUpdateUserInfoMutation,
  useUpdateUserAvatarMutation,
  useUpdateUserPasswordMutation,
} from '../../redux/slices/usersApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';

import Loader from '../Loader';
const UserProfile = () => {
  const { data, isLoading, refetch } = useProfileQuery();
  console.log(data);
  const user = data?.user;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [avatar, setAvatar] = useState(null);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const dispatch = useDispatch();
  const [updateUserAvatar, { isLoading: avatarLoading }] =
    useUpdateUserAvatarMutation();
  const [updatePassword, { isLoading: updatePasswordLoading }] =
    useUpdateUserPasswordMutation();
  const [updateUserInfo, { isLoading: updateLoading }] =
    useUpdateUserInfoMutation();
  // Handle Image
  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        try {
          const res = await updateUserAvatar({
            avatar: reader.result,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          refetch();
          toast.success('Profile Image Updated');
        } catch (error) {
          console.log(error);
          toast.error(error?.data?.message || error.error);
        }
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserInfo({
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      refetch();
      toast.success('Profile info updated');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Update user Password
  const updateUserPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePassword({ newPassword, oldPassword }).unwrap();
      toast.success('Password update successfully');
      setOldPassword('');
      setNewPassword('');
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    refetch();
    setName(user?.name);
    setEmail(user?.email);
    setPassword('')
  }, [user]);

  return (
    <>
      <div className="flex justify-center w-full p-3 800px:p-8">
        <div className="relative">
          {avatarLoading && <Loader />}
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
      {updateLoading && <Loader />}
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
              type="password"
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
              className={`${styles.input} p-2 bg-blue-500 hover:bg-blue-700 transition duration-100 text-white !w-[95%] mb-4 800px:mb-4 cursor-pointer`}
              required
              readOnly
            />
          </div>
        </form>
        <span className="w-[100%] flex items-center flex-col mb-4">OR</span>
        <div className="w-[100%] flex items-center flex-col mb-12">
          <button
            className="p-2 text-black border-2 hover:shadow-md"
            onClick={() => setPasswordDialog(!passwordDialog)}
          >
            Update Password
          </button>
        </div>

        {/* Update passwor dialog */}
        <Dialog
          open={passwordDialog}
          onClose={() => setPasswordDialog(!passwordDialog)}
        >
          {updatePasswordLoading && <Loader />}
          <div className=" min-w-[350px] 800px:min-w-[500px]  h-[40vh] p-2">
            <Typography variant="h6" className="text-center">
              Update Your Password
            </Typography>

            <form className="flex m-6" onSubmit={(e) => updateUserPassword(e)}>
              <div className="flex flex-col gap-3 w-[90%]">
                <div className="mt-2 w-full">
                  <input
                    type="text"
                    value={oldPassword}
                    className="w-[100%] py-2 px-4 outline-none border rounded-md font-Roboto"
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                    required
                  />
                </div>
                <div className="mt-2 w-full">
                  <input
                    type="text"
                    value={newPassword}
                    className="w-[100%] py-2 px-4 outline-none border rounded-md font-Roboto"
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-sm border-blue-500 border-2 p-2 w-full"
                  variant="contained"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default UserProfile;
