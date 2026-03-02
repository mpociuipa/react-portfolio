import React from "react";
import "./experience.css";
import { BsPatchCheckFill } from "react-icons/bs";

import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const Experience = () => {
  const sections = [
    {
      title: "Engineering Foundations",
      level: "Applied",
      skills: [
        "Git (branching strategies, remote workflows)",
        "Linux CLI & Server Environments",
        "SSH Workflows & Remote Administration",
        "System-Level Debugging & Problem Solving",
      ],
    },
    {
      title: "Frontend Engineering",
      level: "Experience",
      skills: [
        "React / Next.js",
        "TypeScript (ES6+)",
        "Component Architecture & State Design",
        "Responsive UI (Tailwind, Bootstrap)",
        "Performance-Oriented UI Thinking",
      ],
    },
    {
      title: "Backend & API Architecture",
      level: "Applied",
      skills: [
        "Node.js / Express",
        "Python (FastAPI)",
        "Laravel (PHP)",
        "REST API Design & Integration",
        "Authentication & Backend Structure",
        "Database Modeling (MySQL, PostgreSQL)",
      ],
    },
    {
      title: "Database Engineering",
      level: "Applied",
      skills: [
        "MySQL (Schema Design & Query Optimization)",
        "PostgreSQL",
        "Oracle Database",
        "MongoDB (NoSQL Concepts)",
        "Firebase (Cloud Data Integration)",
        "Relational Modeling & Data Structuring",
      ],
    },
    {
      title: "Hybrid & Mobile Engineering",
      level: "Applied",
      skills: [
        "Electron (Desktop Applications)",
        "Web-to-Desktop Packaging (.exe)",
        "Capacitor (Web → iOS Integration)",
        "iOS Application Builds (.ipa)",
        "CI/CD for iOS (GitHub Actions + macOS runners)",
        "App Store / TestFlight Deployment Workflow",
      ],
    },
    {
      title: "Cloud & DevOps",
      level: "Applied",
      skills: [
        "Oracle Cloud Infrastructure",
        "Server Provisioning & Configuration",
        "CI/CD Pipelines (GitHub Actions)",
        "Automated Build Workflows (Web & iOS)",
        "Environment Variables & Secrets Management",
        "Production Deployment Practices",
      ],
    },
    {
      title: "Systems & Security Awareness",
      level: "Applied / Learning",
      skills: [
        "HTTPS & TLS Concepts",
        "MITM & Attack Surface Awareness",
        "Backend Exposure Risk Analysis",
        "Security-Oriented System Thinking",
      ],
    },
  ];

  return (
    <section id="experience">
     <div className="section__header">
    <Reveal y={10}><h5>Technical Expertise</h5></Reveal>
    <Reveal y={12} delay={0.06}><h2>Engineering Experience</h2></Reveal>
  </div>

      <div className="container experience__container">
        {sections.map((sec, i) => (
          <Reveal key={sec.title} y={18} delay={0.08 + i * 0.03}>
            <div className="experience__section">
              <h3>{sec.title}</h3>

              <Stagger>
                <div className="experience__content">
                  {sec.skills.map((skill) => (
                    <StaggerItem key={skill}>
                      <article className="experience__details">
                        <BsPatchCheckFill className="experience__details-icon" />
                        <div>
                          <h4>{skill}</h4>
                          <small className="text-light">{sec.level}</small>
                        </div>
                      </article>
                    </StaggerItem>
                  ))}
                </div>
              </Stagger>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
