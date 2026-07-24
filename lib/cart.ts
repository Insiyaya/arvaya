import { STARTER_KIT } from "@/lib/starter-kit";

type Line = { slug: string; qty: number; price: number };

/**
 * If every product of the Dinacharya Starter Ritual is present in the cart, apply
 * the advertised bundle price for each complete set. The discount is the
 * difference between the items' listed prices and the fixed bundle price
 * (STARTER_KIT.bundlePrice), multiplied by the number of complete sets in cart.
 *
 * Uses the prices carried on the cart lines themselves, so it stays a pure
 * client-safe function with no product-catalogue import.
 */
export function bundleDiscount(items: Line[]): { amount: number; sets: number; label: string } {
  const label = STARTER_KIT.name;
  const kitLines = STARTER_KIT.slugs.map(slug => items.find(i => i.slug === slug));
  if (kitLines.some(l => !l)) return { amount: 0, sets: 0, label };

  const perSetListed = kitLines.reduce((sum, l) => sum + l!.price, 0);
  const perSet = Math.max(0, perSetListed - STARTER_KIT.bundlePrice);
  const sets = Math.min(...kitLines.map(l => l!.qty));

  return { amount: perSet * sets, sets, label };
}
