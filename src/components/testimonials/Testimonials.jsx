import React from "react";
import "./testimonials.css";

import AVTR1 from "../../assets/avatar1.jpg";
import AVTR2 from "../../assets/avatar2.jpg";
import AVTR3 from "../../assets/avatar3.jpg";
import AVTR4 from "../../assets/avatar4.jpg";
import AVTR5 from "../../assets/avatar5.jpg";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import Reveal from "../animations/Reveal";

const data = [
  {
    avatar: AVTR1,
    name: "Tina Snow",
    role: "Product Lead",
    review:
      "Mantas combines deep technical skill with systems thinking. He approaches development not just as coding, but as architecture and long-term scalability.",
  },
  {
    avatar: AVTR2,
    name: "Shatta Wale",
    role: "Creative Director",
    review:
      "His projects demonstrate strong UX awareness and structured component design. Performance, fallback logic and user flow are clearly intentional.",
  },
  {
    avatar: AVTR3,
    name: "Kwame Despite",
    role: "Mobile Consultant",
    review:
      "Cross-platform capability stands out. From web to Android builds and deployment workflows, his technical maturity is evident.",
  },
  {
    avatar: AVTR4,
    name: "Nana Ama McBrown",
    role: "UX Strategist",
    review:
      "He consistently asks not only how to build, but how to build better. System clarity and user experience are always part of his process.",
  },
  {
    avatar: AVTR5,
    name: "Margaret McBrown",
    role: "Technical Advisor",
    review:
      "Strong learning mindset and resilience. Handles technical issues methodically and improves through iteration.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials">
      <div className="section__header">
    <Reveal y={10}><h5>What People Say</h5></Reveal>
    <Reveal y={12} delay={0.06}><h2>Testimonials</h2></Reveal>
  </div>

      <Reveal y={16} delay={0.1}>
        <Swiper
          className="container testimonials__container"
          modules={[Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={700}
        >
          {data.map(({ avatar, name, role, review }, index) => (
            <SwiperSlide key={index} className="testimonial">
              <div className="client__avatar">
                <img src={avatar} alt={name} loading="lazy" />
              </div>

              <h5 className="client__name">{name}</h5>
              <span className="client__role">{role}</span>

              <p className="client__review">"{review}"</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  );
};

export default Testimonials;