import React, { useRef, useState, useEffect } from "react";
import "./header.css";
import CTA from "./CTA";
import ME from "../../assets/me.png";
import HeaderSocial from "./HeaderSocials";
import ThemeToggle from "../theme/ThemeToggle";
import LanguageSwitcher from "../theme/LanguageSwitcher";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const HEADER_T = {
  en: { hello: "Hello, I'm", scrollDown: "Scroll Down", skills: ["Multi-stack Full Stack Developer","SQL + NoSQL Experience","Linux + Git (Engineering Base)","Web + Desktop Builder","Cloud Deployment Capable","Security-Inclined"] },
  lt: { hello: "Sveiki, aš esu", scrollDown: "Slinkti žemyn", skills: ["Pilno steko kūrėjas","SQL + NoSQL patirtis","Linux + Git (inžinerinė bazė)","Web + Desktop kūrėjas","Debesų diegimo galimybė","Orientuotas į saugumą"] },
  de: { hello: "Hallo, ich bin", scrollDown: "Nach unten scrollen", skills: ["Multi-Stack Full-Stack-Entwickler","SQL + NoSQL Erfahrung","Linux + Git (Ingenieurbasis)","Web + Desktop Entwickler","Cloud-Deployment fähig","Sicherheitsorientiert"] },
  fr: { hello: "Bonjour, je suis", scrollDown: "Défiler vers le bas", skills: ["Développeur Full Stack multi-stack","Expérience SQL + NoSQL","Linux + Git (base ingénierie)","Développeur Web + Desktop","Capable de déploiement Cloud","Orienté sécurité"] },
  it: { hello: "Ciao, sono", scrollDown: "Scorri verso il basso", skills: ["Sviluppatore Full Stack multi-stack","Esperienza SQL + NoSQL","Linux + Git (base ingegneristica)","Sviluppatore Web + Desktop","Capace di distribuzione Cloud","Orientato alla sicurezza"] },
  es: { hello: "Hola, soy", scrollDown: "Desplazarse hacia abajo", skills: ["Desarrollador Full Stack multi-stack","Experiencia SQL + NoSQL","Linux + Git (base de ingeniería)","Desarrollador Web + Desktop","Capaz de despliegue en la nube","Orientado a la seguridad"] },
  uk: { hello: "Привіт, я", scrollDown: "Прокрутити вниз", skills: ["Full Stack розробник","Досвід SQL + NoSQL","Linux + Git (інженерна база)","Розробник Web + Desktop","Можливість хмарного розгортання","Орієнтований на безпеку"] },
  zh: { hello: "你好，我是", scrollDown: "向下滚动", skills: ["全栈开发者","SQL + NoSQL 经验","Linux + Git（工程基础）","Web + 桌面开发者","具备云部署能力","注重安全"] },
  ru: { hello: "Привет, я", scrollDown: "Прокрутить вниз", skills: ["Full Stack разработчик","Опыт SQL + NoSQL","Linux + Git (инженерная база)","Разработчик Web + Desktop","Возможность облачного развёртывания","Ориентирован на безопасность"] },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const Header = () => {
  const [, forceUpdate] = useState({});
  const headerRef = useRef(null);
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  useEffect(() => {
    const handler = () => forceUpdate({});
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = HEADER_T[getLang()] || HEADER_T["en"];

  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const arcY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const smoothScrollTo = (selector) => (e) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reveal = (delay = 0, y = 14) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: reduce ? {} : { duration: 0.7, delay, ease },
  });

  const skillsWrap = {
    initial: {},
    animate: reduce ? {} : { transition: { delayChildren: 0.24, staggerChildren: 0.06 } },
  };

  const skillItem = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 10 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <header id="header" ref={headerRef}>
      <div className="container header__container">
        <motion.div className="header__topbar" {...reveal(0.05, 8)}>
          <ThemeToggle />
          <LanguageSwitcher />
        </motion.div>

        <div className="header__top">
          <motion.h5 {...reveal(0.08, 10)}>{t.hello}</motion.h5>
          <motion.h1 {...reveal(0.14, 12)}>Mantas Počiuipa</motion.h1>

          <motion.h5 className="text-light header__skills" variants={skillsWrap} initial="initial" animate="animate">
            {t.skills.map((skill, i) => (
              <motion.span key={i} className="header__skill-line" variants={skillItem}>{skill}</motion.span>
            ))}
          </motion.h5>

          <motion.div {...reveal(0.32, 16)}>
            <CTA onLetsTalkClick={smoothScrollTo("#contact")} />
          </motion.div>
        </div>

        <div className="header__hero">
          <div className="header__hero-inner">
            <motion.div
              className="me"
              style={{ y: reduce ? 0 : arcY }}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={reduce ? {} : { duration: 0.9, ease, delay: 0.18 }}
              whileHover={reduce ? {} : { rotateZ: -1.2, scale: 1.01, transition: { duration: 0.35, ease } }}
            >
              <img src={ME} alt="3D game" />
            </motion.div>
          </div>
        </div>

        <HeaderSocial />

        <motion.a
          href="#contact"
          className="scroll__down"
          onClick={smoothScrollTo("#contact")}
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -4, 0], transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
          transition={reduce ? {} : { duration: 0.8, delay: 0.4, ease }}
          {...(!reduce && { whileHover: { scale: 1.03 } })}
        >
          {t.scrollDown}
        </motion.a>
      </div>
    </header>
  );
};

export default Header;
