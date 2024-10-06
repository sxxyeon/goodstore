import React from "react";
import { CartProduct } from "@/types/Product";
interface Props {
  orderList: CartProduct | CartProduct[];
}

const SumTable: React.FC<Props> = ({ orderList }) => {
  const arrayItems: CartProduct[] = Array.isArray(orderList)
    ? orderList
    : [orderList];
  return (
    <table className="w-full bg-neutral-100">
      <tbody>
        <tr>
          <td colSpan={4}>
            <div className="flex flex-row justify-around md:justify-center gap-5 md:gap-10 items-center p-3 md:p-7 text-center">
              <div className="flex flex-col gap-1 md:gap-3 md:items-center md:flex-row">
                <span className="h-6">상품 합계</span>
                <span className="text-lg font-bold">
                  {arrayItems.reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                  }, 0)}
                  원
                </span>
              </div>
              <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-center leading-5">
                +
              </span>
              <div className="flex flex-col gap-1 md:gap-3 items-center md:flex-row">
                <span className="h-6">배송비</span>
                <span className="text-lg font-bold">0원</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-gray-400 text-white text-center leading-5">
                =
              </span>
              <div className="flex flex-col gap-1 md:gap-3 items-center md:flex-row">
                <span className="h-6">총 합계</span>
                <span className="text-lg font-bold text-red-500">
                  {arrayItems.reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                  }, 0)}
                  원
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SumTable;
