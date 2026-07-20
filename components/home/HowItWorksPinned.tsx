"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Take the Prakriti Quiz",
    desc: "15 questions covering your constitution, skin, hair, lifestyle, and climate. Takes 3 minutes.",
    icon: "📋",
  },
  {
    number: "02",
    title: "Get Your Kit",
    desc: "Dr. Husain's algorithm maps your answers to a 3–5 product routine with a personalised reason for each.",
    icon: "🎁",
  },
  {
    number: "03",
    title: "See Real Results",
    desc: "Ayurvedic formulations work with your body's natural rhythms. Most customers see visible changes in 4–8 weeks.",
    icon: "✨",
  },
] as const;

// Thresholds: with 320vh (extra 220vh), each step gets comfortable room.
// All 3 steps complete by 0.88, leaving breathing space before sticky releases.
const STEP_THRESHOLDS: [number, number][] = [
  [0.04, 0.24],
  [0.34, 0.54],
  [0.64, 0.84],
];

/* ─── Individual step card ────────────────────────────────────────────────── */
function StepCard({
  step,
  scrollYProgress,
  startAt,
  endAt,
  index,
}: {
  step: (typeof STEPS)[number];
  scrollYProgress: MotionValue<number>;
  startAt: number;
  endAt: number;
  index: number;
}) {
  const y = useTransform(scrollYProgress, [startAt, endAt], [50, 0]);
  const scale = useTransform(scrollYProgress, [startAt, endAt], [0.88, 1]);
  // Derived from scale (not scroll progress directly) so it can never lag out of sync —
  // fully visible exactly when the card finishes settling, regardless of scroll speed/jitter.
  const opacity = useTransform(scale, [0.88, 0.91, 1], [0, 0.2, 1]);

  // Number circle scale — pops in with a spring-like overshoot feel via keyframes
  const numScale = useTransform(
    scrollYProgress,
    [startAt, startAt + 0.06, endAt - 0.02, endAt],
    [0, 1.25, 1.05, 1]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="flex flex-col items-center text-center px-4"
    >
      {/* Number bubble */}
      <motion.div
        style={{ scale: numScale }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A7C59] to-[#2F5233] text-[#FAF7F0] flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(47,82,51,0.28)] relative z-10"
      >
        <span className="text-2xl">{step.icon}</span>
      </motion.div>

      <span className="text-xs font-medium text-[#4A7C59] font-heading tracking-widest mb-1">
        {step.number}
      </span>
      <h3 className="font-heading text-xl md:text-2xl text-[#2C2C2C] mb-3">{step.title}</h3>
      <p className="text-sm text-[#6B5D4F] leading-relaxed max-w-[220px]">{step.desc}</p>

      {/* Connector dot at bottom (not for last step) */}
      {index < STEPS.length - 1 && (
        <motion.div
          style={{ opacity }}
          className="hidden lg:block absolute top-8 left-[calc(50%+3.5rem)] right-0 h-px bg-gradient-to-r from-[#A8C09A]/70 to-[#A8C09A]/20 z-0"
        />
      )}
    </motion.div>
  );
}

/* ─── Animated connecting line ────────────────────────────────────────────── */
function ConnectingLine({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Line draws from 0% to 100% width as cards reveal
  const scaleX = useTransform(
    scrollYProgress,
    [STEP_THRESHOLDS[0][0], STEP_THRESHOLDS[STEP_THRESHOLDS.length - 1][1]],
    [0, 1]
  );

  return (
    <div className="hidden lg:block absolute top-8 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-[#A8C09A]/20 overflow-visible">
      <motion.div
        className="h-full bg-gradient-to-r from-[#A8C09A] via-[#4A7C59] to-[#A8C09A] rounded-full origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}

/* ─── Progress dots ───────────────────────────────────────────────────────── */
function StepDot({
  scrollYProgress,
  startAt,
  endAt,
}: {
  scrollYProgress: MotionValue<number>;
  startAt: number;
  endAt: number;
}) {
  const size = useTransform(scrollYProgress, [startAt, endAt], ["8px", "28px"]);
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, startAt - 0.04), startAt, endAt],
    [0.2, 0.5, 1]
  );
  return (
    <motion.div
      className="h-1.5 rounded-full bg-[#2F5233]"
      style={{ width: size, opacity }}
    />
  );
}

/* ─── CTA that fades in when all steps are revealed ─────────────────────── */
function RevealCTA({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(
    scrollYProgress,
    [STEP_THRESHOLDS[2][1] - 0.06, STEP_THRESHOLDS[2][1] + 0.04],
    [0, 1]
  );
  const y = useTransform(scrollYProgress, [STEP_THRESHOLDS[2][0], STEP_THRESHOLDS[2][1]], [20, 0]);

  return (
    <motion.div style={{ opacity, y }} className="flex justify-center">
      <Link
        href="/quiz"
        className="inline-flex items-center gap-2 bg-gradient-to-br from-[#4A7C59] to-[#2F5233] text-[#FAF7F0] px-8 py-4 rounded-2xl font-medium hover:from-[#5C9068] hover:to-[#3A6440] transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(47,82,51,0.28)]"
      >
        Start Your Free Quiz — 3 Minutes
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

/* ─── Main ────────────────────────────────────────────────────────────────── */
export default function HowItWorksPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const doneOpacity = useTransform(scrollYProgress, [0.84, 0.92], [0, 1]);

  // Background blob parallax
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div ref={containerRef} style={{ height: "320vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-br from-[#F5EFE0] via-[#FAF7F0] to-[#F5EFE0] flex flex-col items-center justify-center">

        {/* Parallax blobs */}
        <motion.div
          style={{ y: blob1Y }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#A8C09A]/10 blur-3xl rounded-full pointer-events-none"
        />
        <motion.div
          style={{ y: blob2Y }}
          className="absolute -top-32 right-0 w-[400px] h-[400px] bg-[#D4A24C]/6 blur-3xl rounded-full pointer-events-none"
        />

        <div className="w-full max-w-5xl px-4 md:px-8 mx-auto relative z-10 flex flex-col items-center gap-10 md:gap-14">

          {/* Heading */}
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-3">
              How It Works
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-[#2F5233]">
              Your personalised routine{" "}
              <span className="italic">in 3 steps.</span>
            </h2>
          </div>

          {/* Steps + connecting line */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 w-full">
            <ConnectingLine scrollYProgress={scrollYProgress} />
            {STEPS.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                scrollYProgress={scrollYProgress}
                startAt={STEP_THRESHOLDS[i][0]}
                endAt={STEP_THRESHOLDS[i][1]}
                index={i}
              />
            ))}
          </div>

          {/* CTA — appears when all 3 steps are revealed */}
          <RevealCTA scrollYProgress={scrollYProgress} />

          {/* Progress dots */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {STEP_THRESHOLDS.map(([s, e], i) => (
                <StepDot key={i} scrollYProgress={scrollYProgress} startAt={s} endAt={e} />
              ))}
            </div>
            <div className="relative h-5 flex items-center justify-center">
              <motion.p
                style={{ opacity: hintOpacity }}
                className="absolute whitespace-nowrap text-[11px] text-[#6B5D4F]/50 tracking-widest uppercase"
              >
                ↓  Scroll through the steps
              </motion.p>
              <motion.p
                style={{ opacity: doneOpacity }}
                className="absolute whitespace-nowrap text-[11px] text-[#4A7C59]/80 tracking-widest uppercase font-medium"
              >
                ↓  Continue
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
