/* The brand's vision line, reused on the homepage and the About page so the
   message stays identical everywhere. */
export const VISION_TEXT =
  "Your Prakriti is one of a kind. Your Ayurveda should be, too.";

export default function VisionLine({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      Your <span className="font-devanagari">प्रकृति</span> is one of a kind.{" "}
      <span className="text-[#4A7C59]">Your Ayurveda should be, too.</span>
    </p>
  );
}
