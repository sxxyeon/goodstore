import React from "react";

interface Props {
  type?: string;
  text: string;
  onClick: () => void;
}

const OneButton: React.FC<Props> = ({ type, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`block w-full md:max-w-[500px] m-auto p-4 ${
        type === "light" ? " bg-white border-[1px]" : "bg-black text-white"
      }`}
    >
      {text}
    </button>
  );
};

export default OneButton;
