import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex gap-6">
      <Dialog>
        <Sheet>
          <SheetTrigger className="flex items-center gap-3">
            <Menu className="w-5 h-5" />
            <span>MENU</span>
          </SheetTrigger>

          <SheetContent side="left" className="w-56 bg-gray-100">
            <nav className="flex flex-col  justify-center gap-6 mt-20 ">
              <DialogClose asChild>
                <Link
                  to={"/trending"}
                  className={cn(
                    "flex items-center text-lg transition-colors hover:text-foreground/80  text-foreground/60",
                    pathname === "/trending" && "text-blue-700"
                  )}
                >
                  TRENDING
                </Link>
              </DialogClose>

              <DialogClose asChild>
                <Link
                  to={"/men"}
                  className={cn(
                    "flex items-center text-lg transition-colors hover:text-foreground/80  text-foreground/60",
                    pathname === "/men" && "text-blue-700"
                  )}
                >
                  MEN
                </Link>
              </DialogClose>

              <DialogClose asChild>
                <Link
                  to={"/women"}
                  className={cn(
                    "flex items-center text-lg transition-colors hover:text-foreground/80  text-foreground/60",
                    pathname === "/women" && "text-blue-700"
                  )}
                >
                  WOMEN
                </Link>
              </DialogClose>

              <DialogClose asChild>
                <Link
                  to={"/summer"}
                  className={cn(
                    "flex items-center text-lg transition-colors hover:text-foreground/80  text-foreground/60",
                    pathname === "/summer" && "text-blue-700"
                  )}
                >
                  SUMMER
                </Link>
              </DialogClose>

              <DialogClose asChild>
                <Link
                  to={"/winter"}
                  className={cn(
                    "flex items-center text-lg transition-colors hover:text-foreground/80  text-foreground/60",
                    pathname === "/winter" && "text-blue-700"
                  )}
                >
                  WINTER
                </Link>
              </DialogClose>

              <DialogClose asChild>
                <Link
                  to={"/contact"}
                  className={cn(
                    "flex items-center text-lg transition-colors hover:text-foreground/80  text-foreground/60",
                    pathname === "/contact" && "text-blue-700"
                  )}
                >
                  CONTACT
                </Link>
              </DialogClose>
            </nav>
          </SheetContent>
        </Sheet>
      </Dialog>
    </div>
  );
};

export default MobileNav;
