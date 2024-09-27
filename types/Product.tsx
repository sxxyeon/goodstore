export interface Product {
  id: number;
  cat: string;
  name: string;
  image: string;
  provider: string;
  price: number;
}

export interface CartProduct {
  id: number;
  name: string;
  image: string;
  quantity: number;
  provider: string;
  price: number;
}
