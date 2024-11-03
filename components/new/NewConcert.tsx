"use client";
import useIsMobile from "@/hooks/useIsMobile";
import React, { useEffect, useState } from "react";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Concert {
  id: number;
  name: string;
  title: string;
  content: string;
  image: string;
}

const NewConcert = () => {
  const [isClient, setIsClient] = useState(false);
  const [concert, setConcert] = useState<Concert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsClient(true);
    return () => {};
  }, []);

  useEffect(() => {
    const fetchHots = async () => {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/concerts`, {
          method: "GET",
        });
        const json: Concert[] = await resp.json();
        setConcert(json);
        setLoading(false); // 데이터 로드 완료
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchHots();
  }, []);

  if (!isClient) {
    return null; //서버사이드 렌더링 시에는 아무것도 렌더링 하지 않음
  }
  return (
    <Swiper
      className="relative"
      modules={[Autoplay, EffectFade]}
      slidesPerView={1} // 보여질 슬라이스 수
      height={680}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
      }}
      effect="fade"
      fadeEffect={{ crossFade: true }} // 페이드 효과에 cross-fade 옵션 추가
      speed={600} // 전환 속도 (밀리초 단위)
    >
      {concert?.map((item) => (
        <SwiperSlide
          className={`custom-after`}
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          key={item.id}
        >
          <div className="flex flex-col gap-5 items-center p-5 md:items-stretch md:flex-row md:gap-10 relative w-full max-w-[1200px] mx-auto box-border md:py-20">
            <span
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-full h-[400px] max-w-[70%] md:w-[420px] md:h-[610px] md:max-w-[50%]"
            ></span>
            <div className=" text-white flex-1 flex flex-col gap-5 justify-between">
              <div className="flex flex-col gap-3 flex-1 justify-center">
                <h3 className="text-xl md:text-3xl font-bold">
                  {item.name}
                  <br />
                  {item.title}
                </h3>
                <p className="">{item.content}</p>
              </div>
              <button className="self-end text-white border-2 p-3">
                BOOK NOW
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default NewConcert;
