/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Gldqy2Is4u3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Orders() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Cozy Sweater",
      price: 49.99,
      quantity: 2,
      image: "/products/beige_1.png",
    },
    {
      id: 2,
      name: "Skinny Jeans",
      price: 39.99,
      quantity: 1,
      image: "/products/green_2.png",
    },
    {
      id: 3,
      name: "Summer Dress",
      price: 29.99,
      quantity: 1,
      image: "/products/white_1.png",
    },
  ]);
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8">
        <div className="grid gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[80px_1fr_auto] items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="grid gap-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="border rounded-lg p-6 bg-gray-100/40 dark:bg-gray-800/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Total</h3>
            <p className="text-lg font-bold">${total.toFixed(2)}</p>
          </div>
          <Button size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
