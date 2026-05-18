import React, { useState, useEffect } from "react";
import "./portfolio.css";
import IMG1 from "../../assets/arklys.jpg";
import IMG2 from "../../assets/arklys.jpg";
import IMG3 from "../../assets/lektuvas.png";
import IMG4 from "../../assets/Lenktynės.jpg";
import IMG5 from "../../assets/Lenktynės.jpg";
import IMG6 from "../../assets/Namas.jpg";
import IMG7 from "../../assets/nama.jpg";
import IMG8 from "../../assets/Javascript.png";
import IMG9 from "../../assets/linux.png";
import Reveal from "../animations/Reveal";

const images = [IMG1,IMG2,IMG3,IMG4,IMG5,IMG6,IMG7,IMG8,IMG9,IMG3];
const demos  = ["https://manthispoc.gumroad.com/l/epptjq","https://manthispoc.gumroad.com/l/lykjt","https://manthispoc.gumroad.com/l/dinhw","https://manthispoc.gumroad.com/l/svflr","https://manthispoc.gumroad.com/l/onqml","https://manthispoc.gumroad.com/l/bbhjs","https://manthispoc.gumroad.com/l/zlfyu","https://manthispoc.gumroad.com/l/yvpto","https://manthispoc.gumroad.com/l/zkduwe","https://manthispoc.gumroad.com/l/dpfeuy"];

const PORTFOLIO_T = {
  en: { sub: "My Recent Work", title: "Portfolio", btn: "To pay", titles: ["Cheerful horse on android","Cheerful horse on windows","Crimson Sky Firestorm Arena on windows","3D Race game on windows","3D Race game on android","Home construction app for Lithuanians","Home construction app on windows (EN)","Learn to code Javascript, Python, Databases (Windows, LT)","Linux training on Windows for free (LT)","Crimson Sky Firestorm Arena on android"] },
  lt: { sub: "Mano naujausi darbai", title: "Portfelis", btn: "Pirkti", titles: ["Linksmas arklys ant android","Linksmas arklys ant windows","Crimson Sky Firestorm Arena ant windows","3D Lenktynių žaidimas ant windows","3D Lenktynių žaidimas ant android","Namų statybos programa lietuviams","Namų statybos programa ant windows (EN)","Išmok programuoti Javascript, Python, Duomenų bazės (Windows, LT)","Linux mokymai ant Windows nemokamai (LT)","Crimson Sky Firestorm Arena ant android"] },
  de: { sub: "Meine neuesten Arbeiten", title: "Portfolio", btn: "Kaufen", titles: ["Fröhliches Pferd auf Android","Fröhliches Pferd auf Windows","Crimson Sky Firestorm Arena auf Windows","3D-Rennspiel auf Windows","3D-Rennspiel auf Android","Hausbau-App für Litauer","Hausbau-App auf Windows (EN)","Lerne Javascript, Python, Datenbanken (Windows, LT)","Linux-Training auf Windows kostenlos (LT)","Crimson Sky Firestorm Arena auf Android"] },
  fr: { sub: "Mes travaux récents", title: "Portfolio", btn: "Acheter", titles: ["Cheval joyeux sur Android","Cheval joyeux sur Windows","Crimson Sky Firestorm Arena sur Windows","Jeu de course 3D sur Windows","Jeu de course 3D sur Android","Application de construction pour Lituaniens","Application de construction sur Windows (EN)","Apprendre Javascript, Python, Bases de données (Windows, LT)","Formation Linux sur Windows gratuitement (LT)","Crimson Sky Firestorm Arena sur Android"] },
  it: { sub: "I miei lavori recenti", title: "Portfolio", btn: "Acquistare", titles: ["Cavallo allegro su Android","Cavallo allegro su Windows","Crimson Sky Firestorm Arena su Windows","Gioco di corse 3D su Windows","Gioco di corse 3D su Android","App di costruzione casa per Lituani","App di costruzione casa su Windows (EN)","Impara Javascript, Python, Database (Windows, LT)","Formazione Linux su Windows gratuitamente (LT)","Crimson Sky Firestorm Arena su Android"] },
  es: { sub: "Mi trabajo reciente", title: "Portfolio", btn: "Comprar", titles: ["Caballo alegre en Android","Caballo alegre en Windows","Crimson Sky Firestorm Arena en Windows","Juego de carreras 3D en Windows","Juego de carreras 3D en Android","App de construcción para lituanos","App de construcción en Windows (EN)","Aprende Javascript, Python, Bases de datos (Windows, LT)","Entrenamiento Linux en Windows gratis (LT)","Crimson Sky Firestorm Arena en Android"] },
  uk: { sub: "Мої останні роботи", title: "Портфоліо", btn: "Купити", titles: ["Веселий кінь на Android","Веселий кінь на Windows","Crimson Sky Firestorm Arena на Windows","3D гонки на Windows","3D гонки на Android","Додаток для будівництва для литовців","Додаток для будівництва на Windows (EN)","Вчи Javascript, Python, Бази даних (Windows, LT)","Навчання Linux на Windows безкоштовно (LT)","Crimson Sky Firestorm Arena на Android"] },
  zh: { sub: "我的近期作品", title: "作品集", btn: "购买", titles: ["快乐的马 - Android版","快乐的马 - Windows版","Crimson Sky Firestorm Arena - Windows版","3D赛车游戏 - Windows版","3D赛车游戏 - Android版","立陶宛人的家庭建设应用","家庭建设应用 - Windows版 (EN)","学习Javascript、Python、数据库 (Windows, LT)","Windows上免费Linux培训 (LT)","Crimson Sky Firestorm Arena - Android版"] },
  ru: { sub: "Мои последние работы", title: "Портфолио", btn: "Купить", titles: ["Весёлая лошадь на Android","Весёлая лошадь на Windows","Crimson Sky Firestorm Arena на Windows","3D гонки на Windows","3D гонки на Android","Приложение для строительства для литовцев","Приложение для строительства на Windows (EN)","Учи Javascript, Python, Базы данных (Windows, LT)","Обучение Linux на Windows бесплатно (LT)","Crimson Sky Firestorm Arena на Android"] },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const Portfolio = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handler = () => forceUpdate({});
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = PORTFOLIO_T[getLang()] || PORTFOLIO_T["en"];

  return (
    <section id="portfolio">
      <div className="section__header">
        <Reveal y={10}><h5>{t.sub}</h5></Reveal>
        <Reveal y={12} delay={0.06}><h2>{t.title}</h2></Reveal>
      </div>
      <div className="container portfolio__container">
        {t.titles.map((title, i) => (
          <Reveal key={i} y={14} delay={i * 0.06}>
            <article className="portfolio__item">
              <div className="portfolio__item-image">
                <img src={images[i]} alt={title} loading="lazy" />
              </div>
              <h3>{title}</h3>
              <div className="portfolio__item-cta">
                <a href="https://github.com" className="btn" target="_blank" rel="noreferrer">GitHub</a>
                <a href={demos[i]} className="btn btn-primary" target="_blank" rel="noreferrer">{t.btn}</a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
