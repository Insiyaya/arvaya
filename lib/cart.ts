import { PRODUCTS, STARTER_KIT } from "@/lib/dummy-data";
import { getKitBundlePrice } from "@/lib/quiz-engine";

type Line = { slug: string; qty: number };

/**
 * If every product of a known bundle (the Dinacharya Starter Ritual) is present
 * in the cart, apply the advertised bundle price for each complete set. The
 * discount is the difference between the items' listed prices and the bundle
 * price (round(ΣMRP × 0.8)), multiplied by the number of complete sets.
 */
export function bundleDiscount(items: Line[]): { amount: number; sets: number; label: string } {
  const label = STARTER_KIT.name;
  const kit = PRODUCTS.filter(p => STARTER_KIT.slugs.includes(p.slug));
  if (kit.length !== STARTER_KIT.slugs.length) return { amount: 0, sets: 0, label };

  const perSetListed = kit.reduce((s, p) => s + p.price, 0);
  const { bundlePrice } = getKitBundlePrice(STARTER_KIT.slugs, kit);
  const perSet = Math.max(0, perSetListed - bundlePrice);

  const sets = Math.min(...STARTER_KIT.slugs.map(slug => items.find(i => i.slug === slug)?.qty ?? 0));
  return { amount: perSet * sets, sets, label };
}
