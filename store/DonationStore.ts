import { Dog } from "@/components/Card/Dog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItemProps {
  id: string;
  quantity: number;
  dog: Dog;
}

interface DonationStore {
  cartItems: CartItemProps[];
  getQuantity: (id: string) => number;
  getCartItems: () => CartItemProps[];
  increaseQuantity: (id: string, dog: Dog) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useDonationStore = create<DonationStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      getQuantity: (id) =>
        get().cartItems.find((item) => item.id === id)?.quantity || 0,

      getCartItems: () => get().cartItems,

      increaseQuantity: (id, dog) => {
        const existing = get().cartItems.find((item) => item.id === id);
        if (!existing) {
          set((state) => ({
            cartItems: [...state.cartItems, { id, quantity: 1, dog }],
          }));
        } else {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + 1, dog }
                : item
            ),
          }));
        }
      },

      decreaseQuantity: (id) => {
        const currentItem = get().cartItems.find((item) => item.id === id);
        if (currentItem && currentItem.quantity === 1) {
          set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
          }));
        } else {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          }));
        }
      },

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "donation-cart", // ključ u localStorage
    }
  )
);
