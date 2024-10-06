import useIsMobile from "@/hooks/useIsMobile";
import React from "react";
import { CartProduct } from "@/types/Product";

interface Props {
  items: CartProduct | CartProduct[];
}

const OrderTable: React.FC<Props> = ({ items }) => {
  const arrayItems: CartProduct[] = Array.isArray(items) ? items : [items];
  const isMobile = useIsMobile();
  return (
    <table className="w-full border-y-[1px]">
      {!isMobile && (
        <>
          <colgroup>
            <col width="50%" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="">
            <tr className="bg-neutral-100">
              <th className="font-medium p-2 md:p-7">상품</th>
              <th className="font-medium p-2 md:p-7">수량</th>
              <th className="font-medium p-2 md:p-7">배송비</th>
              <th className="font-medium p-2 md:p-7">주문금액</th>
            </tr>
          </thead>
        </>
      )}

      <tbody>
        {arrayItems.map((item) => (
          <tr key={item.id} className="border-b-[1px]">
            <td className={`${isMobile ? "" : "border-r-[1px]"} p-2 md:p-7`}>
              <div className="flex gap-3 items-start">
                <img src={item?.image} alt="thum" width={80} height={80} />
                <div className="sm:flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {item?.provider}
                  </span>
                  <h5 className="font-bold">{item?.name}</h5>
                  {isMobile && (
                    <>
                      <span className="text-xs block">{item?.quantity}개</span>
                      <span className="font-bold block">
                        {item?.price * item?.quantity} 원
                      </span>
                    </>
                  )}
                </div>
              </div>
            </td>
            {!isMobile && (
              <>
                <td className="border-r-[1px]  p-2 md:p-7 text-center">
                  {item?.quantity}
                </td>
                <td className="border-r-[1px] p-2 md:p-7 text-center">
                  무료배송
                </td>
                <td className="text-center font-bold">
                  {item?.price * item?.quantity}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
