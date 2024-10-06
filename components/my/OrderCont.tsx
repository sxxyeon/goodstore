import useIsMobile from "@/hooks/useIsMobile";
import React, { useState } from "react";
import { Order } from "@/types/Product";
import OrderList from "./OrderList";

interface Props {
  items: Order[];
}

const OrderCont: React.FC<Props> = ({ items }) => {
  const isMobile = useIsMobile();
  // 주문 정보 확장 여부를 제어하는 상태 (각 아이템별로)
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    if (expandedItem === id) {
      setExpandedItem(null); // 이미 열려있으면 닫기
    } else {
      setExpandedItem(id); // 열려있지 않으면 열기
    }
  };
  console.log(items);
  return (
    <div className="w-full flex flex-col gap-5">
      {items.map((item) => {
        const isExpanded = expandedItem === item.id; // 현재 항목이 열려 있는지 확인
        return (
          <div
            key={item.id}
            className="panel rounded-md shadow-custom box-border overflow-hidden"
          >
            <div className="flex flex-row  gap-5 p-3 box-border bg-gray-100">
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden flex-1 ${
                  isExpanded ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <div className="flex-1 text-gray-500 text-sm flex flex-col gap-1">
                  <div className="id">
                    <span>주문번호 : </span>
                    <span>{item?.id}</span>
                  </div>
                  <div className="customer">
                    <span>주문자 : </span>
                    <span>{item?.customer}</span>
                  </div>
                  <div className="payment">
                    <span>결제수단 : </span>
                    <span>
                      {item?.payment === "naver"
                        ? "네이버 페이"
                        : "무통장 입금"}
                    </span>
                  </div>
                  <div className="address">
                    <span>배송지 : </span>
                    <span>{item?.address}</span>
                  </div>
                </div>
              </div>
              <div className="date">{item?.date}</div>
              {/* Toggle 버튼 */}
              <button className="h-fit" onClick={() => toggleExpand(item.id)}>
                {isExpanded ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <polyline points="6 15 12 9 18 15" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </button>
            </div>

            <ul className="flex flex-col">
              {item?.orderList?.map((order) => (
                <li
                  key={order.id}
                  className="flex flex-row gap-5 border-b-[1px] p-3"
                >
                  <img src={order.image} alt={order.name} width={60} />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      {order.provider}
                    </span>
                    <span>{order.name}</span>

                    <span className="font-bold">{order.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCont;
