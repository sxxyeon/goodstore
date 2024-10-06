"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { CartProduct } from "@/types/Product";
import { ConvertPrice } from "@/utill/convert-price.js";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {
    id: number;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const { cartList, fetchCartData } = useCart();
  const [item, setItem] = useState<Product | null>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_JSON}/products/${params.id}`
        );
        const json: Product = await resp.json();
        setItem(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    fetchCartData();
  }, []);

  // 상세페이지에서 물건 수량 조절
  const handleQuantity = (type: "plus" | "minus") => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  // 장바구니에 중복된 물건을 담을 때 사용
  const setQuantity = async (found: CartProduct, quantity: number) => {
    const updatedItem: CartProduct = {
      ...found,
      quantity: found.quantity + count,
    };
    const options = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    };
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_JSON}/cart/${found.id}`,
      options
    );
    if (!resp.ok) {
      throw new Error("Failed to update cart item.");
    }
    await fetchCartData(); // Update cart data
    alert("수량이 추가되었습니다.");
  };

  const handleCart = async (item: Product) => {
    const cartItem: CartProduct = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      provider: item.provider,
      quantity: count,
    };

    //장바구니 중복확인
    const found = cartList?.find((el) => el.id === item.id);
    if (found) {
      await setQuantity(found, count);
    } else {
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      };
      const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/cart`, options);
      if (!resp.ok) {
        throw new Error("Failed to add to liked list.");
      }
      await fetchCartData();
      alert("장바구니에 추가되었습니다.");
    }
  };
  const router = useRouter();
  const orderItem = { ...item, quantity: count };
  const query = new URLSearchParams({
    item: JSON.stringify(orderItem),
  }).toString();
  const goOrderPage = () => {
    router.push(`/order?${query}`);
  };

  return (
    item && (
      <div className="flex flex-col w-full justify-between gap-10 mt-[60px] md:mt-[65px] lg:max-w-[1200px] lg:flex-row lg:mx-auto lg:my-[200px]">
        <div className="lg:w-[500px] lg:h-[500px] rounded-lg overflow-hidden">
          <img
            src={`${item.image}`}
            className="w-full lg:w-[500px] lg:h-[500px]"
            alt="product"
          />
        </div>
        <div className="flex-1 px-4 lg:px-2">
          <div className=" flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-500">{item.provider}</p>
              <p className="text-lg lg:text-xl font-bold pb-4 pt-2">
                {item.name}
              </p>
              <div className="">
                <span className="text-lg lg:text-xl font-bold">
                  {ConvertPrice(item.price.toString())}
                  <span className="text-base font-normal">원</span>
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="py-3 lg:py-7 text-sm">무료배송</p>
              <div className="flex flex-row gap-1 py-3 lg:py-7 border-t-[1px] border-neutral-300">
                <Image
                  src="/img/icon-minus-line.svg"
                  width={24}
                  height={24}
                  alt="minus"
                  onClick={() => handleQuantity("minus")}
                  className="border-[1px] border-neutral-300 p-1 cursor-pointer"
                />

                <div>
                  <span className="border-[1px]  border-neutral-300 w-[24px] h-[24px] leading-[24px] block text-center">
                    {count}
                  </span>
                </div>

                <Image
                  src="/img/icon-plus-line.svg"
                  width={24}
                  height={24}
                  alt="plus"
                  onClick={() => handleQuantity("plus")}
                  className="border-[1px]  border-neutral-300 p-1 cursor-pointer"
                />
              </div>

              <div className="flex flex-row justify-between items-center py-3 lg:py-5 border-t-[1px] border-neutral-300">
                <span className="inline-block text-sm">총 상품 금액</span>
                <div className="flex items-center">
                  <span className="inline-block mr-4 text-sm text-gray-500">
                    수량 <span className="lg:text-xl font-bold">{count}</span>개
                  </span>
                  <span className=" inline-block">
                    <span className="lg:text-2xl font-bold">
                      {ConvertPrice((item.price * count).toString())}
                    </span>
                    원
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center gap-3 pt-4 pb-10 border-t-[1px] border-black">
                <button
                  className="p-3 lg:p-4 border-black border-[1px] rounded text-black box-border"
                  onClick={() => {
                    handleCart(item);
                  }}
                >
                  장바구니
                </button>
                <button
                  onClick={goOrderPage}
                  className="flex-1 border-black border-[1px] bg-black text-white p-3 lg:p-4 rounded"
                >
                  바로 구매
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Page;
