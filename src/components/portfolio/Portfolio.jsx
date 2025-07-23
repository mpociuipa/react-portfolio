import React from 'react';
import './portfolio.css';
import IMG1 from '../../assets/arklys.jpg';
import IMG2 from '../../assets/arklys.jpg';
import IMG3 from '../../assets/lektuvas.png';
import IMG4 from '../../assets/Lenktynės.jpg';
import IMG5 from '../../assets/portfolio5.png';
import IMG6 from '../../assets/portfolio6.jpg';

// DO NOT USE THE IMAGES IN PRODUCTION

const data = [
  {
    id: 1,
    image: IMG1,
    title: 'Cheerful horse on android',
    github: 'https://github.com',
    demo: 'https://manthispoc.gumroad.com/l/epptjq'
  },
  {
    id: 2,
    image: IMG2,
    title: 'Cheerful horse on windows',
    github: 'https://github.com',
    demo: 'https://manthispoc.gumroad.com/l/lykjt'
  },
  {
    id: 3,
    image: IMG3,
    title: 'Crimson Sky Firestorm Arena on windows',
    github: 'https://github.com',
    demo: 'https://manthispoc.gumroad.com/l/dinhw'
  },
  {
    id: 4,
    image: IMG4,
    title: '3D Race game on windows',
    github: 'https://github.com',
    demo: 'https://manthispoc.gumroad.com/l/cxsns'
  },
  {
    id: 5,
    image: IMG5,
    title: 'Charts templates & infographics in Figma',
    github: 'https://github.com',
    demo: 'https://dribbble.com/shots/16541289-Orion-UI-kit-Charts-templates-infographics-in=Figma'
  },
  {
    id: 6,
    image: IMG6,
    title: 'Charts templates & infographics in Figma',
    github: 'https://github.com',
    demo: 'https://dribbble.com/shots/15887665-Orion-UI-kit-Charts-templates-infographics-in-Figma'
  },
]

const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {
          data.map(({id, image, title, github, demo}) => {
            return (
              <article key={id}className="portfolio__item">
              <div className="portfolio__item-image">
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
            <div className="portfolio__item-cta">
              <a href={github} className='btn' target='_blank'>Github</a>
              <a href={demo} className='btn btn-primary' target='_blank'>To pay</a>
            </div>
            </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Portfolio;
