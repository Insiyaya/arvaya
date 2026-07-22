export type Dosha = "vata" | "pitta" | "kapha";

export interface QuizAnswers {
  age?: string;
  gender?: string;
  "city-type"?: string;
  "body-frame"?: string;
  "skin-tendency"?: string;
  "energy-pattern"?: string;
  "skin-concern"?: string;
  "skin-type"?: string;
  "routine-complexity"?: string;
  "skin-exposure"?: string[];
  "hair-concern"?: string;
  "hair-type"?: string;
  "wash-frequency"?: string;
  "chemical-treatments"?: string;
  diet?: string;
  sleep?: string;
}

export interface DoshaResult {
  primary: Dosha;
  secondary: Dosha | null;
  scores: Record<Dosha, number>;
  label: string;
  description: string;
}

export interface ProductRecommendation {
  productId: string;
  reason: string;
  priority: number;
}

const DOSHA_FROM_ANSWER: Record<string, Dosha> = {
  "lean-variable": "vata",
  "medium-athletic": "pitta",
  "broad-sturdy": "kapha",
  "dry-rough": "vata",
  "sensitive-warm": "pitta",
  "oily-thick": "kapha",
  "restless-creative": "vata",
  "focused-intense": "pitta",
  "steady-calm": "kapha",
};

const DOSHA_POINTS: Record<string, number> = {
  "body-frame": 3,
  "skin-tendency": 2,
  "energy-pattern": 2,
};

const DOSHA_DESCRIPTIONS: Record<Dosha, { label: string; description: string }> = {
  vata: {
    label: "Vata (वात)",
    description:
      "Vata (वात), the energy of movement, governs circulation, elimination, and the nervous system. Vata-dominant individuals tend toward dry skin, variable energy, and creative minds. Your skin and hair benefit most from nourishing, grounding, and warming herbs.",
  },
  pitta: {
    label: "Pitta (पित्त)",
    description:
      "Pitta (पित्त), the energy of transformation, governs digestion, metabolism, and intelligence. Pitta-dominant individuals tend toward sensitive skin, strong drive, and sharp minds. Your skin and hair benefit most from cooling, soothing, and anti-inflammatory herbs.",
  },
  kapha: {
    label: "Kapha (कफ)",
    description:
      "Kapha (कफ), the energy of structure, governs stability, lubrication, and immunity. Kapha-dominant individuals tend toward oily skin, steady energy, and nurturing minds. Your skin and hair benefit most from clarifying, stimulating, and lightening herbs.",
  },
};

export function calculateDosha(answers: QuizAnswers): DoshaResult {
  const scores: Record<Dosha, number> = { vata: 0, pitta: 0, kapha: 0 };

  for (const [questionId, points] of Object.entries(DOSHA_POINTS)) {
    const answer = answers[questionId as keyof QuizAnswers] as string;
    if (!answer) continue;
    const dosha = DOSHA_FROM_ANSWER[answer];
    if (dosha) scores[dosha] += points;
  }

  // Supplementary signals from skin and hair concerns
  if (answers["skin-concern"] === "dryness" || answers["skin-concern"] === "aging") scores.vata += 1;
  if (answers["skin-concern"] === "sensitivity" || answers["skin-concern"] === "pigmentation") scores.pitta += 1;
  if (answers["skin-concern"] === "acne" || answers["skin-concern"] === "dullness") scores.kapha += 1;

  if (answers["skin-type"] === "dry") scores.vata += 1;
  if (answers["skin-type"] === "oily") scores.kapha += 1;
  if (answers["skin-type"] === "combination") { scores.pitta += 0.5; scores.kapha += 0.5; }

  if (answers.sleep === "poor") scores.vata += 1;

  const sorted = (Object.entries(scores) as [Dosha, number][]).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1][1] >= sorted[0][1] * 0.6 ? sorted[1][0] : null;

  const labelStr = secondary
    ? `${DOSHA_DESCRIPTIONS[primary].label}-${DOSHA_DESCRIPTIONS[secondary].label}`
    : DOSHA_DESCRIPTIONS[primary].label;

  return {
    primary,
    secondary,
    scores,
    label: labelStr,
    description: DOSHA_DESCRIPTIONS[primary].description,
  };
}

export function mapConcernsToProducts(
  answers: QuizAnswers,
  doshaResult: DoshaResult
): ProductRecommendation[] {
  const recs: ProductRecommendation[] = [];
  const skinConcern = answers["skin-concern"];
  const hairConcern = answers["hair-concern"];
  const oily = answers["skin-type"] === "oily";
  const dosha = doshaResult.primary;
  const add = (productId: string, priority: number) =>
    recs.push({ productId, reason: generateReason(productId, answers, doshaResult), priority });

  // Skin recommendations
  if (skinConcern === "dullness" || skinConcern === "pigmentation") add("kumkumadi-face-serum", 1);
  if (skinConcern === "pigmentation") add("nalpamaradi-face-oil", 2);
  if (skinConcern === "acne" || skinConcern === "oiliness" || oily) add("neem-tulsi-face-wash", 1);
  if (skinConcern === "acne" || skinConcern === "oiliness" || oily) add("chandanadi-ubtan", 2);
  if (skinConcern === "aging" || skinConcern === "dryness" || dosha === "vata") add("ashwagandha-night-cream", 2);
  if (skinConcern === "sensitivity" || dosha === "pitta") add("rose-sandalwood-toner", 2);

  // Ensure at least one skin product
  const SKIN = ["kumkumadi-face-serum", "nalpamaradi-face-oil", "neem-tulsi-face-wash", "chandanadi-ubtan", "ashwagandha-night-cream", "rose-sandalwood-toner"];
  if (!recs.some(r => SKIN.includes(r.productId))) add("kumkumadi-face-serum", 3);

  // Hair recommendations
  if (hairConcern === "hair-fall" || hairConcern === "thinning" || hairConcern === "scalp-issues") add("bhringraj-hair-oil", 1);
  if (hairConcern === "greying" || hairConcern === "thinning") add("amla-brahmi-hair-tonic", 1);
  if (hairConcern === "dandruff" || hairConcern === "scalp-issues") add("japapushpa-hair-cleanser", 2);
  if (hairConcern === "dandruff" || hairConcern === "dryness" || hairConcern === "damage") add("triphala-hair-mask", 2);

  // Ensure at least one hair product
  const HAIR = ["bhringraj-hair-oil", "amla-brahmi-hair-tonic", "japapushpa-hair-cleanser", "triphala-hair-mask"];
  if (!recs.some(r => HAIR.includes(r.productId))) add("bhringraj-hair-oil", 3);

  // Deduplicate and sort by priority
  const seen = new Set<string>();
  return recs
    .filter(r => { if (seen.has(r.productId)) return false; seen.add(r.productId); return true; })
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5);
}

function generateReason(productId: string, answers: QuizAnswers, doshaResult: DoshaResult): string {
  const dosha = doshaResult.primary;
  const secondary = doshaResult.secondary;
  const doshaLabel = secondary ? `${dosha}-${secondary}` : dosha;
  const skinConcern = answers["skin-concern"] || "general skin health";
  const hairConcern = answers["hair-concern"] || "general hair health";
  const hasAc = (answers["skin-exposure"] as string[] | undefined)?.includes("ac");
  const hasPollution = (answers["skin-exposure"] as string[] | undefined)?.includes("pollution");

  const reasons: Record<string, string> = {
    "kumkumadi-face-serum": `Selected for your ${doshaLabel}-dominant profile and concern about ${skinConcern}. Kumkumadi's 16 classical herbs work with your Prakriti, saffron and sandalwood are especially beneficial for ${dosha === "pitta" ? "cooling reactive, pigmentation-prone Pitta skin" : "brightening dull Vata-type skin"}.`,
    "neem-tulsi-face-wash": `Chosen for your ${skinConcern.includes("acne") ? "acne-prone skin" : "oily skin tendency"}. Neem's clarifying and Tulsi's balancing properties address ${dosha === "kapha" ? "Kapha-type congestion and enlarged pores" : "Pitta-type inflammation and breakouts"} without stripping moisture.`,
    "ashwagandha-night-cream": `Recommended for your ${doshaLabel} Prakriti and concern about ${skinConcern}. Ashwagandha's adaptogenic properties${hasAc ? ", combined with AC dehydration your skin faces," : ""} make overnight deep nourishment essential for ${dosha}-type skin.`,
    "rose-sandalwood-toner": `Selected for your sensitive ${dosha === "pitta" ? "Pitta" : doshaLabel} skin${hasPollution ? " and daily pollution exposure" : ""}. Rose water and sandalwood hydrosols have a classically cooling, Pitta-soothing effect that prepares your skin for the next steps in your routine.`,
    "bhringraj-hair-oil": `Chosen for your concern about ${hairConcern}. Bhringraj, Keshraj, the 'ruler of hair' in Ayurvedic texts, works on the ${dosha === "vata" ? "root cause of Vata-type hair fall: a dry, undernourished scalp" : dosha === "pitta" ? "Pitta-driven inflammation that triggers excessive shedding" : "Kapha-type scalp buildup that blocks follicles"}.`,
    "triphala-hair-mask": `Triphala is tridoshic, it works for all constitutions. For your ${hairConcern} concern, the weekly mask's Amalaki (vitamin C-rich Amla) and Shikakai provide deep cleansing and strengthening that daily shampoo cannot.`,
    "nalpamaradi-face-oil": `Selected to target ${skinConcern} on your ${doshaLabel} skin. The classical Nalpamaradi oil, with Manjistha and turmeric, is traditionally used to even tone and soften tan${hasPollution ? ", helpful against daily pollution" : ""}.`,
    "chandanadi-ubtan": `Chosen for your ${skinConcern.includes("acne") ? "breakout-prone" : "oily"} skin. This Sandalwood ubtan draws out excess oil and calms congestion, a weekly clarifying ritual for ${dosha === "kapha" ? "Kapha" : doshaLabel} skin.`,
    "amla-brahmi-hair-tonic": `Chosen for your concern about ${hairConcern}. Amalaki and Brahmi are traditionally used to nourish the roots and support natural pigment, especially helpful for ${dosha === "pitta" ? "Pitta-driven premature greying" : "thinning and a stressed, Vata-type scalp"}.`,
    "japapushpa-hair-cleanser": `A gentle, sulphate-free wash for your ${hairConcern} concern. Hibiscus and Reetha clear flakes and balance ${dosha === "kapha" ? "an oily, Kapha-prone scalp" : "excess scalp oil"} without stripping.`,
  };

  return reasons[productId] || `Recommended based on your ${doshaLabel} Prakriti and your skin/hair concerns.`;
}

export function getKitBundlePrice(productIds: string[], products: Array<{ id: string; slug: string; price: number; mrp: number }>): { bundlePrice: number; totalMrp: number; savings: number } {
  const selected = products.filter(p => productIds.includes(p.slug));
  const totalMrp = selected.reduce((sum, p) => sum + p.mrp, 0);
  const bundlePrice = Math.round(totalMrp * 0.8); // 20% bundle discount
  return { bundlePrice, totalMrp, savings: totalMrp - bundlePrice };
}
