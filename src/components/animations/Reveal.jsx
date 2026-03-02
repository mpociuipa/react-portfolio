import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const Reveal = ({
  children,
  delay = 0,
  y = 18,
  duration = 0.6,
  once = true,
  amount = 0.25,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;