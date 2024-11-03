"use client";
import useIsMobile from "@/hooks/useIsMobile";
import React, { useEffect, useState } from "react";

interface NewArrivals {
  id: number;
  image: string;
  title: string;
}
const NewArrival = () => {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);
  const [arrivals, setArrivals] = useState<NewArrivals[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsClient(true);
    return () => {};
  }, []);

  useEffect(() => {
    const fetchHots = async () => {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/arrivals`, {
          method: "GET",
        });
        const json: NewArrivals[] = await resp.json();
        setArrivals(json);
        setLoading(false); // 데이터 로드 완료
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchHots();
  }, []);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(".arrival-top");
    const text = document.querySelector<HTMLElement>(".text-test");

    const scrolling = () => {
      if (text && target) {
        const sectionHeight = target?.getBoundingClientRect().height;
        const sectionTop = target?.getBoundingClientRect().top + sectionHeight;

        if (window.scrollY > sectionTop) {
          console.log("start!");
          text.style.transform = `translateX(${
            !isMobile
              ? (window.scrollY - sectionTop) / 10 > 100
                ? 100
                : (window.scrollY - sectionTop) / 10
              : sectionTop
          }%)`;
        }
      }
    };
    window.addEventListener("scroll", scrolling);
  }, [arrivals]);

  if (!isClient) {
    return null; //서버사이드 렌더링 시에는 아무것도 렌더링 하지 않음
  }

  return arrivals.map((item) => (
    <section
      key={item.id}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative arrival-top flex items-center w-full overflow-hidden h-[60vh] text-white lg:bg-fixed custom-dim"
    >
      <h3
        className={`text-test transition-transform text-[8vw] font-black ease-linear translate-x-0`}
      >
        {item.title}
      </h3>
    </section>
  ));
};

export default NewArrival;
