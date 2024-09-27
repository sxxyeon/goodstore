"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types/Product";
import ProductItem from "@/components/product/ProductItem";
const Search = () => {
  const [list, setList] = useState<Product[] | []>([]);

  const params = useSearchParams();
  const searchTerm = params.get("q");

  const fetchData = async () => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/products`);
      const json: Product[] = await resp.json();
      if (searchTerm) {
        const filteredList = json.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setList(filteredList);
      } else {
        setList([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  console.log(searchTerm);
  return (
    <Suspense fallback={"loading"}>
      <div className="max-w-[1200px] mx-auto px-4 py-28 md:py-36">
        {list?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-10">
            {list?.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center my-40">검색결과가 없습니다</div>
        )}
      </div>
    </Suspense>
  );
};

export default Search;
