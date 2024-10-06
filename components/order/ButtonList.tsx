import React from "react";
interface Props {
  btn1: string;
  btn2: string;
  onClick: (name: string) => void;
  payment: string;
}
const ButtonList: React.FC<Props> = ({ btn1, btn2, onClick, payment }) => {
  return (
    <ul className="flex flex-row justify-center w-full gap-2 text-center">
      <li
        className={`border-[1px] border-gray-300 p-4 w-full ${
          payment === "naver" ? "bg-black text-white" : "bg-white "
        }`}
      >
        <button className="text-sm" onClick={() => onClick(btn1)}>
          {btn1}
        </button>
      </li>
      <li
        className={`border-[1px] border-gray-300 p-4 w-full ${
          payment === "transfer" ? "bg-black text-white" : "bg-white"
        }`}
      >
        <button className="text-sm" onClick={() => onClick(btn2)}>
          {btn2}
        </button>
      </li>
    </ul>
  );
};

export default ButtonList;
