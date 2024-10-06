import React from "react";
import { CartProduct } from "@/types/Product";
import { ConvertPrice } from "@/utill/convert-price";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface ProductItemProps {
  item: CartProduct;
  checkLists: number[];
  handleCheckList: (checked: boolean, id: number) => void;
  handleQuantity: (
    action: "plus" | "minus",
    id: number,
    quantity: number
  ) => void;
  handleRemove: (id: number) => void;
}

const CartProductItem: React.FC<ProductItemProps> = ({
  item,
  checkLists,
  handleCheckList,
  handleQuantity,
  handleRemove,
}) => {
  const { id, name, image, quantity, provider, price } = item;

  const router = useRouter();

  return (
    <section className="relative lg:px-5 lg:py-5 px-3 py-3 rounded-lg bg-white shadow-neutral-200 shadow-[0_1px_4px_3px_rgba(0,0,0,.1)]">
      <input
        type="checkbox"
        id={`${id}`}
        onChange={(e) => {
          handleCheckList(e.currentTarget.checked, id);
        }}
        checked={checkLists.includes(id)}
        className="absolute top-[10px] left-[10px] w-[20px] h-[20px] cursor-pointer"
      />
      <div className="flex items-center gap-2 md:gap-4 ">
        <div className="flex flex-1 items-center">
          <div
            className="w-[40px] h-[40px] md:w-[96px] md:h-[96px] cursor-pointer"
            onClick={() => router.push(`/detail/${id}`)}
          >
            <img
              src={image}
              alt="product-img"
              className="w-[40px] h-[40px] md:w-[96px] md:h-[96px] object-cover"
            />
          </div>

          <div className="flex-1 ml-5">
            <p className="text-xs sm:text-sm text-gray-500">{provider}</p>
            <p className="w-[90px] text-sm sm:text-base font-semibold overflow-hidden whitespace-nowrap text-ellipsis xs:w-full">
              {name}
            </p>
            <p className="font-semibold text-sm sm:text-base">
              {ConvertPrice(price * quantity)}원
            </p>
            <p className="text-xs sm:text-sm text-gray-400">무료배송</p>
          </div>
        </div>

        <div className="flex items-center">
          <img
            src="/img/icon-minus-line.svg"
            alt="minus"
            className="w-[25px] h-[25px] md:w-[40px] md:h-[40px] border-[1px]  border-neutral-300 p-2 cursor-pointer"
            onClick={() => handleQuantity("minus", id, quantity)}
          />

          <div className="mx-1 md:mx-2">
            <span className="border-[1px] border-neutral-300 w-[25px] h-[25px] md:w-[40px] md:h-[40px] leading-[25px] md:leading-[40px] block text-center">
              {quantity}
            </span>
          </div>
          <img
            src="/img/icon-plus-line.svg"
            alt="plus"
            className="w-[25px] h-[25px] border-[1px]  border-neutral-300 p-2 cursor-pointer md:w-[40px] md:h-[40px]"
            onClick={() => handleQuantity("plus", id, quantity)}
          />
        </div>

        <button className="px-2 py-1 text-xs bg-black text-white text-nowrap rounded-sm sm:text-sm md:px-4 md:py-2 ">
          주문하기
        </button>
      </div>
      <div
        className="ml-4 cursor-pointer absolute right-[5px] top-[5px]"
        onClick={() => handleRemove(id)}
      >
        <Image
          width={16}
          height={16}
          src="/img/icon-delete.svg"
          alt="delete"
          //className="w-6 h-6"
        />
      </div>
    </section>
  );
};

export default CartProductItem;
