import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";
import CartItem from "./cart/cart-item";
import CartSummary from "./cart/cart-summary";
import { Dialog, DialogClose } from "./ui/dialog";

const OrdersCart = () => {
  const cart = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <Dialog>
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 right-0 text-xs font-medium p-2 rounded-full">
                {cart.items.length}
              </span>
            </Button>
          </SheetTrigger>

          <SheetContent className="w-full py-10">
            {cart.items.map((cart) => (
              <CartItem key={cart._id} data={cart} />
            ))}
            <CartSummary />

            {cart.items.length > 0 && (
              <div className="space-y-4">
                <DialogClose asChild>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={cart.removeAll}
                  >
                    Clear Cart
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="w-full"
                    onClick={() => navigate("/orders/checkout")}
                  >
                    Proceed to checkout
                  </Button>
                </DialogClose>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </Dialog>
    </div>
  );
};

export default OrdersCart;
