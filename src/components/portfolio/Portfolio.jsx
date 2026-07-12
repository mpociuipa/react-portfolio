import React, { useState, useEffect } from "react";
import "./portfolio.css";

import IMG1 from "../../assets/horse-ironing-board-app.jpg";
import IMG2 from "../../assets/horse-ironing-board-app.jpg";
import IMG3 from "../../assets/crimson-sky-firestorm-arena-app.png";
import IMG4 from "../../assets/3d-race-game-windows.png";
import IMG5 from "../../assets/3d-race-game-windows.png";
import IMG6 from "../../assets/houses-construction-app.jpg";
import IMG7 from "../../assets/house-construction-app.jpg";
import IMG8 from "../../assets/javascript-python-course.png";
import IMG9 from "../../assets/linux-training-windows.png";
import IMG10 from "../../assets/health-manager-app.jpg";

import Reveal from "../animations/Reveal";

const images = [
  IMG1,
  IMG2,
  IMG3,
  IMG4,
  IMG5,
  IMG6,
  IMG7,
  IMG8,
  IMG9,
  IMG3,
  IMG10,
];

const demos = [
  "https://manthispoc.gumroad.com/l/epptjq",
  "https://manthispoc.gumroad.com/l/lykjt",
  "https://manthispoc.gumroad.com/l/dinhw",
  "https://manthispoc.gumroad.com/l/svflr",
  "https://manthispoc.gumroad.com/l/onqml",
  "https://manthispoc.gumroad.com/l/bbhjs",
  "https://manthispoc.gumroad.com/l/zlfyu",
  "https://manthispoc.gumroad.com/l/yvpto",
  "https://manthispoc.gumroad.com/l/zkduwe",
  "https://manthispoc.gumroad.com/l/dpfeuy",
  "https://manthispoc.gumroad.com/l/dzvyb",
];

const PORTFOLIO_T = {
  en: {
    sub: "My Recent Work",

    title: "Portfolio",

    btn: "To pay",

    titles: [
      "Cheerful horse on android",
      "Cheerful horse on windows",
      "Crimson Sky Firestorm Arena on windows",
      "3D Race game on windows",
      "3D Race game on android",
      "Home construction app for Lithuanians",
      "Home construction app on windows (EN)",
      "Learn to code Javascript, Python, Databases (Windows, LT)",
      "Linux training on Windows for free (LT)",
      "Crimson Sky Firestorm Arena on android",
      "Health Manager on windows",
    ],

    alt: [
      "Cheerful Horse Android game developed by Mantas Počiuipa",

      "Cheerful Horse Windows game developed by Mantas Počiuipa",

      "Crimson Sky Firestorm Arena Windows game developed by Mantas Počiuipa",

      "3D Race Game for Windows developed by Mantas Počiuipa",

      "3D Race Game for Android developed by Mantas Počiuipa",

      "House Construction application developed by Mantas Počiuipa",

      "House Construction Windows application developed by Mantas Počiuipa",

      "JavaScript Python Database programming course by Mantas Počiuipa",

      "Linux training course for Windows users by Mantas Počiuipa",

      "Crimson Sky Firestorm Arena Android game",

      "Health Manager Windows application developed by Mantas Počiuipa",
    ],
  },

  lt: {
    sub: "Mano naujausi darbai",

    title: "Portfelis",

    btn: "Pirkti",

    titles: [
      "Linksmas arklys ant android",
      "Linksmas arklys ant windows",
      "Crimson Sky Firestorm Arena ant windows",
      "3D Lenktynių žaidimas ant windows",
      "3D Lenktynių žaidimas ant android",
      "Namų statybos programa lietuviams",
      "Namų statybos programa ant windows (EN)",
      "Išmok programuoti Javascript, Python, Duomenų bazės (Windows, LT)",
      "Linux mokymai ant Windows nemokamai (LT)",
      "Crimson Sky Firestorm Arena ant android",
      "Sveikatos valdytojas ant windows",
    ],

    alt: [
      "Linksmo arklio Android žaidimas sukurtas Manto Počiuipos",

      "Linksmo arklio Windows žaidimas sukurtas Manto Počiuipos",

      "Crimson Sky Firestorm Arena Windows žaidimas",

      "3D lenktynių žaidimas Windows platformai",

      "3D lenktynių žaidimas Android platformai",

      "Namų statybos programa lietuviams",

      "Namų statybos Windows programa",

      "Javascript Python duomenų bazių mokymosi kursas",

      "Linux mokymai Windows vartotojams",

      "Crimson Sky Firestorm Arena Android žaidimas",

      "Sveikatos valdymo programa Windows platformai",
    ],
  },

  de: {
    sub: "Meine neuesten Arbeiten",

    title: "Portfolio",

    btn: "Kaufen",

    titles: [
      "Fröhliches Pferd auf Android",
      "Fröhliches Pferd auf Windows",
      "Crimson Sky Firestorm Arena auf Windows",
      "3D-Rennspiel auf Windows",
      "3D-Rennspiel auf Android",
      "Hausbau-App für Litauer",
      "Hausbau-App auf Windows (EN)",
      "Lerne Javascript, Python, Datenbanken (Windows, LT)",
      "Linux-Training auf Windows kostenlos (LT)",
      "Crimson Sky Firestorm Arena auf Android",
      "Gesundheitsmanager auf Windows",
    ],

    alt: [
      "Fröhliches Pferd Android Spiel von Mantas Počiuipa",

      "Fröhliches Pferd Windows Spiel von Mantas Počiuipa",

      "Crimson Sky Firestorm Arena Windows Spiel",

      "3D Rennspiel für Windows",

      "3D Rennspiel für Android",

      "Hausbau Anwendung von Mantas Počiuipa",

      "Hausbau Windows Anwendung",

      "Javascript Python Datenbank Lernkurs",

      "Linux Training für Windows Benutzer",

      "Crimson Sky Firestorm Arena Android Spiel",

      "Gesundheitsmanager Windows Anwendung",
    ],
  },
  fr: {
    sub: "Mes travaux récents",

    title: "Portfolio",

    btn: "Acheter",

    titles: [
      "Cheval joyeux sur Android",
      "Cheval joyeux sur Windows",
      "Crimson Sky Firestorm Arena sur Windows",
      "Jeu de course 3D sur Windows",
      "Jeu de course 3D sur Android",
      "Application de construction pour Lituaniens",
      "Application de construction sur Windows (EN)",
      "Apprendre Javascript, Python, Bases de données (Windows, LT)",
      "Formation Linux sur Windows gratuitement (LT)",
      "Crimson Sky Firestorm Arena sur Android",
      "Gestionnaire de santé sur Windows",
    ],

    alt: [
      "Jeu Android Cheval Joyeux développé par Mantas Počiuipa",

      "Jeu Windows Cheval Joyeux développé par Mantas Počiuipa",

      "Jeu Windows Crimson Sky Firestorm Arena",

      "Jeu de course 3D pour Windows développé par Mantas Počiuipa",

      "Jeu de course 3D Android développé par Mantas Počiuipa",

      "Application de construction de maison",

      "Application Windows de construction de maison",

      "Cours Javascript Python Bases de données",

      "Formation Linux pour utilisateurs Windows",

      "Jeu Android Crimson Sky Firestorm Arena",

      "Application Windows Gestionnaire de santé",
    ],
  },

  it: {
    sub: "I miei lavori recenti",

    title: "Portfolio",

    btn: "Acquistare",

    titles: [
      "Cavallo allegro su Android",
      "Cavallo allegro su Windows",
      "Crimson Sky Firestorm Arena su Windows",
      "Gioco di corse 3D su Windows",
      "Gioco di corse 3D su Android",
      "App di costruzione casa per Lituani",
      "App di costruzione casa su Windows (EN)",
      "Impara Javascript, Python, Database (Windows, LT)",
      "Formazione Linux su Windows gratuitamente (LT)",
      "Crimson Sky Firestorm Arena su Android",
      "Gestore della salute su Windows",
    ],

    alt: [
      "Gioco Android Cavallo Allegro sviluppato da Mantas Počiuipa",

      "Gioco Windows Cavallo Allegro sviluppato da Mantas Počiuipa",

      "Gioco Windows Crimson Sky Firestorm Arena",

      "Gioco di corse 3D per Windows",

      "Gioco di corse 3D per Android",

      "Applicazione costruzione casa",

      "Applicazione Windows costruzione casa",

      "Corso Javascript Python Database",

      "Formazione Linux per utenti Windows",

      "Gioco Android Crimson Sky Firestorm Arena",

      "Applicazione Windows Gestore della salute",
    ],
  },

  es: {
    sub: "Mi trabajo reciente",

    title: "Portfolio",

    btn: "Comprar",

    titles: [
      "Caballo alegre en Android",
      "Caballo alegre en Windows",
      "Crimson Sky Firestorm Arena en Windows",
      "Juego de carreras 3D en Windows",
      "Juego de carreras 3D en Android",
      "App de construcción para lituanos",
      "App de construcción en Windows (EN)",
      "Aprende Javascript, Python, Bases de datos (Windows, LT)",
      "Entrenamiento Linux en Windows gratis (LT)",
      "Crimson Sky Firestorm Arena en Android",
      "Administrador de salud en Windows",
    ],

    alt: [
      "Juego Android Caballo Alegre desarrollado por Mantas Počiuipa",

      "Juego Windows Caballo Alegre desarrollado por Mantas Počiuipa",

      "Juego Windows Crimson Sky Firestorm Arena",

      "Juego de carreras 3D para Windows",

      "Juego de carreras 3D para Android",

      "Aplicación de construcción de casas",

      "Aplicación Windows de construcción de casas",

      "Curso de Javascript Python Bases de datos",

      "Curso Linux para usuarios de Windows",

      "Juego Android Crimson Sky Firestorm Arena",

      "Aplicación Windows Administrador de salud",
    ],
  },

  uk: {
    sub: "Мої останні роботи",

    title: "Портфоліо",

    btn: "Купити",

    titles: [
      "Веселий кінь на Android",
      "Веселий кінь на Windows",
      "Crimson Sky Firestorm Arena на Windows",
      "3D гонки на Windows",
      "3D гонки на Android",
      "Додаток для будівництва для литовців",
      "Додаток для будівництва на Windows (EN)",
      "Вчи Javascript, Python, Бази даних (Windows, LT)",
      "Навчання Linux на Windows безкоштовно (LT)",
      "Crimson Sky Firestorm Arena на Android",
      "Менеджер здоров'я на Windows",
    ],

    alt: [
      "Гра Веселий кінь Android розроблена Мантасом Почюіпою",

      "Гра Веселий кінь Windows розроблена Мантасом Почюіпою",

      "Гра Crimson Sky Firestorm Arena для Windows",

      "3D гоночна гра для Windows",

      "3D гоночна гра для Android",

      "Додаток будівництва будинків",

      "Windows додаток будівництва",

      "Курс Javascript Python бази даних",

      "Навчання Linux для користувачів Windows",

      "Гра Crimson Sky Firestorm Arena Android",

      "Менеджер здоров'я Windows",
    ],
  },
  zh: {
    sub: "我的近期作品",

    title: "作品集",

    btn: "购买",

    titles: [
      "快乐的马 - Android版",
      "快乐的马 - Windows版",
      "Crimson Sky Firestorm Arena - Windows版",
      "3D赛车游戏 - Windows版",
      "3D赛车游戏 - Android版",
      "立陶宛人的家庭建设应用",
      "家庭建设应用 - Windows版 (EN)",
      "学习Javascript、Python、数据库 (Windows, LT)",
      "Windows上免费Linux培训 (LT)",
      "Crimson Sky Firestorm Arena - Android版",
      "健康管理器 - Windows版",
    ],

    alt: [
      "Mantas Počiuipa开发的快乐的马 Android游戏",

      "Mantas Počiuipa开发的快乐的马 Windows游戏",

      "Crimson Sky Firestorm Arena Windows游戏",

      "Windows平台3D赛车游戏",

      "Android平台3D赛车游戏",

      "家庭建设应用程序",

      "Windows家庭建设应用程序",

      "Javascript Python 数据库学习课程",

      "Windows用户Linux培训课程",

      "Crimson Sky Firestorm Arena Android游戏",

      "Windows健康管理应用程序",
    ],
  },

  ru: {
    sub: "Мои последние работы",

    title: "Портфолио",

    btn: "Купить",

    titles: [
      "Весёлая лошадь на Android",
      "Весёлая лошадь на Windows",
      "Crimson Sky Firestorm Arena на Windows",
      "3D гонки на Windows",
      "3D гонки на Android",
      "Приложение для строительства для литовцев",
      "Приложение для строительства на Windows (EN)",
      "Учи Javascript, Python, Базы данных (Windows, LT)",
      "Обучение Linux на Windows бесплатно (LT)",
      "Crimson Sky Firestorm Arena на Android",
      "Менеджер здоровья на Windows",
    ],

    alt: [
      "Android игра Весёлая лошадь разработанная Mantas Počiuipa",

      "Windows игра Весёлая лошадь разработанная Mantas Počiuipa",

      "Windows игра Crimson Sky Firestorm Arena",

      "3D гоночная игра для Windows",

      "3D гоночная игра для Android",

      "Приложение строительства домов",

      "Windows приложение строительства домов",

      "Курс Javascript Python базы данных",

      "Linux обучение для пользователей Windows",

      "Android игра Crimson Sky Firestorm Arena",

      "Windows приложение Менеджер здоровья",
    ],
  },
};

const getLang = () => {
  try {
    return localStorage.getItem("portfolioLang") || "en";
  } catch {
    return "en";
  }
};

const Portfolio = () => {
  const [lang, setLang] = useState(getLang);

  useEffect(() => {
    const handler = () => {
      setLang(getLang());
    };

    window.addEventListener("langchange", handler);

    return () => {
      window.removeEventListener("langchange", handler);
    };
  }, []);

  const t = PORTFOLIO_T[lang] || PORTFOLIO_T.en;

  return (
    <section id="portfolio">
      <div className="section__header">
        <Reveal y={10}>
          <h5>{t.sub}</h5>
        </Reveal>

        <Reveal y={12} delay={0.06}>
          <h2>{t.title}</h2>
        </Reveal>
      </div>

      <div className="container portfolio__container">
        {t.titles.map((title, i) => (
          <Reveal key={i} y={14} delay={i * 0.06}>
            <article className="portfolio__item">
              <div className="portfolio__item-image">
                <img
                  src={images[i]}
                  alt={t.alt[i]}
                  title={`${title} | Mantas Počiuipa`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3>{title}</h3>

              <div className="portfolio__item-cta">
                <a
                  href="https://github.com"
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

                <a
                  href={demos[i]}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.btn}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
