import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  y = 16,
  delay = 0,
  duration = 0.5,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}   // ✅ svarbiausia mobile
      transition={{ duration, delay, ease: "easeOut" }}
      style={reduce ? undefined : { willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}