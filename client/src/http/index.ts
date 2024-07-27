import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) =>
  api.post("/customers/login", data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/customers/register", data);

// PRODUCTS
export const getProducts = async () => api.get("/products");
export const getProduct = async (id: string) => api.get(`/products/${id}`);
export const createProduct = async (data: FormData) =>
  api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const editProduct = async (data: {
  product: {
    name: string;
    description: string;
    gender: string;
    category: string;
    stock: string;
    price: string;
  };
  productId: string;
}) => api.put(`/products/${data.productId}`, data.product);
export const deleteProduct = async (data: { productId: string }) =>
  api.delete(`/products/${data.productId}`);

// CATEGORIES
export const createCategory = async (data: FormData) =>
  api.post("/categories", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getCategories = async () => api.get("/categories");

// COLLECTIONS
export const createBillboard = async (data: FormData) =>
  api.post("/billboards", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// COLLECTIONS
export const getMensCollections = async () =>
  api.get(`/billboards?gender=MALE`);
export const getWomensCollections = async () =>
  api.get(`/billboards?gender=FEMALE`);
export const getSummerCollections = async () =>
  api.get(`/billboards?season=SUMMER`);
export const getWinterCollections = async () =>
  api.get(`/billboards?season=WINTER`);

export const createOrder = async (data: {
  amount: number;
  items: { product: string; quantity: number }[];
}) => api.post("/orders", data);

export const updatePayment = async (data: {
  transactionId: string;
  orderId: string;
}) => api.patch("/payments", data);

export const giveFeedback = async (data: {
  ratings: number;
  message: string;
  product: string;
}) => api.post("/feedbacks", data);
