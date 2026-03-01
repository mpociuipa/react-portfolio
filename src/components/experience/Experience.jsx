import React from 'react';
import './experience.css';
import { BsPatchCheckFill } from 'react-icons/bs';

const Experience = () => {
  return (
    <section id='experience'>
  <h5>Technical Expertise</h5>
  <h2>Engineering Experience</h2>

  <div className="container experience__container">

    {/* ENGINEERING FOUNDATIONS */}
    <div className="experience__section">
      <h3>Engineering Foundations</h3>
      <div className="experience__content">

        {[
          "Git (branching strategies, remote workflows)",
          "Linux CLI & Server Environments",
          "SSH Workflows & Remote Administration",
          "System-Level Debugging & Problem Solving"
        ].map(skill => (
          <article key={skill} className='experience__details'>
            <BsPatchCheckFill className='experience__details-icon' />
            <div>
              <h4>{skill}</h4>
              <small className='text-light'>Applied</small>
            </div>
          </article>
        ))}

      </div>
    </div>

    {/* FRONTEND */}
    <div className="experience__section">
      <h3>Frontend Engineering</h3>
      <div className="experience__content">

        {[
          "React / Next.js",
          "TypeScript (ES6+)",
          "Component Architecture & State Design",
          "Responsive UI (Tailwind, Bootstrap)",
          "Performance-Oriented UI Thinking"
        ].map(skill => (
          <article key={skill} className='experience__details'>
            <BsPatchCheckFill className='experience__details-icon' />
            <div>
              <h4>{skill}</h4>
              <small className='text-light'>Experience</small>
            </div>
          </article>
        ))}

      </div>
    </div>

    {/* BACKEND */}
    <div className="experience__section">
      <h3>Backend & API Architecture</h3>
      <div className="experience__content">

        {[
          "Node.js / Express",
          "Python (FastAPI)",
          "Laravel (PHP)",
          "REST API Design & Integration",
          "Authentication & Backend Structure",
          "Database Modeling (MySQL, PostgreSQL)"
        ].map(skill => (
          <article key={skill} className='experience__details'>
            <BsPatchCheckFill className='experience__details-icon' />
            <div>
              <h4>{skill}</h4>
              <small className='text-light'>Applied</small>
            </div>
          </article>
        ))}

      </div>
    </div>
    {/* DATABASE ENGINEERING */}
<div className="experience__section">
  <h3>Database Engineering</h3>
  <div className="experience__content">

    {[
      "MySQL (Schema Design & Query Optimization)",
      "PostgreSQL",
      "Oracle Database",
      "MongoDB (NoSQL Concepts)",
      "Firebase (Cloud Data Integration)",
      "Relational Modeling & Data Structuring"
    ].map(skill => (
      <article key={skill} className='experience__details'>
        <BsPatchCheckFill className='experience__details-icon' />
        <div>
          <h4>{skill}</h4>
          <small className='text-light'>Applied</small>
        </div>
      </article>
    ))}

  </div>
</div>

    {/* HYBRID & MOBILE */}
    <div className="experience__section">
      <h3>Hybrid & Mobile Engineering</h3>
      <div className="experience__content">

        {[
          "Electron (Desktop Applications)",
          "Web-to-Desktop Packaging (.exe)",
          "Capacitor (Web → iOS Integration)",
          "iOS Application Builds (.ipa)",
          "CI/CD for iOS (GitHub Actions + macOS runners)",
          "App Store / TestFlight Deployment Workflow"
        ].map(skill => (
          <article key={skill} className='experience__details'>
            <BsPatchCheckFill className='experience__details-icon' />
            <div>
              <h4>{skill}</h4>
              <small className='text-light'>Applied</small>
            </div>
          </article>
        ))}

      </div>
    </div>

    {/* CLOUD & DEVOPS */}
    <div className="experience__section">
      <h3>Cloud & DevOps</h3>
      <div className="experience__content">

        {[
          "Oracle Cloud Infrastructure",
          "Server Provisioning & Configuration",
          "CI/CD Pipelines (GitHub Actions)",
          "Automated Build Workflows (Web & iOS)",
          "Environment Variables & Secrets Management",
          "Production Deployment Practices"
        ].map(skill => (
          <article key={skill} className='experience__details'>
            <BsPatchCheckFill className='experience__details-icon' />
            <div>
              <h4>{skill}</h4>
              <small className='text-light'>Applied</small>
            </div>
          </article>
        ))}

      </div>
    </div>

    {/* SECURITY */}
    <div className="experience__section">
      <h3>Systems & Security Awareness</h3>
      <div className="experience__content">

        {[
          "HTTPS & TLS Concepts",
          "MITM & Attack Surface Awareness",
          "Backend Exposure Risk Analysis",
          "Security-Oriented System Thinking"
        ].map(skill => (
          <article key={skill} className='experience__details'>
            <BsPatchCheckFill className='experience__details-icon' />
            <div>
              <h4>{skill}</h4>
              <small className='text-light'>Applied / Learning</small>
            </div>
          </article>
        ))}

      </div>
    </div>

  </div>
</section>
  );
};

export default Experience;

