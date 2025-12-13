// components/AnimatedCounter.tsx
import { useInView } from "react-intersection-observer";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration: number;
  unit: string;
  decimal: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration,
  unit,
  decimal = 0,
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimal));
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: duration });
      return controls.stop;
    }
  }, [count, to, duration, inView]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl font-extrabold tracking-tight"
    >
      <motion.span>{rounded}</motion.span>
      {unit}
    </span>
  );
}
