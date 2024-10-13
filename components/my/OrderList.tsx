import React, { useEffect, useState } from "react";
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

  return (
    <>
      <div className="flex flex-col items-center">
        {orderList.length > 0 ? (
          <OrderCont items={orderList} />
        ) : (
          <div className="p-40 text-sm text-gray-400 text-center">
            주문내역이 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default OrderList;
