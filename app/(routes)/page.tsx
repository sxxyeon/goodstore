import Image from "next/image";
import ProductList from "@/components/product/ProductList";
import Banner from "@/components/banner/Banner";
import HotProd from "@/components/hot/HotProd";
import NewArrival from "@/components/new/NewArrival";
import NewConcert from "@/components/new/NewConcert";
import Celeb from "@/components/celeb/Celeb";
export default function Home() {
  return (
    <div className="main_cont">
      <Banner />
      <HotProd />
      <NewArrival />
      <Celeb />
      <ProductList />
      <NewConcert />
    </div>
  );
}
