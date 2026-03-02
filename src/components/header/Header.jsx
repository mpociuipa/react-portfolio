import React, { useRef } from "react";
import "./header.css";
import CTA from "./CTA";
import ME from "../../assets/me.png";
import HeaderSocial from "./HeaderSocials";
import ThemeToggle from "../theme/ThemeToggle";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const Header = () => {
  const skills = [
    "Multi-stack Full Stack Developer",
    "SQL + NoSQL Experience",
    "Linux + Git (Engineering Base)",
    "Web + Desktop Builder",
    "Cloud Deployment Capable",
    "Security-Inclined",
  ];

  const smoothScrollTo = (selector) => (e) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const headerRef = useRef(null);
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  // Parallax (subtilus)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const arcY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Reveal helper
  const reveal = (delay = 0, y = 14) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: reduce ? {} : { duration: 0.7, delay, ease },
  });

  // Skills stagger
  const skillsWrap = {
    initial: {},
    animate: reduce
      ? {}
      : {
          transition: {
            delayChildren: 0.24,
            staggerChildren: 0.06,
          },
        },
  };

  const skillItem = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 10 },
    animate: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <header id="header" ref={headerRef}>
      <div className="container header__container">
        {/* Toggle */}
        <motion.div className="header__topbar" {...reveal(0.05, 8)}>
          <ThemeToggle />
        </motion.div>

        {/* Text */}
        <div className="header__top">
          <motion.h5 {...reveal(0.08, 10)}>Hello I'm</motion.h5>

          <motion.h1 {...reveal(0.14, 12)}>Mantas Počiuipa</motion.h1>

          {/* Skills stagger */}
          <motion.h5
            className="text-light header__skills"
            variants={skillsWrap}
            initial="initial"
            animate="animate"
          >
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                className="header__skill-line"
                variants={skillItem}
              >
                {skill}
              </motion.span>
            ))}
          </motion.h5>

          <motion.div {...reveal(0.32, 16)}>
            <CTA onLetsTalkClick={smoothScrollTo("#contact")} />
          </motion.div>
        </div>

        {/* Hero */}
        <div className="header__hero">
          <div className="header__hero-inner">
            <motion.div
              className="me"
              style={{ y: reduce ? 0 : arcY }}
              initial={
                reduce ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }
              }
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={reduce ? {} : { duration: 0.9, ease, delay: 0.18 }}
              whileHover={
                reduce
                  ? {}
                  : {
                      rotateZ: -1.2,
                      scale: 1.01,
                      transition: { duration: 0.35, ease },
                    }
              }
            >
              <img src={ME} alt="3D game" />
            </motion.div>
          </div>
        </div>

        {/* Social */}
        <HeaderSocial />

        {/* Scroll Down pulse */}
        <motion.a
          href="#contact"
          className="scroll__down"
          onClick={smoothScrollTo("#contact")}
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1 }}
          transition={reduce ? {} : { duration: 0.8, delay: 0.4, ease }}
          {...(!reduce && {
            whileHover: { scale: 1.03 },
            animate: {
              opacity: 1,
              y: [0, -4, 0],
              transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
            },
          })}
        >
          Scroll Down
        </motion.a>
      </div>
    </header>
  );
};

export default Header;