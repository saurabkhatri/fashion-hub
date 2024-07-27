"use client";

import { ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";

import { useCart } from "@/hooks/use-cart";
import { IProduct } from "@/types";
import { useNavigate } from "react-router-dom";
import IconButton from "./icon-button";

interface ProductCardProps {
  data: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/men/${data._id}`);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <img
          src={data?.image}
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-end">
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} />}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <p>{data.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
