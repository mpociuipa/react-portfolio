import React from 'react';
import './about.css';
import ME from '../../assets/me-about.jpg';
import {FaAward} from 'react-icons/fa';
import {FiUsers} from 'react-icons/fi';
import {VscFolderLibrary} from 'react-icons/vsc';
import { useRef } from "react";

const About = () => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
            <video
            ref={videoRef}
            muted
            playsInline
            className="about__video"
            aria-label="Mantas Počiuipa"
            poster={ME}  // fallback jei video neužsikrauna
            >
            <source src={require('../../assets/about-video.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>4+ Years Working</small>
            </article>

            <article className='about__card'>
              <FiUsers className='about__icon'/>
              <h5>Clients</h5>
              <small>100+ Worldwide</small>
            </article>

            <article className='about__card'>
              <VscFolderLibrary className='about__icon'/>
              <h5>Projects</h5>
              <small>10+ Comleted</small>
            </article>
          </div>

          <p>
            I am a full-stack engineer focused on building production-ready web and hybrid applications.
            My work spans frontend architecture, backend API design, cloud infrastructure, and CI/CD automation.

            Beyond web systems, I extend applications into desktop and mobile environments —
            building Electron-based desktop apps and packaging hybrid applications for both iOS (.ipa) and Android (.apk).
            I work with CI pipelines (GitHub Actions) to automate cross-platform build workflows.

            I enjoy designing systems that are not only functional, but structured, scalable, and deployment-ready.
        </p>
          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>
        </div>
    </section>
  )
}

export default About;
