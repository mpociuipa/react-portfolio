import React from 'react';
import './testimonials.css';
import AVTR1 from '../../assets/avatar1.jpg';
import AVTR2 from '../../assets/avatar2.jpg';
import AVTR3 from '../../assets/avatar3.jpg';
import AVTR4 from '../../assets/avatar4.jpg';
import AVTR5 from '../../assets/avatar5.jpg';

// import Swiper core and required modules
import { Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const data = [
  {
    avatar: AVTR1,
    name: 'Tina Snow',
    review: 'Your strengths as a programmer are your ability to work with advanced technologies. This shows that you are not just a "coder", but also a systems thinker.'
  },
  {
    avatar: AVTR2,
    name: 'Shatta Wale',
    review: 'Design Thinking From the structure of your game project, it is clear that: You are able to organize your code (components, hooks, views, UI). You think about UX, fallbacks, performance. You use animations, 3D interactions and fallback rendering if the model is not available. You not only create things that work, but also try to make the user happy.'
  },
  {
    avatar: AVTR3,
    name: 'Kwame Despite',
    review: 'You know how to think about cross-platform adaptation Building an APK for an Android phone shows that you think not only about the web, but also about the mobile experience. Your ability to deal with file structure, public/, vite, capacitor – shows technical maturity.'
  },
  {
    avatar: AVTR4,
    name: 'Nana Ama McBrown',
    review: 'You are looking not only for "how to do it", but also for "why and how to do it better" Questions about the quality of UI/UX design, fallback mechanisms, content presentation, game logic - show that your approach is deeper than just technical. You want not only "working code", but also a good system.'
  },
  {
    avatar: AVTR5,
    name: 'Margaret McBrown',
    review: 'Learning ability and perseverance You are not afraid to delve into mistakes ([error] android platform has not been added yet) and move on. A few good questions about building, file location, structure, and optimization show that you learn quickly through practice.'
  },
]

const Testimonials = () => {
  return (
    <section id='testimonials'>
      <h5>Review from clients</h5>
      <h2>Testimonials</h2>

      <Swiper className="container testimonials__container"
            // install Swiper modules
            modules={[Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            pagination={{ clickable: true }}>
       {
        data.map(({avatar, name, review}, index) => {
          return (
            <SwiperSlide key={index} className="testimonial">
            <div className="client__avatar">
              <img src={avatar} alt="3D games"/>
            </div>
              <h5 className="client__name">{name}</h5>
              <small className="client__review">{review}</small>
          </SwiperSlide>
          )
        })
       }
       
      </Swiper>
    </section>
  )
}

export default Testimonials;
