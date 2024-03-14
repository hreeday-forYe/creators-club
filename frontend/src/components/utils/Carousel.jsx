import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
// import required modules
import { Navigation } from 'swiper/modules';
import '../../index.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
const Carousel = ({ photos }) => {
  console.log(photos[0]);
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="w-[100%] h-auto"
      >
        {photos.map((photo, index) => (
          <>
            <SwiperSlide key={index}>
              <img
                src={photo.url}
                alt=""
                style={{ width: '100%', objectFit: 'cover', height: '100%' }}
                className="w-[100%] h-[500px] object-cover"
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
