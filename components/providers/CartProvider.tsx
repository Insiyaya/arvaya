"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type CartLine = {
  slug: string;
  name: string;
  sanskritName?: string | null;
  price: number;
};
export type CartItem = CartLine & { qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (lines: CartLine | CartLine[], qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "arvaya-cart";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  // persist after hydration
  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((lines: CartLine | CartLine[], qty = 1) => {
    const arr = Array.isArray(lines) ? lines : [lines];
    setItems(prev => {
      const next = [...prev];
      for (const line of arr) {
        const idx = next.findIndex(i => i.slug === line.slug);
        if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        else next.push({ slug: line.slug, name: line.name, sanskritName: line.sanskritName ?? null, price: line.price, qty });
      }
      return next;
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems(prev =>
      qty <= 0 ? prev.filter(i => i.slug !== slug) : prev.map(i => (i.slug === slug ? { ...i, qty } : i))
    );
  }, []);

  const remove = useCallback((slug: string) => setItems(prev => prev.filter(i => i.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, ready, add, setQty, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
