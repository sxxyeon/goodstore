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
import { ConvertPrice } from "@/utill/convert-price";

const HotProd = () => {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
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
  }, []);

  if (!isClient) {
    return null; //서버사이드 렌더링 시에는 아무것도 렌더링 하지 않음
  }

  return (
    <section className="relative my-10 md:my-24 lg:my-36 pt-10 md:pt-20 border-black border-opacity-10 border-[1px] border-l-0 border-r-0">
      <div className="max-w-[1200px] mx-auto px-3 pb-3 md:pb-10">
        <h3 className="font-black text-xl sm:text-3xl pb-[3vw] md:pb-7 tracking-tighter">
          HOT GOODS
        </h3>
        <p className="text-xs sm:text-sm">
          최근 일주일동안 판매량이 상승한 상품들 입니다.
          <br />
          These are products whose sales have increased over the past week.
        </p>
      </div>

      <Swiper
        className="border-black border-opacity-10 border-t-[1px]"
        loop={true} // 슬라이드 루프
        modules={[Navigation, Scrollbar, A11y, Autoplay]}
        spaceBetween={10} // 슬라이스 사이 간격
        slidesPerView={2} // 보여질 슬라이스 수
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
          540: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6, // 데스크탑이면 5개노출
          },
        }}
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative border-black border-opacity-10 border-[1px] border-b-0 border-t-0 max-w-[270px]">
              <Link href={`/detail/${item.id}`}>
                <Image src={item.image} width={270} height={270} alt="banner" />
                <div className="pt-3">
                  <p className="text-xs text-gray-500">{item.provider}</p>
                  <p className="text-sm md:text-base font-bold">{item.name}</p>
                  <div>
                    <span className="text-sm md:text-base font-bold">
                      {ConvertPrice(item.price)}
                    </span>
                    <span>원</span>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HotProd;
