import React, { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import LikedItem from "./LikedItem";
import { handleLiked } from "@/utill/productUtils";

const LikedList: React.FC = () => {
  const [likedList, setLikedList] = useState<Product[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/products`, {
      method: "GET",
    });
    const products: Product[] = await resp.json();
    setLikedList(products.filter((item) => item.isLiked === true));
  };

  const onLikedToggle = (id: number) => {
    handleLiked(id, likedList, setLikedList, fetchData);
  };
  return (
    <div className="flex flex-col gap-5">
      {likedList.length > 0 ? (
        <LikedItem likedList={likedList} onLikedToggle={onLikedToggle} />
      ) : (
        <div className="p-40 text-sm text-gray-400 text-center">
          찜한 내역이 없습니다.
        </div>
      )}
    </div>
  );
};

export default LikedList;
