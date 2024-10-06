"use client";
import React, { useEffect, useState } from "react";
import ContHeader from "../common/ContHeader";
import OrderTable from "../order/OrderTable";
import OrderCont from "./OrderCont";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/orders`);
    const json = await resp.json();
    setOrderList(json);
  };
  console.log(orderList);

  return (
    <>
      <div className="flex flex-col items-center">
        {/* <h5 className="text-lg font-bold py-10">주문내역</h5> */}
        <OrderCont items={orderList} />
      </div>
    </>
  );
};

export default OrderList;
