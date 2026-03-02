import React from "react";
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

const data = [
  { id: 1, image: IMG1, title: "Cheerful horse on android", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/epptjq" },
  { id: 2, image: IMG2, title: "Cheerful horse on windows", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/lykjt" },
  { id: 3, image: IMG3, title: "Crimson Sky Firestorm Arena on windows", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/dinhw" },
  { id: 4, image: IMG4, title: "3D Race game on windows", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/svflr" },
  { id: 5, image: IMG5, title: "3D Race game on android", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/onqml" },
  { id: 6, image: IMG6, title: "Home construction app for Lithuanians", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/bbhjs" },
  { id: 7, image: IMG7, title: "Home construction app on windows (EN)", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/zlfyu" },
  { id: 8, image: IMG8, title: "Išmok programuoti Javascript, Python, Duomenų bazės (Windows, LT)", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/yvpto" },
  { id: 9, image: IMG9, title: "Linux mokymai ant Windows nemokamai (LT)", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/zkduwe" },
  { id: 10, image: IMG3, title: "Crimson Sky Firestorm Arena on android", github: "https://github.com", demo: "https://manthispoc.gumroad.com/l/dpfeuy" },
];

const Portfolio = () => {
  return (
    <section id="portfolio">
      <div className="section__header">
        <Reveal y={10}><h5>My Recent Work</h5></Reveal>
        <Reveal y={12} delay={0.06}><h2>Portfolio</h2></Reveal>
      </div>

      <div className="container portfolio__container">
        {data.map((item, i) => (
          <Reveal key={item.id} y={14} delay={i * 0.06}>
            <article className="portfolio__item">
              <div className="portfolio__item-image">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>

              <h3>{item.title}</h3>

              <div className="portfolio__item-cta">
                <a href={item.github} className="btn" target="_blank" rel="noreferrer">GitHub</a>
                <a href={item.demo} className="btn btn-primary" target="_blank" rel="noreferrer">To pay</a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;