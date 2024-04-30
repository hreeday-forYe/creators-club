import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../../redux/slices/postApiSlice';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import addphoto from '../../assets/post/addphoto.svg';
import addvideo from '../../assets/post/addvideo.svg';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [photos, setPhotos] = useState([]);
  const [postStatus, setStatus] = useState(false);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [video, setVideo] = useState(null);
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

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(null);
    const reader = new FileReader();
    reader.onload = () => {
      setVideo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('At least caption is required');
      return;
    }
    const data = new FormData();
    if (photos) {
      photos.forEach((image, index) => {
        data.append(`photos[${index}]`, image);
      });
    }

    console.log(video);
    if (video) {
      data.append('video', video);
    }

    let status;
    if (postStatus) {
      status = 'private';
    } else {
      status = 'public';
    }

    data.append('title', title);
    console.log(data);
    try {
      await createPost({ title, photos, status, video });
      toast.success('Post sent for approval');
      navigate('/page-posts');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="w-full p-8 flex items-center justify-center">
      <div className="w-[90%] 800px:w-[50%] bg-white border shadow-md mt-12 h-auto rounded-[4px] p-3">
        <h5 className="text-[25px] text-gray-500 font-Poppins text-center">
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
          <div>
            <div className={`${video ? 'hidden' : 'block mt-4'}`}>
              <label className="pb-2">Upload Images</label>
              <input
                type="file"
                name="photos"
                id="upload"
                className="hidden"
                multiple
                disabled={video ? true : false}
                onChange={handleImageChange}
                accept=".jpg,.png"
              />

              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload" className="flex gap-1 items-center">
                  {/* <AiOutlinePlusCircle
                    size={30}
                    className="mt-3"
                    color="#555"
                  /> */}
                  <img src={addphoto} className="w-10 text-gray-400" alt="" />
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
            </div>
            <br />
            <div className={`${photos.length ? 'hidden' : 'block'}`}>
              <label className="pb-2">Upload Video</label>

              <input
                type="file"
                name="video"
                id="video-upload"
                className="hidden"
                onChange={handleVideoChange}
                disabled={photos.length > 0}
                accept=".mov,.mp4"
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="video-upload">
                  <img src={addvideo} className="w-10 text-gray-400" alt="" />
                </label>
                {video && (
                  <video
                    controls
                    className="h-[250px] w-[200px] object-cover rounded-md m-2"
                  >
                    <source src={video} type={video.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
            <br />
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={postStatus}
                onChange={() => setStatus(!postStatus)}
                name="status"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-Roboto font-medium text-gray-900"
              >
                Private:
                <span className="text-sm ml-4 text-gray-500">
                  Private Posts are visible only to subscribers
                </span>
              </label>
            </div>

            <div className="mt-8">
              <input
                type="submit"
                value="Upload"
                disabled={isLoading}
                className="mt-4 cursor-pointer appearance-none text-center block px-3 h-[35px] border border-gray-300 bg-blue-600 text-white rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:bg-blue-800 trasnsition duration-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
