import { Outlet } from "react-router-dom";

import SiteFooter from "@/components/common/site-footer";
import SiteHeader from "@/components/common/site-header";

const MainLayout = () => {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
};

export default MainLayout;
