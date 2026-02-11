import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),

  addOrUpdateProduct: (product) =>
    set((state) => {
      const exists = state.products.find((p) => p.id === product.id);

      if (exists) {
        return {
          products: state.products.map((p) =>
            p.id === product.id
              ? { ...p, cantidad: p.cantidad + product.cantidad }
              : p,
          ),
        };
      }

      return {
        products: [...state.products, product],
      };
    }),

  updateQuantity: (productId, cantidad) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, cantidad } : p,
      ),
    })),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),

  clearCart: () =>
    set({
      products: [],
    }),

  getTotal: () => {
    const products = get().products;
    return products.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  },

  getItemCount: () => {
    return get().products.reduce((acc, product) => acc + 1, 0);
  },
}));
