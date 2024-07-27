import CartItem from "@/components/cart/cart-item";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const cart = useCart();
  const navigate = useNavigate();

  return (
    <div>
      {cart.items.map((cart) => (
        <CartItem key={cart._id} data={cart} />
      ))}

      {cart.items.length > 0 && (
        <div className="space-y-4">
          <Button
            className="w-full"
            variant="destructive"
            onClick={cart.removeAll}
          >
            Clear Cart
          </Button>

          <Button
            className="w-full"
            onClick={() => navigate("/orders/checkout")}
          >
            Proceed to checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
