import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { IProduct } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
  items: IProduct[];
  addItem: (data: IProduct) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: IProduct) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item._id === data._id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item._id === data._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success("Item quantity updated.");
        } else {
          set({ items: [...get().items, { ...data, quantity: 1 }] });
          toast.success("Item added to cart.");
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item._id !== id) });
        toast.success("Item removed from the cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
