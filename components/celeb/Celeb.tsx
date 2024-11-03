"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Artist {
  id: number;
  name: string;
  image: string;
}

const Celeb = () => {
  const [isClient, setIsClient] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsClient(true);
    return () => {};
  }, []);

  useEffect(() => {
    const fetchHots = async () => {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/artists`, {
          method: "GET",
        });
        const json: Artist[] = await resp.json();
        setArtists(json);
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
    <section className="relative my-10 md:my-24 lg:my-36 pt-10 md:pt-20 border-black border-opacity-10 border-[1px] border-l-0 border-r-0">
      <div className="max-w-[1200px] mx-auto px-3 pb-3 md:pb-10">
        <h3 className="font-black text-xl sm:text-3xl pb-[3vw] md:pb-7 tracking-tighter">
          CELEBRITY
        </h3>
        <p className="text-xs sm:text-sm">
          특정 아티스트 관련 굿즈를 구매해 보세요.
          <br />
          Try purchasing goods related to a specific artist.
        </p>
      </div>

      <Swiper
        className="border-black border-opacity-10 border-t-[1px]"
        loop={true} // 슬라이드 루프
        modules={[A11y, Autoplay]}
        slidesPerView={2} // 보여질 슬라이스 수
        height={250}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
        }}
        breakpoints={{
          540: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {artists.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`#`}>
              <div
                className="h-[400px] lg:h-[500px]"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="p-3">
                  <p className="text-sm md:text-base font-bold">{item.name}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Celeb;
