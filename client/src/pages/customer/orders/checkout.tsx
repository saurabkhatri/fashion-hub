import { useMutation, useQueryClient } from "@tanstack/react-query";

import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { createOrder } from "@/http";
import useTokenStore from "@/store";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items } = useCart();
  const token = useTokenStore((state) => state.token);
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const totalAmount = items.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const orderItems = items.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    const data = {
      amount: totalAmount,
      items: orderItems,
    };
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      window.location.href = data.data.paymentUrl;
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-10">
        {items.map((cart) => (
          <>
            <CartItem key={cart._id} data={cart} />
            <div className="hidden sm:block" />
          </>
        ))}
        <CartSummary />
      </div>

      {token ? <Button onClick={handleCheckout}>Place Order</Button>:<Button onClick={()=> navigate("/auth/signin")}>Please Sign in </Button>}
    </div>
  );
};

export default CheckoutPage;
