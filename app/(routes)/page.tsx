import Image from "next/image";
import ProductList from "@/components/product/ProductList";
import Banner from "@/components/banner/Banner";
import HotProd from "@/components/hot/HotProd";
export default function Home() {
  return (
    <div>
      <Banner />
      <HotProd />
      <ProductList />
      
    </div>
  );
}
