import React from "react";
import "./services.css";
import { BiCheck } from "react-icons/bi";

import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const services = [
  {
    title: "Full-Stack Web Engineering",
    items: [
      "Frontend architecture (React, Next.js, TypeScript)",
      "Backend API development (Node.js, FastAPI, Laravel)",
      "Database modeling (MySQL, PostgreSQL, MongoDB)",
      "Authentication, security & production-ready structure",
    ],
  },
  {
    title: "Cross-Platform Applications",
    items: [
      "Desktop apps with Electron (.exe builds)",
      "Android signed release builds (.apk)",
      "iOS build workflows (.ipa via CI/CD)",
      "App Store / TestFlight deployment setup",
    ],
  },
  {
    title: "Cloud & Deployment",
    items: [
      "Oracle Cloud server configuration",
      "CI/CD automation (GitHub Actions)",
      "Environment variables & secrets management",
      "Production deployment & hosting strategy",
    ],
  },
  {
    title: "Technical UI & System Design",
    items: [
      "Performance-oriented UI architecture",
      "Responsive layouts (Tailwind / Bootstrap)",
      "Minimalist, structured UX thinking",
      "Security-aware frontend & backend integration",
    ],
  },
];

const Services = () => {
  return (
    <section id="services">
      <div className="section__header">
    <Reveal y={10}><h5>What I Provide</h5></Reveal>
    <Reveal y={12} delay={0.06}><h2>Engineering Services</h2></Reveal>
  </div>

      <Reveal y={16} delay={0.1}>
        <Stagger>
          <div className="container services__container">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <article className="service">
                  <div className="service__head">
                    <h3>{service.title}</h3>
                  </div>

                  <ul className="service__list">
                    {service.items.map((item, i) => (
                      <li key={i}>
                        <BiCheck className="service__list-icon" />
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Reveal>
    </section>
  );
};

export default Services;