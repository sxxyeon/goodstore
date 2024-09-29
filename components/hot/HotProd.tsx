"use client";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";
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
import { Product } from "@/types/Product";

const HotProd = () => {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    //SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);
    setIsClient(true);

    return () => {};
  }, []);

  useEffect(() => {
    const fetchHots = async () => {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/hots`, {
          method: "GET",
        });
        const json: Product[] = await resp.json();
        setProducts(json);
        setLoading(false); // 데이터 로드 완료
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchHots();
  });

  if (!isClient) {
    return null; //서버사이드 렌더링 시에는 아무것도 렌더링 하지 않음
  }

  return (
    <div>
      <div className="relative max-w-[1200px] mx-auto pt-4 md:pt-10 lg:pt-16">
        <h3 className="text-center font-black text-xl sm:text-3xl pb-[3vw] md:pb-7 tracking-tighter">
          HOT GOODS
        </h3>
        <Swiper
          className="!pb-5"
          loop={true} // 슬라이드 루프
          modules={[Navigation, Scrollbar, A11y, Autoplay]}
          spaceBetween={10} // 슬라이스 사이 간격
          slidesPerView={3} // 보여질 슬라이스 수
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          //scrollbar={{ draggable: true }}
          height={250}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          }}
          breakpoints={{
            880: {
              slidesPerView: 5, // 데스크탑이면 5개노출
              spaceBetween: 30,
            },
          }}
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/detail/${item.id}`}>
                <Image src={item.image} width={270} height={270} alt="banner" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-prev absolute left-5 top-[60%] transform -translate-y-1/2 cursor-pointer z-10">
          <FeatherIcon
            icon="chevron-left"
            size="50"
            className="absolute top-[4px] -left-2 text-white"
          />
        </div>
        <div className="custom-next absolute right-5 top-[60%] transform -translate-y-1/2 cursor-pointer z-10">
          <FeatherIcon
            icon="chevron-right"
            size="50"
            className="absolute top-[4px] -right-2 text-white"
          />
        </div>

        {/* Custom pagination */}
        <div className="custom-pagination flex justify-center mt-4"></div>
      </div>
    </div>
  );
};

export default HotProd;
