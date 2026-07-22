/* eslint-disable @next/next/no-img-element -- three pixel-aligned overlay layers;
   next/image's wrapper would complicate the exact stacking + transform animation. */

/* pivot for the subtle wrist bob, as % of the illustration (near the wrist) */
const WRIST = "71% 23.3%";

/* One herb fleck released from the fingertips, dropping into the pot on a loop */
function Fleck({ left, top, delay, dur, color, size }: {
  left: string; top: string; delay: string; dur: string; color: string; size: number;
}) {
  return (
    <span
      className="absolute rounded-full"
      style={{
        left, top, width: size, height: size * 1.7, backgroundColor: color,
        animation: `herb-drop ${dur} ease-in ${delay} infinite`,
      }}
    />
  );
}

/* Rising steam wisp from the pot mouth */
function Wisp({ left, delay }: { left: string; delay: string }) {
  return (
    <span
      className="absolute w-[3px] h-8 rounded-full blur-[1.5px]"
      style={{
        left, top: "47.5%",
        background: "linear-gradient(to top, transparent, rgba(210,224,190,0.8), transparent)",
        animation: `aroma-rise 3.6s ease-in-out ${delay} infinite`,
      }}
    />
  );
}

/* ─── Composed hero visual — animated illustration ────────────────────────── */
export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:h-[540px] flex items-center justify-center">
      {/* Script header */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-20"
        style={{ animation: "fade-up 0.7s 0.3s ease-out both" }}
      >
        <p className="font-devanagari text-2xl text-[#2F5233] leading-none mb-1">आयुर्वेद</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B5D4F]/70">The Science of Life</p>
      </div>

      {/* Rotating "wheel" — mandala rings behind the illustration (show through
          the transparent artwork) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full blur-3xl opacity-70 animate-[spin_30s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(168,192,154,0.4) 70deg, transparent 150deg, rgba(212,162,76,0.3) 240deg, transparent 320deg)",
          }}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-dashed border-[#4A7C59]/20 pointer-events-none z-0 animate-[spin_55s_linear_infinite]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#4A7C59]/15 pointer-events-none z-0 animate-[spin_40s_linear_infinite] [animation-direction:reverse]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[470px] h-[470px] pointer-events-none z-0 animate-[spin_70s_linear_infinite]">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 w-1.5 h-1.5 rounded-full bg-[#4A7C59]/25"
            style={{ transform: `translateX(-50%) rotate(${i * 30}deg)`, transformOrigin: "50% 235px" }}
          />
        ))}
      </div>

      {/* Animated illustration — transparent, no frame */}
      <div
        className="relative z-10 mt-10 w-full"
        style={{ animation: "fade-up 0.8s 0.35s ease-out both" }}
      >
        <div className="relative aspect-[1591/1056] w-full">
          {/* base — pot & ingredients, hand & stick removed; soft grounding shadow */}
          <img
            src="/hero-base.webp"
            alt="Ayurvedic remedy being prepared in a brass pot"
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_22px_36px_rgba(47,82,51,0.28)]"
          />

          {/* steam rising from the pot */}
          <Wisp left="46.9%" delay="0s" />
          <Wisp left="50.8%" delay="1.2s" />
          <Wisp left="54.6%" delay="2.3s" />

          {/* mixing stick — static, resting in the pot */}
          <img
            src="/hero-stick.webp" alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* hand — static, with a gentle sprinkling wrist bob */}
          <img
            src="/hero-hand.webp" alt="A practitioner's hand adding fresh herbs" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ transformOrigin: WRIST, animation: "sprinkle-bob 2.8s ease-in-out infinite" }}
          />

          {/* herb flecks pouring continuously from the fingertips down into the pot */}
          <div className="absolute inset-0">
            <Fleck left="51.7%" top="44.6%" delay="0s"    dur="1.7s" color="#6E8F3E" size={6} />
            <Fleck left="53.2%" top="44.1%" delay="0.3s"  dur="1.9s" color="#8AA85A" size={5} />
            <Fleck left="50.8%" top="45.1%" delay="0.6s"  dur="1.6s" color="#C9A24C" size={5} />
            <Fleck left="53.7%" top="44.6%" delay="0.9s"  dur="1.8s" color="#6E8F3E" size={4} />
            <Fleck left="50.3%" top="44.1%" delay="1.2s"  dur="1.7s" color="#8AA85A" size={6} />
            <Fleck left="52.5%" top="44.8%" delay="1.5s"  dur="1.9s" color="#6E8F3E" size={5} />
            <Fleck left="51.4%" top="44.4%" delay="1.9s"  dur="1.6s" color="#C9A24C" size={4} />
          </div>
        </div>
      </div>

      {/* Tridosha script widget — floating on the frame's corner */}
      <div
        className="absolute -bottom-4 left-2 md:-left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(47,82,51,0.16)] px-4 py-3 border border-[#A8C09A]/25 z-20"
        style={{ animation: "fade-up 0.7s 0.6s ease-out both" }}
      >
        <p className="text-[10px] uppercase tracking-widest text-[#4A7C59] mb-1.5">Tridosha</p>
        <div className="flex items-center gap-3">
          {[
            { sa: "वात", en: "Vata", c: "#60a5fa" },
            { sa: "पित्त", en: "Pitta", c: "#C97B63" },
            { sa: "कफ", en: "Kapha", c: "#4A7C59" },
          ].map(d => (
            <div key={d.en} className="flex flex-col items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.c }} />
              <span className="font-devanagari text-base text-[#2F5233] leading-none">{d.sa}</span>
              <span className="text-[9px] text-[#6B5D4F]/70 leading-none">{d.en}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
