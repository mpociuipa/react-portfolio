import React from "react";
import "./footer.css";
import { FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoTwitter } from "react-icons/io";

import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const Footer = () => {
  const links = [
    { name: "Home", id: "#header" },
    { name: "About", id: "#about" },
    { name: "Experience", id: "#experience" },
    { name: "Services", id: "#services" },
    { name: "Portfolio", id: "#portfolio" },
    { name: "Testimonials", id: "#testimonials" },
    { name: "Contact", id: "#contact" },
  ];

  return (
    <footer className="footer">
      <Reveal y={10}>
        <a href="#header" className="footer__logo">
          MANTAS POČIUIPA
        </a>
      </Reveal>

      <Stagger>
        <ul className="permalinks">
          {links.map((link) => (
            <StaggerItem key={link.name}>
              <li>
                <a href={link.id}>{link.name}</a>
              </li>
            </StaggerItem>
          ))}
        </ul>
      </Stagger>

      <Reveal y={12} delay={0.1}>
        <div className="footer__socials">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <IoLogoTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FiInstagram />
          </a>
        </div>
      </Reveal>

      <Reveal y={8} delay={0.15}>
        <div className="footer__copyright">
          <small>© {new Date().getFullYear()} Mantas Počiuipa. All rights reserved.</small>
        </div>
      </Reveal>
    </footer>
  );
};

export default Footer;