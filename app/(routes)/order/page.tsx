"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { CartProduct } from "@/types/Product";
import React, { useEffect, useRef, useState } from "react";
import OrderTable from "@/components/order/OrderTable";
import ContHeader from "@/components/common/ContHeader";
import ButtonList from "@/components/order/ButtonList";
import OneButton from "@/components/common/OneButton";
import CustomerTable from "@/components/order/CustomerTable";
import PaymentTable from "@/components/order/PaymentTable";
import SumTable from "@/components/order/SumTable";

interface OrderInfo {
  id: number;
  date: string;
  customer: string;
  address: string;
  payment: string;
  orderList: CartProduct[];
}

const OrderPage: React.FC = () => {
  const router = useRouter();
  const idRef = useRef(0);
  const searchParams = useSearchParams();
  const item = searchParams.get("item");
  const parsedItems: CartProduct[] = item ? JSON.parse(item) : []; //null에서 배열로 초기화
  const [orderList, setOrderList] = useState<CartProduct[]>(parsedItems);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    id: idRef.current++,
    date: new Date().toLocaleDateString(),
    customer: "",
    address: "",
    payment: "",
    orderList: Array.isArray(orderList) ? orderList : [orderList],
  });

  const selectPayment = (name: string) => {
    setOrderInfo((prev) => ({
      ...prev,
      payment: name === "네이버페이" ? "naver" : "transfer",
    }));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({
      ...prev,
      payment: orderInfo.payment,
      [name]: value,
    }));
  };

  const submitOrder = async () => {
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    };
    const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/orders`, options);
    if (!resp.ok) {
      throw new Error("Failed to update cart item.");
    }
    router.replace("/order/success");
  };
  return (
    <ContHeader title={"ORDER"}>
      <div>
        <h5 className="text-lg md:text-xl py-3 font-bold">주문정보</h5>
        <OrderTable items={orderList} />

        <h5 className="text-lg md:text-xl py-3 font-bold mt-5">주문자정보</h5>
        <CustomerTable onChange={onChangeInput} orderInfo={orderInfo} />

        <h5 className="text-lg md:text-xl py-3 font-bold mt-5">결제수단</h5>

        <PaymentTable onClick={selectPayment} orderInfo={orderInfo} />

        <h5 className="text-lg md:text-xl py-3 font-bold mt-5">결제정보</h5>

        <SumTable orderList={orderList} />
        <div className="mt-10 mx-auto">
          <OneButton onClick={submitOrder} text={"결제하기"} />
        </div>
      </div>
    </ContHeader>
  );
};

export default OrderPage;
