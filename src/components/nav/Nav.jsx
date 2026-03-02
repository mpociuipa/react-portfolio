import React, { useState } from "react";
import "./nav.css";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiBook, BiMessageSquareDetail } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { motion, useReducedMotion } from "framer-motion";

const Nav = () => {
  const [activeNav, setActiveNav] = useState("#header");
  const reduce = useReducedMotion();

  const links = [
    { id: "#header", icon: <AiOutlineHome />, label: "Home" },
    { id: "#about", icon: <AiOutlineUser />, label: "About" },
    { id: "#experience", icon: <BiBook />, label: "Experience" },
    { id: "#services", icon: <RiServiceLine />, label: "Services" },
    { id: "#contact", icon: <BiMessageSquareDetail />, label: "Contact" },
  ];

  const smoothScrollTo = (selector) => (e) => {
    e.preventDefault();
    setActiveNav(selector);
    document.querySelector(selector)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const wrap = {
    hidden: reduce ? {} : { opacity: 0, y: 10 },
    show: reduce
      ? {}
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
  };

  const list = {
    hidden: {},
    show: reduce
      ? {}
      : {
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.08,
          },
        },
  };

  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.98 },
    show: reduce
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <motion.nav
      variants={wrap}
      initial="hidden"
      animate="show"
      aria-label="Primary"
    >
      <motion.div variants={list} initial="hidden" animate="show" className="nav__items">
        {links.map((l) => (
          <motion.a
            key={l.id}
            href={l.id}
            onClick={smoothScrollTo(l.id)}
            className={activeNav === l.id ? "active" : ""}
            aria-label={l.label}
            variants={item}
            whileHover={reduce ? {} : { y: -2, scale: 1.05 }}
            whileTap={reduce ? {} : { scale: 0.95 }}
          >
            {l.icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Nav;