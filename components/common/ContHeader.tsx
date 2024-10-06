import React from "react";
interface Props {
  title: String;
  children: React.ReactNode; // children prop을 정의
}
const ContHeader: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="max-w-[1200px] m-auto px-3 py-20 md:py-32">
      <div className="pb-6">
        <h2 className="text-xl md:text-3xl font-bold text-center py-4 lg:pb-5 lg:pt-0">
          {title}
        </h2>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default ContHeader;
