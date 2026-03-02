import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FiDribbble } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";

const HeaderSocials = () => {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  const wrap = {
    hidden: {},
    show: reduce
      ? {}
      : {
          transition: {
            delayChildren: 0.45,
            staggerChildren: 0.08,
          },
        },
  };

  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 10 },
    show: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <motion.div
      className="header__socials"
      variants={wrap}
      initial="hidden"
      animate="show"
    >
      <motion.a
        variants={item}
        href="https://linkedin.com"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        whileHover={reduce ? {} : { y: -2, scale: 1.03 }}
        whileTap={reduce ? {} : { scale: 0.98 }}
      >
        <BsLinkedin />
      </motion.a>

      <motion.a
        variants={item}
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        whileHover={reduce ? {} : { y: -2, scale: 1.03 }}
        whileTap={reduce ? {} : { scale: 0.98 }}
      >
        <FaGithub />
      </motion.a>

      <motion.a
        variants={item}
        href="https://dribbble.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Dribbble"
        whileHover={reduce ? {} : { y: -2, scale: 1.03 }}
        whileTap={reduce ? {} : { scale: 0.98 }}
      >
        <FiDribbble />
      </motion.a>
    </motion.div>
  );
};

export default HeaderSocials;