// Curated tridoshic starter bundle — client-safe config (no DB import), used by
// the /products starter section and the cart's bundle-discount logic.
// bundlePrice is the advertised kit price = round(ΣMRP × 0.8) of the three items
// (neem-tulsi 649 + kumkumadi 1599 + triphala 899 = 3147 → 2518).
export const STARTER_KIT = {
  name: "Dinacharya Starter Ritual",
  sanskritName: "दिनचर्या",
  blurb:
    "A tridoshic daily ritual to begin with: cleanse, treat and nourish, in three steps suited to every Prakriti.",
  slugs: ["neem-tulsi-face-wash", "kumkumadi-face-serum", "triphala-hair-mask"],
  bundlePrice: 2518,
};
