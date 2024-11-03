"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Autoplay, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [bgImage, setBgImage] = useState<string>("");
  useEffect(() => {
    setIsClient(true);

    return () => {};
  }, []);

  // 슬라이드 이미지 배열 설정
  const slideImages = [
    "/img/banner_01.png",
    "/img/banner_02.png",
    "/img/banner_03.png",
  ];

  // 슬라이드 변경 이벤트 핸들러
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setBgImage(slideImages[newIndex]); // bgImage 업데이트
  };

  if (!isClient) {
    return null; //서버사이드 렌더링 시에는 아무것도 렌더링 하지 않음
  }
  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: `url(${bgImage})`, // 동적 배경 이미지 설정
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute h-[70vw] sm:h-[60vw] md:h-[40vw] max-h-[680px] w-full custom-after transition-all duration-300"
      ></div>

      <div className="pt-32 md:pt-40 lg:pt-52">
        <Swiper
          className="!px-4 md:!px-0"
          loop={true} // 슬라이드 루프
          modules={[Pagination, A11y, Autoplay]}
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
          height={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          }}
          onSlideChange={handleSlideChange} // 슬라이드 변경 이벤트
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
              className="rounded-2xl"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/img/banner_02.png"
              width={880}
              height={575}
              alt="banner"
              className="rounded-2xl"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/img/banner_03.png"
              width={880}
              height={575}
              alt="banner"
              className="rounded-2xl"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
