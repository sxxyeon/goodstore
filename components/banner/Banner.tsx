"use client";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import React, { useState, useEffect, useRef } from "react";
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    //SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);
    setIsClient(true);

    return () => {};
  }, []);

  if (!isClient) {
    return null; //서버사이드 렌더링 시에는 아무것도 렌더링 하지 않음
  }
  return (
    <div className="relative">
      <div className="absolute bg-gradient-to-r from-custom-yellow via-custom-orange to-custom-red h-[70vw] sm:h-[60vw] md:h-[35vw] max-h-[550px] w-full"></div>
      <div className="pt-24">
        <Swiper
          className="!pb-4 !px-4 md:!px-0 md:!pb-16"
          loop={true} // 슬라이드 루프
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={60} // 슬라이스 사이 간격
          slidesPerView={1} // 보여질 슬라이스 수
          centeredSlides={true}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active", // Tailwind문법으로 직접 커스텀 안됨.
          }}
          //scrollbar={{ draggable: true }}
          height={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          }}
          breakpoints={{
            768: {
              slidesPerView: 2, // 데스크탑이면 2개노출
            },
          }}
        >
          <SwiperSlide>
            {" "}
            <Image
              src="/img/banner_01.png"
              width={880}
              height={575}
              alt="banner"
              className="rounded-lg md:rounded-none"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/img/banner_02.png"
              width={880}
              height={575}
              alt="banner"
              className="rounded-lg md:rounded-none"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/img/banner_03.png"
              width={880}
              height={575}
              alt="banner"
              className="rounded-lg md:rounded-none"
            />
          </SwiperSlide>
        </Swiper>
        <div className="custom-prev absolute left-5 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
          <FeatherIcon
            icon="chevron-left"
            size="50"
            className="absolute top-[4px] left-2 text-white"
          />
        </div>
        <div className="custom-next absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
          <FeatherIcon
            icon="chevron-right"
            size="50"
            className="absolute top-[4px] right-2 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
