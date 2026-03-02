import React from 'react';
import './header.css';
import CTA from './CTA';
import ME from '../../assets/me.png';
import HeaderSocial from './HeaderSocials';

const Header = () => {
  const skills = [
    "Multi-stack Full Stack Developer",
    "SQL + NoSQL Experience",
    "Linux + Git (Engineering Base)",
    "Web + Desktop Builder",
    "Cloud Deployment Capable",
    "Security-Inclined"
  ];

  return (
    <header id="header">
      <div className="container header__container">

        <div className="header__top">
          <h5>Hello I'm</h5>
          <h1>Mantas Počiuipa</h1>

          <h5 className="text-light header__skills">
            {skills.map((skill, index) => (
              <span key={index} className="header__skill-line">{skill}</span>
            ))}
          </h5>

          <CTA />
        </div>

        {/* HERO FULL WIDTH (social/scroll bus nuo container, ne ant arkos) */}
        <div className="header__hero">
          <div className="header__hero-inner">
            <div className="me">
              <img src={ME} alt="3D game" />
            </div>
          </div>
        </div>

        {/* SVARBIAUSIA: social + scroll IŠKELTI IŠ hero */}
        <HeaderSocial />
        <a href="#contact" className="scroll__down">Scroll Down</a>

      </div>
    </header>
  );
};

export default Header;
