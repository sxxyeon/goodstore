"use client";
import React, { useEffect, useState } from "react";
import { ConvertPrice } from "@/utill/convert-price";
import { CartProduct } from "@/types/Product";
import CartProductItem from "@/components/basket/CartProductItem";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
const Basket: React.FC = () => {
  const { fetchCartData } = useCart();
  const [total, setTotal] = useState(0);
  const [checkLists, setCheckLists] = useState<number[]>([]);
  const [cartList, setCartList] = useState<CartProduct[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/cart`);
        const json: CartProduct[] = await resp.json();
        setCartList(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const isAllChecked =
    cartList?.length === checkLists.length && checkLists.length !== 0;

  const handleQuantity = async (
    type: "plus" | "minus",
    id: number,
    quantity: number
  ) => {
    if (type === "minus" && quantity <= 1) return;
    const found = cartList?.find((el) => el.id === id);
    if (!found) return;

    const updatedItem: CartProduct = {
      ...found,
      quantity: type === "plus" ? quantity + 1 : quantity - 1,
    };

    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      };
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_JSON}/cart/${id}`,
        options
      );
      if (!resp.ok) {
        throw new Error("Failed to update cart item.");
      }
      setCartList(
        cartList?.map((item) => (item.id === id ? updatedItem : item))
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      const options = {
        method: "DELETE",
      };
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_JSON}/cart/${id}`,
        options
      );
      if (!resp.ok) {
        throw new Error("Failed to remove cart item.");
      }
      setCartList(cartList?.filter((item) => item.id !== id));
      setCheckLists(checkLists.filter((check) => check !== id));
      await fetchCartData();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckList = (checked: boolean, id: number) => {
    if (checked) {
      setCheckLists([...checkLists, id]);
    } else {
      setCheckLists(checkLists.filter((check) => check !== id));
    }
  };

  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      const checkItems = cartList?.map((item) => item.id);
      setCheckLists(checkItems);
    } else {
      setCheckLists([]);
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = checkLists.reduce((total, id) => {
        const found = cartList?.find((item) => item.id === id);
        return found ? total + found.price * found.quantity : total;
      }, 0);
      setTotal(totalPrice);
    };

    calculateTotal();
  }, [checkLists, cartList]);

  return (
    <div className="max-w-[1200px] m-auto px-3 py-20 md:py-32">
      <div className="pb-6">
        <h2 className="text-xl md:text-3xl font-bold text-center py-3 lg:pb-5 lg:pt-0">
          CART
        </h2>
        <div>
          <div className="flex flex-row gap-1 items-center">
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={(e) => handleCheckAll(e.target.checked)}
              className="w-[20px] h-[20px] cursor-pointer"
            />
            <p className="text-xs">전체선택</p>
          </div>
        </div>
      </div>

      {cartList?.length !== 0 ? (
        <div className="flex flex-col gap-3 justify-center">
          <div className="flex flex-col gap-4 lg:gap-6">
            {cartList?.map((item) => (
              <CartProductItem
                key={`key-${item.id}`}
                item={item}
                checkLists={checkLists}
                handleCheckList={handleCheckList}
                handleQuantity={handleQuantity}
                handleRemove={handleRemove}
              />
            ))}
          </div>
          <div className="max-w-[1000px] md:mx-auto flex flex-col md:flex-row text-center justify-between my-3 lg:my-7 text-sm md:text-base md:items-center md:gap-20">
            <div className="flex flex-col md:flex-row md:gap-10 items-center">
              <div className="w-full flex items-center justify-between py-3 lg:py-4 md:w-auto md:block border-b-[1px] border-[#ddd] md:border-0">
                <p>총 상품금액</p>
                <p>
                  <span className="text-lg font-bold">
                    {ConvertPrice(total)}
                  </span>
                  원
                </p>
              </div>
              <div className="hidden md:block">
                <img
                  src="/img/icon-minus-line.svg"
                  alt="minus"
                  className="w-[20px] h-[20px] border-[1px] border-neutral-300 p-1 rounded-full bg-white md:p-2 md:w-[40px] md:h-[40px]"
                />
              </div>
              <div className="w-full flex items-center justify-between py-4 md:w-auto md:block border-b-[1px] border-[#ddd] md:border-0">
                <p>상품 할인</p>
                <p>
                  <span className="text-lg font-bold">0</span>원
                </p>
              </div>
              <div className="hidden md:block">
                <img
                  src="/img/icon-plus-line.svg"
                  alt="plus"
                  className="w-[20px] h-[20px] border-[1px] border-neutral-300 p-1 rounded-full bg-white md:p-2 md:w-[40px] md:h-[40px]"
                />
              </div>
              <div className="w-full flex items-center justify-between py-4 md:w-auto md:block border-b-[1px] border-[#ddd] md:border-0">
                <p>배송비</p>
                <p>
                  <span className="text-lg font-bold">0</span>원
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-between py-4 md:w-auto md:block border-t-[1px] border-black md:border-0">
              <p className="font-bold text-base">결제 예정 금액</p>
              <p className="font-bold">
                <span className="text-2xl font-bold">
                  {ConvertPrice(total)}
                </span>
                원
              </p>
            </div>
          </div>
          <button className="bg-black text-white w-full md:w-[50%] self-center rounded-lg py-5 md:mt-10">
            주문하기
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p>장바구니에 담긴 상품이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Basket;
