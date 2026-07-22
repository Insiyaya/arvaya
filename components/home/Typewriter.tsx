"use client";

import { useEffect, useState } from "react";

/** Split into grapheme clusters so Devanagari syllables (matras/conjuncts) type
 *  as whole units instead of breaking mid-glyph. */
function graphemes(s: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: typeof Intl.Segmenter }).Segmenter;
  if (Seg) {
    const seg = new Seg("hi", { granularity: "grapheme" });
    return Array.from(seg.segment(s), (x) => x.segment);
  }
  return Array.from(s);
}

export default function Typewriter({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [wordIdx, setWordIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const clusters = graphemes(words[wordIdx % words.length]);
  const shown = clusters.slice(0, count).join("");

  useEffect(() => {
    const atFull = !deleting && count === clusters.length;
    const atEmpty = deleting && count === 0;
    let delay = deleting ? 65 : 150;
    if (atFull) delay = 1600; // hold the finished word
    if (atEmpty) delay = 350;

    const t = setTimeout(() => {
      if (atFull) setDeleting(true);
      else if (atEmpty) {
        setDeleting(false);
        setWordIdx((v) => (v + 1) % words.length);
      } else {
        setCount((c) => c + (deleting ? -1 : 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [count, deleting, wordIdx, clusters.length, words.length]);

  return (
    <span className={className}>
      {shown}
      <span className="inline-block align-baseline text-[#D4A24C] font-body font-light animate-[caret_1s_step-end_infinite]">
        |
      </span>
    </span>
  );
}
