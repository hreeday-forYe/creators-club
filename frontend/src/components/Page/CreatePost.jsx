import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../../redux/slices/postApiSlice';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import PhotosUploader from '../utils/PhotosUploader';
import toast from 'react-hot-toast';
import Loader from '../Loader';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [photos, setPhotos] = useState([]);
  const [postStatus, setStatus] = useState(false);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setPhotos([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPhotos((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (photos) {
      photos.forEach((image, index) => {
        data.append(`photos[${index}]`, image);
      });
    }
    let status;
    if (postStatus) {
      status = 'private';
    } else {
      status = 'public';
    }

    data.append('title', title);

    try {
      await createPost({ title, photos, status });
      toast.success('Post Created Successfully');
      navigate('/page-posts');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="w-full p-8 flex items-center justify-center">
      <div className="w-[90%] 800px:w-[50%] bg-white  shadow-md mt-4 h-[65vh] rounded-[4px] p-3">
        <h5 className="text-[30px] font-Poppins text-center">
          Create New Post
        </h5>
        {isLoading && <Loader />}
        {/* create product form */}
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <br />
          <div>
            <label className="pb-2">
              Caption <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={title}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Status...."
            />
          </div>

          <div className="mt-4">
            <label className="pb-2">Upload Images</label>
            <input
              type="file"
              name="photos"
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />

            <div className="w-full flex items-center flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {photos &&
                photos.map((i) => (
                  <img
                    src={i}
                    key={i}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
            </div>
            <br />
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={postStatus}
                onChange={setStatus}
                name="status"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-Roboto font-medium text-gray-900"
              >
                Private
              </label>
            </div>

            <div className="mt-4">
              <input
                type="submit"
                value="Upload"
                className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
