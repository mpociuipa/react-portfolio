import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const Stagger = ({
  children,
  once = true,
  amount = 0.12,
  stagger = 0.08,
  delayChildren = 0.05,
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      style={{ width: "100%" }} // kad grid’as ne “susispaustų”
      variants={{
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, y = 14 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};