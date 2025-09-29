import React from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "../assets/image.png";
import Image2 from "../assets/imageIsma.jpg";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Header = () => {
  return (
    <div className="py-[30px]">
      <Swiper
        className="relative"
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide className="flex justify-center items-center">
          <img
            className=" rounded-xl max-w-[1230px] w-full h-auto mx-auto"
            src={Image}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <img
            className=" rounded-xl max-w-[450px] w-full h-[360px] mx-auto"
            src={Image2}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <img
            className=" rounded-xl max-w-[1230px] w-full h-auto mx-auto"
            src={Image}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <img
            className=" rounded-xl max-w-[1230px] w-full h-auto mx-auto"
            src={Image}
            alt=""
          />
        </SwiperSlide>
        <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 bg-[#CAD1D7] text-white p-4 rounded-full hover:bg-[#FFBE1F] transition-all z-10">
          <FaAngleLeft className=" text-[#505C6A]" />
        </div>
        <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 bg-[#CAD1D7] text-white p-4 rounded-full hover:bg-[#FFBE1F] transition-all z-10">
          <FaAngleRight className=" text-[#505C6A]" />
        </div>
        
          </Swiper>

    </div>
  );
};

export default Header;
