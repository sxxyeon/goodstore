"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { cartList, fetchCartData } = useCart();
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // 스크롤 상태 관리
  const [isMain, setIsMain] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const router = useRouter();
  const path = usePathname();
  const searchRef = useRef<any | null>(null);
  useEffect(() => {
    if (path !== "/") {
      setIsMain(false);
    } else {
      setIsMain(true);
    }
    if (path !== "/search") {
      setSearch("");
    }
  }, [path]);
  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // 스크롤이 50px 이상일 때 상태 변경
      } else {
        setIsScrolled(false); // 스크롤이 50px 이하일 때 상태 초기화
      }
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 추가
    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // 스크롤이 50px 이상일 때 상태 변경
      } else {
        setIsScrolled(false); // 스크롤이 50px 이하일 때 상태 초기화
      }
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 추가
    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSearchEnter = (e) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

  const toggleOpenSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    searchRef.current.focus();
  };
  return (
    <>
      <div
        className={`fixed ${
          isSearchOpen ? "translate-y-[0px]" : "translate-y-[-140px]"
        } w-full h-[140px] bg-[#ebf94c] bg-opacity-80 backdrop-blur-md z-[100] transition-all duration-300 ease-out`}
      >
        <form
          className="relative min-w-0 max-w-[300px] mx-auto mt-11"
          onSubmit={onSearchEnter}
        >
          <input
            ref={searchRef}
            type="text"
            placeholder=""
            className={`w-full min-w-0 rounded-full p-2 h-[40px] focus:outline-none bg-black bg-opacity-10`}
            onChange={onSearchChange}
            value={search}
          />
          <FeatherIcon
            icon="search"
            size="26"
            className={`absolute top-[4px] right-2 text-black`}
          />
        </form>
        <button
          onClick={toggleOpenSearch}
          className={`absolute bottom-4 right-4`}
        >
          <FeatherIcon icon="x" size="26" className={` text-black`} />
        </button>
      </div>
      <header
        className={`w-full fixed z-50 transition-opacity duration-500 ${
          isScrolled || !isMain
            ? "md:top-1 md:w-[95%] md:max-w-[1300px] left-[50%] translate-x-[-50%] bg-[#ebf94c] bg-opacity-70 backdrop-blur-md h-[60px] md:h-[60px] md:rounded-lg"
            : "h-[90px] md:h-[90px] top-0 left-0 bg-opacity-0"
        }`}
      >
        <div
          className={`flex flex-row justify-between items-center px-3 max-w-[1200px] m-auto ${
            isScrolled || !isMain
              ? "h-[60px] md:h-[60px]"
              : "h-[90px] md:h-[90px]"
          }`}
        >
          <div>
            <Link href="/">
              <h1 className="h-full">
                <img
                  src={`${
                    isScrolled || !isMain ? "/img/logo_b.png" : "/img/logo.png"
                  }`}
                  alt="logo"
                  className="w-[140px]"
                />
              </h1>
            </Link>
          </div>

          <div className="flex flex-row gap-2 sm:gap-3 justify-between">
            <button onClick={toggleOpenSearch} className={`relative`}>
              <FeatherIcon
                icon="search"
                size="26"
                className={`absolute top-[4px] right-2 ${
                  isScrolled || !isMain ? "text-black" : "text-white"
                } `}
              />
            </button>

            <Link href="/basket" className=" block w-[40px] h-[40px]">
              <div className="relative">
                <FeatherIcon
                  icon="shopping-bag"
                  size="26"
                  className={`absolute top-[4px] ${
                    isScrolled || !isMain ? "text-black" : "text-white"
                  } `}
                />
                {cartList.length >= 1 ? (
                  <div className="absolute right-[0px] top-0 bg-black text-white rounded-full w-[14px] h-[14px] leading-[14px] text-center text-xs">
                    <p>{cartList.length}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
