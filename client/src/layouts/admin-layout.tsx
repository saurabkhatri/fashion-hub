import { Navigate, Outlet } from "react-router-dom";

import SiteFooter from "@/components/common/site-footer";
import useTokenStore from "@/store";

const AdminLayout = () => {
  const { token } = useTokenStore((state) => state);

  if (token === "") {
    return <Navigate to={"/auth/signin"} replace />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-10">
      <Outlet />
      <SiteFooter />
    </main>
  );
};

export default AdminLayout;
