"use client";

import { useEffect, useState } from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: boolean;
  className?: string;
  children: React.ReactNode;
};

const offsets = {
  up: { y: 16 },
  down: { y: -16 },
  left: { x: 16 },
  right: { x: -16 },
  none: {},
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = false,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  // Avoid SSR/client markup mismatch from motion initial styles
  if (!ready || reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        ...offsets[direction],
        ...(blur ? { filter: "blur(8px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.1 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
