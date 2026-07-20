"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  duration?: number;
  amount?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.7,
  amount = 0.15,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: direction === "up" ? 44 : 0,
        x: direction === "left" ? -44 : direction === "right" ? 44 : 0,
      }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
