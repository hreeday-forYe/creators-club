import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { CardMedia } from '@mui/material';
// import required modules
import { Pagination } from 'swiper/modules';
import '../../index.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const Carousel = ({ photos }) => {
  // console.log(photos[0]);
  return (
    <>
      <Swiper
        // className="w-[100%] h-auto"
        style={{ width: '100%', height: 'auto' }}
        // key={index}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        // key={index}
      >
        {photos.map((photo, index) => (
          <>
            <SwiperSlide key={index}>
              <CardMedia
                component="img"
                className="w-[20%] h-[500px]"
                image={photo.url}
                alt="Photo url"
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
