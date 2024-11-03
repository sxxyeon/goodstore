import Link from "next/link";
import { Product } from "@/types/Product";
import { ConvertPrice } from "@/utill/convert-price";
import { Icon } from "@iconify/react";
import Image from "next/image";
interface ProductItemProps {
  item: Product;
  onLikeToggle: (id: number) => void;
}
const ProductItem: React.FC<ProductItemProps> = ({ item, onLikeToggle }) => {
  const { id, name, image, provider, price, isLiked } = item;

  return (
    <div className="relative">
      <Link href={`/detail/${id}`}>
        <div className="block overflow-hidden border-[1px] border-neutral-200 w-full pb-[100%] relative bg-neutral-200 mb-2">
          <Image
            src={image}
            alt="product"
            fill
            placeholder="blur"
            blurDataURL={image}
          />
        </div>
      </Link>
      <button
        className="absolute bottom-2 right-2 "
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onLikeToggle(id);
        }}
      >
        {isLiked ? (
          <Icon
            icon="mdi:cards-heart"
            className="text-[#f99076]"
            width={24}
            height={24}
          />
        ) : (
          <Icon
            icon="mdi:cards-heart-outline"
            className="text-[#f99076]"
            width={24}
            height={24}
          />
        )}
      </button>

      <p className="text-xs text-gray-500">{provider}</p>
      <p className="font-bold">{name}</p>
      <div>
        <span className="font-bold">{ConvertPrice(price)}</span>
        <span>원</span>
      </div>
    </div>
  );
};

export default ProductItem;
