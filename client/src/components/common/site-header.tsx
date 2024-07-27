import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

import MainNav from "./main-nav";

const SiteHeader = () => {
  const scrolled = useScroll(50);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-sm transition-all",
        scrolled && "border-b"
      )}
    >
      <div className="container flex h-[60px] items-center justify-between py-4">
        <MainNav />
      </div>
    </header>
  );
};

export default SiteHeader;
