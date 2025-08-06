import React from 'react';
import './services.css';
import {BiCheck} from 'react-icons/bi';

const Services = () => {
  return (
    <section id='services'>
      <h5>What I Offer</h5>
      <h2>Services</h2>

      <div className="container services__container">
        <article className="service">
          <div className="service__head">
            <h3>UI/UX Design</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className='service__list-icon' />
              <p>The UI/UX design balances technical 3D realism with a minimalist user interface. Attention to detail – from fallback geometry to dynamic model movement – ensures that the game is not only playable, but also visually and emotionally experienced.</p>
            </li>
          </ul>
        </article>
        {/* END OF UI/UX */}
        <article className="service">
          <div className="service__head">
            <h3>Web Development</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className='service__list-icon' />
              <p>Web Development – what is it?
Web Development – is the process of creating and maintaining websites and web applications. It includes technical programming, design implementation and server-side logic development.</p>
            </li>
            <li>
              <BiCheck className='service__list-icon' />
              <p>Web Development is divided into:
Front-end (user interface):
Creates what the user sees and interacts with.
Uses: HTML, CSS, JavaScript, React, Vue, Tailwind, etc.
Back-end (server-side):
Manages databases, authentication, APIs and logic.
Uses: Node.js, Python (FastAPI, Django), PHP, Java, MySQL, MongoDB.
Full-stack:
Combines front-end and back-end skills.</p>
            </li>
            <li>
              <BiCheck className='service__list-icon' />
              <p>Additional areas:
DevOps – implementation and infrastructure management.
UI/UX Design – convenient and effective user experience.
Mobile Web – websites and applications adapted for mobile.</p>
            </li>
          </ul>
        </article>
        {/* WEB DEVELOPMENT */}
        <article className="service">
          <div className="service__head">
            <h3>Content Creation</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className='service__list-icon' />
              <p>Content Creation is a creative process that allows you to convey a message, create value, or evoke emotion through digital content, adapting to the audience and platform.</p>
            </li>
          </ul>
        </article>
        {/* END OF CONTENT CREATION */}
      </div>
    </section>
  )
}

export default Services;
