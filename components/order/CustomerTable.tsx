import React from "react";

interface OrderInfo {
  customer: string;
  address: string;
}

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  orderInfo: OrderInfo;
}
const CustomerTable: React.FC<Props> = ({ onChange, orderInfo }) => {
  return (
    <table className="w-full border-y-[1px]">
      <colgroup>
        <col width="30%" />
        <col />
      </colgroup>
      <tbody>
        <tr className=" align-text-bottom">
          <th className="p-2 md:p-7 font-normal bg-neutral-100">
            주문하시는 분
          </th>
          <td className="p-2 md:p-7">
            <input
              name="customer"
              type="text"
              className="border-[1px] px-2 py-1"
              onChange={onChange}
              value={orderInfo.customer}
            />
          </td>
        </tr>
        <tr className="p-2 md:p-7 border-t-[1px]">
          <th className="p-2 md:p-7 font-normal  bg-neutral-100">주소</th>
          <td className="p-2 md:p-7">
            <input
              name="address"
              type="text"
              className="border-[1px] px-2 py-1 w-full"
              onChange={onChange}
              value={orderInfo.address}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CustomerTable;
