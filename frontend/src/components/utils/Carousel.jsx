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
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {photos.map((photo, index) => (
          <>
            <SwiperSlide>
              <img src={photo.url} alt="" />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
