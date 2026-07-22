"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { Wind, Flame, Droplets, Fingerprint, Leaf, type LucideIcon } from "lucide-react";
import VisionLine from "@/components/VisionLine";

/* ─── Data, the three doshas that compose your Prakriti ──────────────────── */
interface Pillar {
  Icon: LucideIcon;
  number: string;
  term: string;    // Devanagari
  label: string;   // transliteration
  element: string;
  desc: string;
  flipFrom: number; // alternating direction feels dynamic
}

const PILLARS: Pillar[] = [
  {
    Icon: Wind,
    number: "01",
    term: "वात",
    label: "Vata",
    element: "Air + Space",
    desc: "The energy of movement. Vata skin leans dry and delicate.",
    flipFrom: -90,
  },
  {
    Icon: Flame,
    number: "02",
    term: "पित्त",
    label: "Pitta",
    element: "Fire + Water",
    desc: "The energy of transformation. Pitta skin runs warm and reactive.",
    flipFrom: 90,
  },
  {
    Icon: Droplets,
    number: "03",
    term: "कफ",
    label: "Kapha",
    element: "Earth + Water",
    desc: "The energy of structure. Kapha skin is rich, resilient and calm.",
    flipFrom: -90,
  },
  {
    Icon: Fingerprint,
    number: "04",
    term: "प्रकृति",
    label: "Prakriti",
    element: "Your constitution",
    desc: "The balance of all three you're born with, matched by every Arvaya routine.",
    flipFrom: 90,
  },
];

// Progress thresholds, each card gets a 0.20 window, 0.06 gap between them.
// All 4 complete by progress = 0.90, giving breathing room before the sticky releases.
const THRESHOLDS: [number, number][] = [
  [0.03, 0.21],
  [0.27, 0.45],
  [0.51, 0.69],
  [0.75, 0.93],
];

/* ─── Card with back-to-front flip ───────────────────────────────────────── */
// Back (green) and front (white) are separate layers, avoids the "invisible at 90°"
// glitch that happens with a single backface-visibility approach.
function FlipCard({
  pillar,
  scrollYProgress,
  startAt,
  endAt,
}: {
  pillar: Pillar;
  scrollYProgress: MotionValue<number>;
  startAt: number;
  endAt: number;
}) {
  const { Icon, number, term, label, element, desc, flipFrom } = pillar;

  // Green back fades away as the flip begins
  const backOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, startAt - 0.01), startAt + 0.09],
    [1, 0]
  );

  // White front rotates in from its edge direction
  const frontRotate = useTransform(scrollYProgress, [startAt, endAt], [flipFrom, 0]);
  // Derived from rotation (not scroll progress directly) so it can never lag out of
  // sync: fully visible exactly when the flip completes, regardless of scroll speed/jitter.
  const frontOpacity = useTransform(
    frontRotate,
    [flipFrom, flipFrom * 0.6, 0],
    [0, 0.4, 1]
  );

  return (
    // Fixed height so the grid never overflows the viewport regardless of screen size
    <div className="relative h-[196px] sm:h-[224px] lg:h-[248px]">
      {/* ── Back face ─────────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: backOpacity }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2F5233] to-[#1A3A1F]
                   flex flex-col items-center justify-center gap-2
                   shadow-[0_4px_20px_rgba(47,82,51,0.22)] pointer-events-none"
      >
        <Leaf size={32} className="opacity-20 text-[#FAF7F0]" />
        <div className="w-8 h-px bg-[#FAF7F0]/10 rounded" />
      </motion.div>

      {/* ── Front face ────────────────────────────────────────────────────── */}
      <div style={{ perspective: "1400px" }} className="absolute inset-0">
        <motion.div
          style={{ rotateY: frontRotate, opacity: frontOpacity }}
          className="w-full h-full rounded-2xl bg-white border border-[#A8C09A]/25
                     p-3.5 sm:p-5 flex flex-col overflow-hidden
                     shadow-[0_4px_20px_rgba(47,82,51,0.08)]
                     hover:shadow-[0_8px_32px_rgba(47,82,51,0.15)] transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-1.5 sm:mb-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#A8C09A]/20 flex items-center justify-center shrink-0">
              <Icon size={15} className="text-[#2F5233] sm:hidden" />
              <Icon size={18} className="text-[#2F5233] hidden sm:block" />
            </div>
            <span className="font-heading text-[10px] sm:text-xs font-medium text-[#A8C09A] tracking-widest">
              {number}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-0.5 sm:mb-1">
            <span className="font-devanagari text-2xl sm:text-3xl lg:text-[2rem] text-[#2F5233] leading-none">
              {term}
            </span>
            <span className="font-heading text-[13px] sm:text-base lg:text-lg text-[#2C2C2C]">
              {label}
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-widest text-[#4A7C59] mb-1 sm:mb-2">
            {element}
          </p>
          <p className="text-[11px] sm:text-xs lg:text-sm text-[#6B5D4F] leading-relaxed line-clamp-3 flex-1">
            {desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────────────────────────── */
export default function WhyUsPinned() {
  const containerRef = useRef<HTMLDivElement>(null);

  // offset ["start start", "end end"]:
  //   progress 0 = container-top at viewport-top (sticky kicks in)
  //   progress 1 = container-bottom at viewport-bottom (sticky releases)
  // With height 380vh: extra scroll = 280vh, plenty for 4 cards.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Heading drifts up + gently fades as cards reveal, shifts focus to cards
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [1, 0.85, 0.72, 0.5]
  );

  // Parallax orbs
  const orbX1 = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const orbX2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    /* 380vh = sticky lasts ~280vh of real scroll, comfortably reveals all 4 cards */
    <div ref={containerRef} style={{ height: "380vh" }} className="relative">
      <div
        className="sticky top-0 h-screen overflow-hidden bg-gradient-to-br from-[#F5EFE0] via-[#FAF7F0] to-[#F5EFE0]
                   flex flex-col items-center justify-center"
      >
        {/* Parallax blobs */}
        <motion.div
          style={{ x: orbX1 }}
          className="absolute -top-40 -right-40 w-[540px] h-[540px] rounded-full
                     bg-[#A8C09A]/12 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ x: orbX2 }}
          className="absolute -bottom-40 -left-40 w-[460px] h-[460px] rounded-full
                     bg-[#D4A24C]/8 blur-3xl pointer-events-none"
        />

        <div
          className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10
                     flex flex-col items-center gap-5 sm:gap-7 lg:gap-9"
        >
          {/* Section heading */}
          <motion.div
            style={{ y: headingY, opacity: headingOpacity }}
            className="text-center"
          >
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-2">
              Know Your Nature
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#2F5233] mb-2.5 sm:mb-3">
              Three energies,
              <br />
              one unique <span className="font-devanagari">प्रकृति</span>.
            </h2>
            <VisionLine className="font-heading text-lg sm:text-xl md:text-2xl font-medium text-[#2C2C2C] max-w-xl mx-auto leading-snug" />
          </motion.div>

          {/* 4-card grid, fixed heights so it always fits within any viewport */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
            {PILLARS.map((pillar, i) => (
              <FlipCard
                key={pillar.label}
                pillar={pillar}
                scrollYProgress={scrollYProgress}
                startAt={THRESHOLDS[i][0]}
                endAt={THRESHOLDS[i][1]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
