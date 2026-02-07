import React from 'react';
import './experience.css';
import { BsPatchCheckFill } from 'react-icons/bs';

const Experience = () => {
  return (
    <section id='experience'>
      <h5>What Skills I Have</h5>
      <h2>My Experience</h2>

      <div className="container experience__container">

        {/* BASIC SECTION */}
        <div className="experience__basic">
          <h3>Core Engineering</h3>
          <div className="experience__content">

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon' />
              <div>
                <h4>Git (branching, merge, remote repos)</h4>
                <small className='text-light'>Experience</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon' />
              <div>
                <h4>Linux (CLI, server environment)</h4>
                <small className='text-light'>Intermediate</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon' />
              <div>
                <h4>SSH Workflows & Server Administration</h4>
                <small className='text-light'>Experience</small>
              </div>
            </article>

          </div>
        </div>

        {/* FRONTEND SECTION */}
        <div className="experience__frontend">
          <h3>Frontend Development</h3>
          <div className="experience__content">

            {[
              "HTML",
              "CSS",
              "Bootstrap",
              "Tailwind CSS",
              "JavaScript (ES6+)",
              "TypeScript",
              "React",
              "Next.js"
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

        {/* HYBRID SECTION */}
        <div className="experience__hybrid">
          <h3>Desktop / Hybrid Applications</h3>
          <div className="experience__content">

            {[
              "Electron",
              "Web-to-Desktop Conversion",
              "Executable Builds (.exe)",
              "Basic Desktop Architecture"
            ].map(skill => (
              <article key={skill} className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon' />
                <div>
                  <h4>{skill}</h4>
                  <small className='text-light'>Intermediate</small>
                </div>
              </article>
            ))}

          </div>
        </div>

        {/* BACKEND SECTION */}
        <div className="experience__backend">
          <h3>Backend Development</h3>
          <div className="experience__content">

            {[
              "Node.js",
              "Express.js",
              "Python",
              "FastAPI",
              "Laravel",
              "REST API Design"
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

        {/* DATABASE SECTION */}
        <div className="experience__database">
          <h3>Database Systems</h3>
          <div className="experience__content">

            {[
              "MySQL",
              "PostgreSQL",
              "Oracle",
              "MongoDB",
              "Firebase"
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

        {/* INFRASTRUCTURE */}
        <div className="experience__infrastructure">
          <h3>Infrastructure / Cloud</h3>
          <div className="experience__content">

            {[
              "Oracle Cloud",
              "SSH Deployment",
              "Server Configuration",
              "Basic Hosting Setup",
              "SaaS-Oriented Thinking"
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
        <div className="experience__security">
          <h3>Security & Systems Curiosity</h3>
          <div className="experience__content">

            {[
              "MITM Concepts",
              "HTTPS Protocol Curiosity",
              "SSL Stripping Awareness",
              "Backend Attack Surface Awareness"
            ].map(skill => (
              <article key={skill} className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon' />
                <div>
                  <h4>{skill}</h4>
                  <small className='text-light'>Learning / Applied</small>
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

