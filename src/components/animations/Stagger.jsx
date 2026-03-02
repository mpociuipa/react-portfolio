import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const Stagger = ({
  children,
  once = true,
  amount = 0.25,
  delayChildren = 0.12,
  stagger = 0.08,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: reduce ? {} : { delayChildren, staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, y = 16 }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        show: reduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
      }}
    >
      {children}
    </motion.div>
  );
};