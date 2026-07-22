"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart, type CartLine } from "@/components/providers/CartProvider";

export default function AddToCartButton({
  items,
  label = "Add to Cart",
  addedLabel = "Added",
  className = "",
  iconSize = 16,
}: {
  items: CartLine | CartLine[];
  label?: string;
  addedLabel?: string;
  className?: string;
  iconSize?: number;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        add(items);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
      className={className}
    >
      {added ? <Check size={iconSize} /> : <ShoppingCart size={iconSize} />}
      {added ? addedLabel : label}
    </button>
  );
}
