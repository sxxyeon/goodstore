import React from "react";
import ButtonList from "./ButtonList";

interface OrderInfo {
  payment: string;
  address: string;
}

interface Props {
  onClick: (params: string) => void;
  orderInfo: OrderInfo;
}

const PaymentTable: React.FC<Props> = ({ orderInfo, onClick }) => {
  return (
    <table className="w-full bg-neutral-100">
      <tbody>
        <tr className="p-2 md:p-7">
          <td className="p-2 md:p-7">
            <ButtonList
              btn1="네이버페이"
              btn2="무통장입금"
              onClick={onClick}
              payment={orderInfo.payment}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PaymentTable;
