import React, { useRef } from "react";
import "./about.css";
import ME from "../../assets/me-about.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const About = () => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <section id="about">
      <div className="section__header">
    <Reveal y={10}><h5>Get To Know</h5></Reveal>
    <Reveal y={12} delay={0.06}><h2>About Me</h2></Reveal>
  </div>

      <div className="container about__container">
        {/* LEFT (video) */}
        <Reveal y={18} delay={0.1}>
          <div className="about__me">
            <div
              className="about__me-image"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <video
                ref={videoRef}
                muted
                playsInline
                className="about__video"
                aria-label="Mantas Počiuipa"
                poster={ME}
              >
                <source
                  src={require("../../assets/about-video.mp4")}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </Reveal>

        {/* RIGHT (cards + text + button) */}
        <Reveal y={18} delay={0.14}>
          <div className="about__content">
            {/* Cards stagger */}
            <Stagger>
              <div className="about__cards">
                <StaggerItem>
                  <article className="about__card">
                    <FaAward className="about__icon" />
                    <h5>Experience</h5>
                    <small>4+ Years Working</small>
                  </article>
                </StaggerItem>

                <StaggerItem>
                  <article className="about__card">
                    <FiUsers className="about__icon" />
                    <h5>Clients</h5>
                    <small>100+ Worldwide</small>
                  </article>
                </StaggerItem>

                <StaggerItem>
                  <article className="about__card">
                    <VscFolderLibrary className="about__icon" />
                    <h5>Projects</h5>
                    <small>10+ Completed</small>
                  </article>
                </StaggerItem>
              </div>
            </Stagger>

            {/* Paragraph reveal (optional, bet atrodo premium) */}
            <Reveal y={12} delay={0.12}>
              <p>
                I am a full-stack engineer focused on building production-ready web
                and hybrid applications. My work spans frontend architecture, backend
                API design, cloud infrastructure, and CI/CD automation.
                <br />
                <br />
                Beyond web systems, I extend applications into desktop and mobile
                environments — building Electron-based desktop apps and packaging
                hybrid applications for both iOS (.ipa) and Android (.apk). I work
                with CI pipelines (GitHub Actions) to automate cross-platform build
                workflows.
                <br />
                <br />
                I enjoy designing systems that are not only functional, but
                structured, scalable, and deployment-ready.
              </p>
            </Reveal>

            <Reveal y={10} delay={0.18}>
              <a href="#contact" className="btn btn-primary">
                Let's Talk
              </a>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
