import React, { useState, useEffect, useRef } from "react";
import "./about.css";
import ME from "../../assets/me-about.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const ABOUT_T = {
  en: {
    sub: "Get To Know", title: "About Me", letsTalk: "Let's Talk",
    cards: [
      { h: "Experience", s: "4+ Years Working" },
      { h: "Clients",    s: "100+ Worldwide"  },
      { h: "Projects",   s: "10+ Completed"   },
    ],
    p1: "I am a full-stack engineer focused on building production-ready web and hybrid applications. My work spans frontend architecture, backend API design, cloud infrastructure, and CI/CD automation.",
    p2: "Beyond web systems, I extend applications into desktop and mobile environments — building Electron-based desktop apps and packaging hybrid applications for both iOS (.ipa) and Android (.apk). I work with CI pipelines (GitHub Actions) to automate cross-platform build workflows.",
    p3: "I enjoy designing systems that are not only functional, but structured, scalable, and deployment-ready.",
  },
  lt: {
    sub: "Susipažinkime", title: "Apie mane", letsTalk: "Susisiekti",
    cards: [
      { h: "Patirtis",       s: "4+ metai darbo"    },
      { h: "Klientai",       s: "100+ visame pasaulyje" },
      { h: "Projektai",      s: "10+ užbaigtų"      },
    ],
    p1: "Esu full-stack inžinierius, orientuotas į gamybai paruoštų web ir hibridinių aplikacijų kūrimą. Mano darbas apima frontend architektūrą, backend API dizainą, debesų infrastruktūrą ir CI/CD automatizavimą.",
    p2: "Be web sistemų, plečiu aplikacijas į desktop ir mobilią aplinką — kuriu Electron pagrįstas desktop programas ir paketuoju hibridines aplikacijas iOS (.ipa) ir Android (.apk). Dirbu su CI konvejeriais (GitHub Actions) automatizuojant kelių platformų kūrimo darbo eigas.",
    p3: "Mėgstu kurti sistemas, kurios yra ne tik funkcionalios, bet ir struktūrizuotos, keičiamo masto ir paruoštos diegimui.",
  },
  de: {
    sub: "Kennenlernen", title: "Über mich", letsTalk: "Kontakt aufnehmen",
    cards: [
      { h: "Erfahrung", s: "4+ Jahre Arbeit"    },
      { h: "Kunden",    s: "100+ weltweit"       },
      { h: "Projekte",  s: "10+ abgeschlossen"   },
    ],
    p1: "Ich bin ein Full-Stack-Ingenieur, der sich auf die Entwicklung produktionsreifer Web- und Hybridanwendungen konzentriert. Meine Arbeit umfasst Frontend-Architektur, Backend-API-Design, Cloud-Infrastruktur und CI/CD-Automatisierung.",
    p2: "Über Websysteme hinaus erweitere ich Anwendungen auf Desktop- und Mobilumgebungen — ich entwickle Electron-basierte Desktop-Apps und paketiere Hybridanwendungen für iOS (.ipa) und Android (.apk). Ich arbeite mit CI-Pipelines (GitHub Actions) zur Automatisierung plattformübergreifender Build-Workflows.",
    p3: "Ich entwerfe gerne Systeme, die nicht nur funktional, sondern auch strukturiert, skalierbar und deployment-bereit sind.",
  },
  fr: {
    sub: "Faire connaissance", title: "À propos", letsTalk: "Discutons",
    cards: [
      { h: "Expérience", s: "4+ ans de travail"   },
      { h: "Clients",    s: "100+ dans le monde"   },
      { h: "Projets",    s: "10+ complétés"        },
    ],
    p1: "Je suis un ingénieur full-stack axé sur la création d'applications web et hybrides prêtes pour la production. Mon travail couvre l'architecture frontend, la conception d'API backend, l'infrastructure cloud et l'automatisation CI/CD.",
    p2: "Au-delà des systèmes web, j'étends les applications aux environnements desktop et mobile — en développant des applications desktop basées sur Electron et en packagisant des applications hybrides pour iOS (.ipa) et Android (.apk).",
    p3: "J'aime concevoir des systèmes qui sont non seulement fonctionnels, mais aussi structurés, évolutifs et prêts au déploiement.",
  },
  it: {
    sub: "Conoscerci", title: "Chi sono", letsTalk: "Parliamo",
    cards: [
      { h: "Esperienza", s: "4+ anni di lavoro"   },
      { h: "Clienti",    s: "100+ in tutto il mondo" },
      { h: "Progetti",   s: "10+ completati"       },
    ],
    p1: "Sono un ingegnere full-stack focalizzato sulla creazione di applicazioni web e ibride pronte per la produzione. Il mio lavoro spazia dall'architettura frontend al design delle API backend, all'infrastruttura cloud e all'automazione CI/CD.",
    p2: "Oltre ai sistemi web, estendo le applicazioni agli ambienti desktop e mobile — sviluppando app desktop basate su Electron e pacchettizzando applicazioni ibride per iOS (.ipa) e Android (.apk).",
    p3: "Mi piace progettare sistemi che non siano solo funzionali, ma strutturati, scalabili e pronti per il deployment.",
  },
  es: {
    sub: "Conocerme", title: "Sobre mí", letsTalk: "Hablemos",
    cards: [
      { h: "Experiencia", s: "4+ años trabajando"  },
      { h: "Clientes",    s: "100+ en todo el mundo" },
      { h: "Proyectos",   s: "10+ completados"      },
    ],
    p1: "Soy un ingeniero full-stack enfocado en construir aplicaciones web e híbridas listas para producción. Mi trabajo abarca arquitectura frontend, diseño de API backend, infraestructura cloud y automatización CI/CD.",
    p2: "Más allá de los sistemas web, extiendo las aplicaciones a entornos de escritorio y móviles — creando aplicaciones de escritorio basadas en Electron y empaquetando aplicaciones híbridas para iOS (.ipa) y Android (.apk).",
    p3: "Disfruto diseñando sistemas que no solo sean funcionales, sino estructurados, escalables y listos para el despliegue.",
  },
  uk: {
    sub: "Познайомитися", title: "Про мене", letsTalk: "Зв'яжіться",
    cards: [
      { h: "Досвід",    s: "4+ роки роботи"      },
      { h: "Клієнти",   s: "100+ по всьому світу" },
      { h: "Проекти",   s: "10+ завершених"       },
    ],
    p1: "Я full-stack інженер, зосереджений на створенні готових до виробництва веб та гібридних додатків. Моя робота охоплює frontend архітектуру, дизайн backend API, хмарну інфраструктуру та автоматизацію CI/CD.",
    p2: "Окрім веб-систем, я розширюю додатки на desktop та мобільні середовища — створюю desktop додатки на основі Electron та пакетую гібридні додатки для iOS (.ipa) та Android (.apk).",
    p3: "Мені подобається проектувати системи, які є не лише функціональними, але й структурованими, масштабованими та готовими до розгортання.",
  },
  zh: {
    sub: "了解我", title: "关于我", letsTalk: "联系我",
    cards: [
      { h: "经验", s: "4年以上工作经验" },
      { h: "客户", s: "100+全球客户"   },
      { h: "项目", s: "10+已完成项目"  },
    ],
    p1: "我是一名全栈工程师，专注于构建生产就绪的Web和混合应用程序。我的工作涵盖前端架构、后端API设计、云基础设施和CI/CD自动化。",
    p2: "除了Web系统，我还将应用程序扩展到桌面和移动环境——构建基于Electron的桌面应用程序，并为iOS（.ipa）和Android（.apk）打包混合应用程序。",
    p3: "我喜欢设计不仅功能完善，而且结构化、可扩展且部署就绪的系统。",
  },
  ru: {
    sub: "Познакомиться", title: "Обо мне", letsTalk: "Связаться",
    cards: [
      { h: "Опыт",     s: "4+ года работы"        },
      { h: "Клиенты",  s: "100+ по всему миру"    },
      { h: "Проекты",  s: "10+ завершённых"        },
    ],
    p1: "Я full-stack инженер, сосредоточенный на создании готовых к производству веб и гибридных приложений. Моя работа охватывает frontend архитектуру, дизайн backend API, облачную инфраструктуру и автоматизацию CI/CD.",
    p2: "Помимо веб-систем, я расширяю приложения на desktop и мобильные среды — создаю desktop приложения на основе Electron и пакетирую гибридные приложения для iOS (.ipa) и Android (.apk).",
    p3: "Мне нравится проектировать системы, которые не только функциональны, но и структурированы, масштабируемы и готовы к развёртыванию.",
  },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const About = () => {
  const [, forceUpdate] = useState({});
  const videoRef = useRef(null);

  useEffect(() => {
    const handler = () => forceUpdate({});
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = ABOUT_T[getLang()] || ABOUT_T["en"];

  const handleMouseEnter = () => { if (!videoRef.current) return; videoRef.current.play(); };
  const handleMouseLeave = () => { if (!videoRef.current) return; videoRef.current.pause(); videoRef.current.currentTime = 0; };

  const icons = [<FaAward className="about__icon"/>, <FiUsers className="about__icon"/>, <VscFolderLibrary className="about__icon"/>];

  return (
    <section id="about">
      <div className="section__header">
        <Reveal y={10}><h5>{t.sub}</h5></Reveal>
        <Reveal y={12} delay={0.06}><h2>{t.title}</h2></Reveal>
      </div>
      <div className="container about__container">
        <Reveal y={18} delay={0.1}>
          <div className="about__me">
            <div className="about__me-image" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <video ref={videoRef} muted playsInline className="about__video" aria-label="Mantas Počiuipa" poster={ME}>
                <source src={require("../../assets/about-video.mp4")} type="video/mp4" />
              </video>
            </div>
          </div>
        </Reveal>
        <Reveal y={18} delay={0.14}>
          <div className="about__content">
            <Stagger>
              <div className="about__cards">
                {t.cards.map((card, i) => (
                  <StaggerItem key={i}>
                    <article className="about__card">
                      {icons[i]}
                      <h5>{card.h}</h5>
                      <small>{card.s}</small>
                    </article>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
            <Reveal y={12} delay={0.12}>
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
            </Reveal>
            <Reveal y={10} delay={0.18}>
              <a href="#contact" className="btn btn-primary">{t.letsTalk}</a>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
