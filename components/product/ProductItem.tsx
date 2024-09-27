import React from "react";
import Link from "next/link";
import { Product } from "@/types/Product";
import { ConvertPrice } from "@/utill/convert-price";
import Image from "next/image";
interface ProductItemProps {
  item: Product;
}
const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { id, name, image, provider, price } = item;
  return (
    <div>
      <Link href={`/detail/${id}`}>
        <div className="block rounded-md overflow-hidden border-[1px] border-neutral-200 w-full pb-[100%] relative bg-neutral-200">
          <Image
            src={image}
            alt="product"
            fill
            placeholder="blur"
            blurDataURL={image}
          />
        </div>
      </Link>
      <p className="text-sm text-gray-500">{provider}</p>
      <p className="font-bold">{name}</p>
      <div>
        <span className="font-bold text-lg">{ConvertPrice(price)}</span>
        <span>원</span>
      </div>
    </div>
  );
};

export default ProductItem;
