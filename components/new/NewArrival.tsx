"use client";
import useIsMobile from "@/hooks/useIsMobile";
import React, { useEffect } from "react";

const NewArrival = () => {
  const isMobile = useIsMobile();

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
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url(/img/new_arrival.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative arrival-top flex items-center w-full overflow-hidden h-[60vh] text-white lg:bg-fixed custom-dim"
    >
      <h3
        className={`text-test transition-transform text-[8vw] font-black ease-linear translate-x-0`}
      >
        Mantra : New Release
      </h3>
    </section>
  );
};

export default NewArrival;
