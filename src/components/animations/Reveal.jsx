import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const Reveal = ({
  children,
  delay = 0,
  duration = 0.45,
  y = 14,
  once = true,
  amount = 0.18, // mažas, kad mobile tikrai suveiktų
}) => {
  const reduce = useReducedMotion();

  // Jei user turi reduced motion – nerodom animacijų (mobile-friendly)
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      style={{ width: "100%" }}              // svarbu grid’ams
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}           // <- čia dažniausias fix
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;