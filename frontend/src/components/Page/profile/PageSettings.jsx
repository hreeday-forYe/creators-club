import React, { useEffect, useState } from 'react';
import styles from '../../../styles/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoCameraOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import {
  useUpdatePageAvatarMutation,
  useUpdatePageProfileMutation,
  useUpdateCoverImageMutation,
} from '../../../redux/slices/pagesApiSlice';
import { setCredentials } from '../../../redux/slices/authSlice';
import { FiDollarSign } from 'react-icons/fi';
import Loader from '../../Loader';
const PageSettings = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const creator = authInfo.creator;
  console.log(creator);
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [subscriptionCharge, setSubscriptionCharge] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  // redux hooks
  const dispatch = useDispatch();
  const [updatePageProfile, { isLoading: updateLoading }] =
    useUpdatePageProfileMutation();
  const [updatePageAvatar, { isLoading: avatarLoading }] =
    useUpdatePageAvatarMutation();
  const [updatePageCover, { isLoading: coverLoading }] =
    useUpdateCoverImageMutation();
  // use effect to load the latest data
  useEffect(() => {
    setName(creator.name);
    setDescription(creator.description);
    setAddress(creator.address);
    setPhoneNumber(creator.phoneNumber);
    setSubscriptionCharge(creator.subscriptionCharge);
  }, [
    creator.name,
    creator.description,
    creator.address,
    creator.phoneNumber,
    creator.subscriptionCharge,
  ]);

  // Update Functions
  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        console.log(reader.result);

        try {
          const res = await updatePageAvatar({
            avatar: reader.result,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Profile Image Updated');
        } catch (error) {
          toast.error('internal error');
        }
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const updateCoverImage = (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setCover(reader.result);
        console.log(reader.cover);
        try {
          const res = await updatePageCover({
            coverImage: reader.result,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Cover Image Uploaded');
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
      }
    };

    //call reader.read data file
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePageProfile({
        name,
        description,
        phoneNumber,
        subscriptionCharge,
        address,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile Info updated Successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="w-full m-2 min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5 border-red-500">
        {/* Cover Image */}
        <div className="h-[320px] relative">
          {creator.coverImage ? (
            coverLoading ? (
              <Loader />
            ) : (
              <div>
                <img
                  className="w-[100%] h-[250px] object-cover shadow-md rounded-md"
                  src={creator?.coverImage?.url}
                  alt="coverImage"
                />
                {/* <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-16 right-0">
                  <input
                    type="file"
                    id="CoverImage"
                    className="hidden"
                    onChange={updateCoverImage}
                  />
                  <label htmlFor="CoverImage">
                    <AiOutlineCamera />
                  </label>
                </div> */}
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-16 right-0">
                  <label htmlFor="CoverImage">
                    <AiOutlineCamera />
                    <input
                      type="file"
                      id="CoverImage"
                      className="hidden"
                      onChange={updateCoverImage}
                    />
                  </label>
                </div>
              </div>
            )
          ) : (
            // Skeleton
            <div className="w-full h-[250px] border bg-gray-300 relative rounded-md">
              {coverLoading ? (
                <Loader />
              ) : (
                <div>
                  <label
                    htmlFor="CoverImage"
                    className="bg-white p-2 inline-flex absolute inset-0 rounded-md  items-center space-x-2 cursor-pointer "
                  >
                    <IoCameraOutline className="mr-2" size={20} />
                    Upload Cover Image
                  </label>
                  <input
                    id="CoverImage"
                    type="file"
                    className="hidden"
                    onChange={updateCoverImage}
                  />
                </div>
              )}
            </div>
          )}

          <div className="w-full flex absolute top-[150px] left-0 right-0 items-center justify-center">
            <div className="relative cursor-pointer">
              {avatarLoading ? (
                <Loader />
              ) : (
                <>
                  <img
                    src={avatar ? avatar : `${creator.avatar?.url}`}
                    alt=""
                    className="w-[150px] h-[150px] rounded-full cursor-pointer object-cover"
                  />
                  <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
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
        </div>

        {/* Page info */}
        <form
          // aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Page Name</label>
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
              <label className="block pb-2">Page description</label>
            </div>
            <textarea
              id="desciption"
              rows={4}
              placeholder={'Enter your page description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 `}
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 ">Subscription Charge</label>
            </div>
            <input
              type="number"
              placeholder={`Choose your Subscription Charge`}
              value={subscriptionCharge}
              onChange={(e) => setSubscriptionCharge(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Address</label>
            </div>
            <input
              type="name"
              placeholder={'Enter your address'}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={creator?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Page"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageSettings;
