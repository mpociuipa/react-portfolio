import React from 'react';
import './portfolio.css';
import IMG1 from '../../assets/arklys.jpg';
import IMG2 from '../../assets/arklys.jpg';
import IMG3 from '../../assets/lektuvas.png';
import IMG4 from '../../assets/Lenktynės.jpg';
import IMG5 from '../../assets/Lenktynės.jpg';
import IMG6 from '../../assets/Namas.jpg';

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
    title: '3D Race game on android',
    github: 'https://github.com',
    demo: 'https://manthispoc.gumroad.com/l/zlsam'
  },
  {
    id: 6,
    image: IMG6,
    title: 'home construction app for Lithuanians',
    github: 'https://github.com',
    demo: 'https://manthispoc.gumroad.com/l/bbhjs'
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
