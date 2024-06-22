import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from "react";
import { HeroData } from "./data";
import Image from "next/image";
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";

const HeroSectionCarousel = () => {
  // const handleCarouselClick = () => {}

  return (
    <div className="relative flex h-auto w-full items-center justify-center">
      {/* <div onClick={handleCarouselClick} className="image-swiper-button-prev z-10 cursor-pointer">
        <ArrowBackIcon fontSize="large" />
      </div> */}
      <Swiper
        slidesPerView={1}
        keyboard={{
          enabled: true,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
        }}
        modules={[Keyboard, Mousewheel, Autoplay, Navigation, Pagination]}
        className="mySwiper"
        observer={true}
        observeParents={true}
        pagination={{
          clickable: true,
        }}
      >
        {HeroData?.map((data, index) => (
          <SwiperSlide key={index}>
            <div className=" cursor-pointer ">
              <Image
                src={data?.itemurl}
                alt={data?.itemname}
                width={800}
                height={500}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div onClick={handleCarouselClick} className="image-swiper-button-next z-10 cursor-pointer ms:ml-8">
        <ArrowForwardIcon fontSize="large" />
      </div> */}
    </div>
  );
};

export default HeroSectionCarousel;
