import { Link } from "react-router-dom";

import OrdersCart from "../orders-cart";
import MobileNav from "./mobile-nav";

import { Button } from "@/components/ui/button";
import useTokenStore from "@/store";

const MainNav = () => {
  const { token, setToken } = useTokenStore();
  return (
    <div className="w-full flex items-center justify-between gap-6 md:gap-10 sm:px-8">
      <MobileNav />

      <div className="flex items-center gap-4">
        {!token ? (
          <Link to="/auth/signin">
            <Button>SIGN IN</Button>
          </Link>
        ) : (
          <Button onClick={() => setToken("")}>Sign out</Button>
        )}

        <OrdersCart />
      </div>
    </div>
  );
};

export default MainNav;
