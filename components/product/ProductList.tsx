"use client";
import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Product } from "@/types/Product";
import { Spin } from "antd";

const ProductItem = dynamic(() => import("@/components/product/ProductItem"), {
  suspense: true,
});

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); // 원본 상품 목록
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // 필터링된 상품 목록
  const [activeCategory, setActiveCategory] = useState<string>("0"); // 선택된 카테고리
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/products`, {
          method: "GET",
        });
        const json: Product[] = await resp.json();
        setProducts(json);
        setFilteredProducts(json); // 초기에는 모든 상품을 보여줌
        setLoading(false); // 데이터 로드 완료
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortProduct = (type: string) => {
    const sortedProducts = [...filteredProducts]; // 필터링된 상품을 기준으로 정렬

    if (type === "recent") {
      sortedProducts.sort((a, b) => a.id - b.id); // 최신순 정렬
    } else if (type === "row") {
      sortedProducts.sort((a, b) => a.price - b.price); // 낮은 가격순 정렬
    } else if (type === "high") {
      sortedProducts.sort((a, b) => b.price - a.price); // 높은 가격순 정렬
    }

    setFilteredProducts(sortedProducts);
  };

  const sortCate = (cat: string) => {
    setActiveCategory(cat); // 선택된 카테고리 설정

    let newFilteredProducts: Product[] = [];
    switch (cat) {
      case "0":
        newFilteredProducts = [...products]; // 전체 상품 보기
        break;
      case "1":
        newFilteredProducts = products.filter((item) => item.cat === "1"); // 뷰티미용 카테고리
        break;
      case "2":
        newFilteredProducts = products.filter((item) => item.cat === "2"); // 생활주방 카테고리
        break;
      case "3":
        newFilteredProducts = products.filter((item) => item.cat === "3"); // 가전 디지털 카테고리
        break;
      case "4":
        newFilteredProducts = products.filter((item) => item.cat === "4"); // 건강식품 카테고리
        break;
      default:
        newFilteredProducts = [...products];
    }
    setFilteredProducts(newFilteredProducts); // 필터링된 상품 설정
  };

  const cat = [
    { cat: "All", num: "0" },
    { cat: "ARTIST NAME01", num: "1" },
    { cat: "ARTIST NAME02", num: "2" },
    { cat: "ARTIST NAME03", num: "3" },
    { cat: "ARTIST NAME04", num: "4" },
  ];
  if (loading) {
    return (
      <div className="text-center p-10 m-auto">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto pt-[3vw] px-4">
      <h3 className="text-center font-bold text-2xl sm:text-3xl pb-[3vw] md:pb-7">
        goods
      </h3>
      <div className="flex flex-col justify-between items-center mb-4 lg:flex-row">
        <div className="flex flex-row justify-start gap-2 text-sm text-gray-500 whitespace-nowrap w-full overflow-x-auto no-scrollbar">
          {cat.map((item, idx) => {
            return (
              <p
                key={idx}
                onClick={() => sortCate(item.num)}
                className={`px-4 py-2 rounded-full cursor-pointer text-black font-bold ${
                  activeCategory === item.num ? "bg-[#EBF94C]" : ""
                }`}
              >
                {item.cat}
              </p>
            );
          })}
        </div>
        <div className="flex flex-row justify-end items-center gap-4 text-sm text-gray-500 whitespace-nowrap">
          <p
            className="px-1 py-3 md:px-3 md:py-2 cursor-pointer"
            onClick={() => sortProduct("recent")}
          >
            latest
          </p>
          |
          <p
            className="px-1 py-3 md:px-3 md:py-2 cursor-pointer"
            onClick={() => sortProduct("row")}
          >
            row price
          </p>
          |
          <p
            className="px-1 py-3 md:px-3 md:py-2 cursor-pointer"
            onClick={() => sortProduct("high")}
          >
            high price
          </p>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="text-center p-10 m-auto">
            <Spin size="large" />
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-10 mb-32">
          {filteredProducts.map((item) => (
            <ProductItem item={item} key={item.id} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default ProductList;