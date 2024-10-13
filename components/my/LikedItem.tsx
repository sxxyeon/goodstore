import { Product } from "@/types/Product";
import React from "react";
import FeatherIcon from "feather-icons-react";

interface Props {
  likedList: Product[];
  onLikedToggle: (id: number) => void;
}
const LikedItem: React.FC<Props> = ({ likedList, onLikedToggle }) => {
  return (
    <>
      {likedList.map((item) => (
        <div key={item.id} className="shadow-custom p-3 rounded-lg relative">
          <div className="flex flex-row items-start gap-3">
            <img src={item?.image} alt="thum" width={80} height={80} />
            <div className="sm:flex flex-col gap-1">
              <span className="text-gray-500 text-sm">{item?.provider}</span>
              <h5 className="font-bold">{item?.name}</h5>
              <span className="font-bold">{item?.price}</span>
            </div>
          </div>
          <button
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onLikedToggle(item.id);
            }}
          >
            <FeatherIcon icon="x" size="18" className={`text-gray-400`} />
          </button>
        </div>
      ))}
    </>
  );
};

export default LikedItem;
