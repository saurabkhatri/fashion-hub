export interface IBillboard {
  _id: string;
  image: string;
  title: string;
  description: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  gender: string;
  size: string;
  color: string;
  price: string;
  stock: number;
  category: { _id: number; name: string };
  image: string;
  quantity: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
