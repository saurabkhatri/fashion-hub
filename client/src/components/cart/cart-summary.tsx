"use client";

import { useCart } from "@/hooks/use-cart";

const CartSummary = () => {
  const items = useCart((state) => state.items);

  const totalPrice = items.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div>
      <div className="flex items-center justify-between py-2 ">
        <div className="text-base font-medium text-gray-900">Order total</div>
        <p>NRS {totalPrice}</p>
      </div>
    </div>
  );
};

export default CartSummary;
