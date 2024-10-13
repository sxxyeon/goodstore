import { Product } from "@/types/Product";

export const handleLiked = async (
  id: number,
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  fetchData: () => void
) => {
  const updatedItemIndex = products.findIndex((item) => item.id === id);

  if (updatedItemIndex === -1) {
    console.error("아이템을 찾을 수 없습니다.");
    return;
  }

  const updatedProducts = [...products];

  updatedProducts[updatedItemIndex] = {
    ...updatedProducts[updatedItemIndex],
    isLiked: !updatedProducts[updatedItemIndex].isLiked,
  };

  setProducts(updatedProducts);

  await fetch(`${process.env.NEXT_PUBLIC_JSON}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedProducts[updatedItemIndex]),
  });
  fetchData();
};
