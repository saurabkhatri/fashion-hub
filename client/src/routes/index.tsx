import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "@/layouts/admin-layout";
import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import AdminHome from "@/pages/admin/admin-home";
import AdminProducts from "@/pages/admin/admin-products";
import AddBillboard from "@/pages/admin/create-billboard";
import AddCategory from "@/pages/admin/create-category";
import AddProduct from "@/pages/admin/create-product";
import EditProductPage from "@/pages/admin/edit-product";
import SigninPage from "@/pages/customer/auth/signin";
import SignupPage from "@/pages/customer/auth/signup";
import Contact from "@/pages/customer/contact";
import CustomerHomePage from "@/pages/customer/home";
import Men from "@/pages/customer/men";
import CheckoutPage from "@/pages/customer/orders/checkout";
import OrdersPage from "@/pages/customer/orders/orders";
import ShippingPage from "@/pages/customer/orders/shipping";
import ProductPage from "@/pages/customer/product";
import Summer from "@/pages/customer/summer";
import Trending from "@/pages/customer/trending";
import Winter from "@/pages/customer/winter";
import Women from "@/pages/customer/women";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "products/:productId/edit",
        element: <EditProductPage />,
      },
      {
        path: "products/create",
        element: <AddProduct />,
      },
      {
        path: "categories/create",
        element: <AddCategory />,
      },
      {
        path: "billboards/create",
        element: <AddBillboard />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "signup", element: <SignupPage /> },
      { path: "signin", element: <SigninPage /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <CustomerHomePage /> },
      { path: "trending", element: <Trending /> },
      { path: "men", element: <Men /> },
      { path: "men/:productId", element: <ProductPage /> },
      { path: "women", element: <Women /> },
      { path: "summer", element: <Summer /> },
      { path: "winter", element: <Winter /> },
      { path: "contact", element: <Contact /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "orders/checkout", element: <CheckoutPage /> },
      { path: "orders/shipping", element: <ShippingPage /> },
    ],
  },
]);

export default router;
