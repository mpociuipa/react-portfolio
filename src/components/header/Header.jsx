import React from 'react';
import './header.css';
import CTA from './CTA';
import ME from '../../assets/me.png';
import HeaderSocial from './HeaderSocials';

const Header = () => {
  return (
    <header id="header">
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Mantas Počiuipa</h1>
        <h5 className="text-light">Multi-stack full stack, SQL + NoSQL experience, Linux + Git user (engineering base), Web + Desktop builder, Cloud deploy capable, Security-inclined</h5>

        <CTA />
        <HeaderSocial />

        <div className="me">
          <img src={ME} alt="3D Games" />
        </div>

        <a href="#contact" className="scroll__down">Scroll Down</a>
      </div>
    </header>
  );
};

export default Header;

