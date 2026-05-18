import React, { useState, useEffect } from "react";
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

const avatars = [AVTR1, AVTR2, AVTR3, AVTR4, AVTR5];
const names   = ["Tina Snow","Shatta Wale","Kwame Despite","Nana Ama McBrown","Margaret McBrown"];

const TEST_T = {
  en: { sub: "What People Say", title: "Testimonials",
    roles:   ["Product Lead","Creative Director","Mobile Consultant","UX Strategist","Technical Advisor"],
    reviews: ["\"Mantas combines deep technical skill with systems thinking. He approaches development not just as coding, but as architecture and long-term scalability.\"","\"His projects demonstrate strong UX awareness and structured component design. Performance, fallback logic and user flow are clearly intentional.\"","\"Cross-platform capability stands out. From web to Android builds and deployment workflows, his technical maturity is evident.\"","\"He consistently asks not only how to build, but how to build better. System clarity and user experience are always part of his process.\"","\"Strong learning mindset and resilience. Handles technical issues methodically and improves through iteration.\""],
  },
  lt: { sub: "Ką sako žmonės", title: "Atsiliepimai",
    roles:   ["Produkto vadovas","Kūrybos direktorius","Mobiliųjų sprendimų konsultantas","UX strategas","Techninis patarėjas"],
    reviews: ["\"Mantas derina gilias technines žinias su sisteminis mąstymu. Jis žiūri į kūrimą ne tik kaip į kodavimą, bet ir kaip į architektūrą bei ilgalaikį keičiamumą.\"","\"Jo projektai rodo stiprų UX supratimą ir struktūrizuotą komponentų dizainą. Našumas, atsarginė logika ir vartotojo srautas yra aiškiai apgalvoti.\"","\"Išsiskiria kelių platformų galimybės. Nuo web iki Android versijų ir diegimo darbo eigų – jo techninis brandumas akivaizdus.\"","\"Jis nuolat klausia ne tik kaip sukurti, bet ir kaip sukurti geriau. Sistemos aiškumas ir vartotojo patirtis visada yra jo proceso dalis.\"","\"Stiprus mokymosi požiūris ir atsparumas. Sprendžia technines problemas metodiškai ir tobulėja per iteracijas.\""],
  },
  de: { sub: "Was die Leute sagen", title: "Referenzen",
    roles:   ["Produktleiter","Kreativdirektor","Mobilberater","UX-Stratege","Technischer Berater"],
    reviews: ["\"Mantas verbindet tiefes technisches Können mit Systemdenken. Er geht an die Entwicklung nicht nur als Coding heran, sondern als Architektur und langfristige Skalierbarkeit.\"","\"Seine Projekte zeigen starkes UX-Bewusstsein und strukturiertes Komponentendesign. Performance, Fallback-Logik und Benutzerfluss sind klar durchdacht.\"","\"Die plattformübergreifende Fähigkeit sticht hervor. Von Web bis Android-Builds und Deployment-Workflows ist seine technische Reife offensichtlich.\"","\"Er fragt konsequent nicht nur wie man baut, sondern wie man besser baut. Systemklarheit und Benutzererfahrung sind immer Teil seines Prozesses.\"","\"Starke Lernmentalität und Widerstandsfähigkeit. Behandelt technische Probleme methodisch und verbessert sich durch Iteration.\""],
  },
  fr: { sub: "Ce que disent les gens", title: "Témoignages",
    roles:   ["Chef de produit","Directeur créatif","Consultant mobile","Stratège UX","Conseiller technique"],
    reviews: ["\"Mantas combine une compétence technique approfondie avec la pensée systémique. Il aborde le développement non seulement comme du codage, mais comme de l'architecture et de la scalabilité à long terme.\"","\"Ses projets démontrent une forte conscience UX et une conception de composants structurée. Les performances, la logique de repli et le flux utilisateur sont clairement intentionnels.\"","\"La capacité multiplateforme se distingue. Du web aux builds Android et aux workflows de déploiement, sa maturité technique est évidente.\"","\"Il demande systématiquement non seulement comment construire, mais comment mieux construire. La clarté du système et l'expérience utilisateur font toujours partie de son processus.\"","\"Forte mentalité d'apprentissage et résilience. Traite les problèmes techniques méthodiquement et s'améliore par itération.\""],
  },
  it: { sub: "Cosa dicono le persone", title: "Testimonianze",
    roles:   ["Responsabile prodotto","Direttore creativo","Consulente mobile","Stratega UX","Consulente tecnico"],
    reviews: ["\"Mantas combina profonde competenze tecniche con il pensiero sistemico. Affronta lo sviluppo non solo come codifica, ma come architettura e scalabilità a lungo termine.\"","\"I suoi progetti dimostrano una forte consapevolezza UX e un design di componenti strutturato. Performance, logica di fallback e flusso utente sono chiaramente intenzionali.\"","\"La capacità multipiattaforma spicca. Dal web alle build Android e ai workflow di deployment, la sua maturità tecnica è evidente.\"","\"Chiede costantemente non solo come costruire, ma come costruire meglio. La chiarezza del sistema e l'esperienza utente fanno sempre parte del suo processo.\"","\"Forte mentalità di apprendimento e resilienza. Gestisce i problemi tecnici metodicamente e migliora attraverso l'iterazione.\""],
  },
  es: { sub: "Lo que dice la gente", title: "Testimonios",
    roles:   ["Líder de producto","Director creativo","Consultor móvil","Estratega UX","Asesor técnico"],
    reviews: ["\"Mantas combina habilidad técnica profunda con pensamiento sistémico. Aborda el desarrollo no solo como codificación, sino como arquitectura y escalabilidad a largo plazo.\"","\"Sus proyectos demuestran una fuerte conciencia UX y un diseño de componentes estructurado. El rendimiento, la lógica de respaldo y el flujo de usuario son claramente intencionales.\"","\"La capacidad multiplataforma destaca. Desde web hasta builds de Android y flujos de despliegue, su madurez técnica es evidente.\"","\"Pregunta consistentemente no solo cómo construir, sino cómo construir mejor. La claridad del sistema y la experiencia del usuario siempre son parte de su proceso.\"","\"Fuerte mentalidad de aprendizaje y resiliencia. Maneja los problemas técnicos metódicamente y mejora a través de la iteración.\""],
  },
  uk: { sub: "Що кажуть люди", title: "Відгуки",
    roles:   ["Керівник продукту","Креативний директор","Мобільний консультант","UX стратег","Технічний радник"],
    reviews: ["\"Манtas поєднує глибокі технічні навички з системним мисленням. Він підходить до розробки не лише як до кодування, а як до архітектури та довгострокової масштабованості.\"","\"Його проекти демонструють сильну обізнаність з UX та структурований дизайн компонентів. Продуктивність, логіка резервування та потік користувача явно навмисні.\"","\"Крос-платформна можливість виділяється. Від веб до збірок Android та робочих процесів розгортання — його технічна зрілість очевидна.\"","\"Він постійно запитує не лише як будувати, але як будувати краще. Чіткість системи та досвід користувача завжди є частиною його процесу.\"","\"Сильне мислення навчання та стійкість. Методично вирішує технічні проблеми та вдосконалюється через ітерації.\""],
  },
  zh: { sub: "人们怎么说", title: "推荐",
    roles:   ["产品负责人","创意总监","移动顾问","用户体验策略师","技术顾问"],
    reviews: ["\"Mantas将深厚的技术技能与系统思维相结合。他不仅将开发视为编码，更视为架构和长期可扩展性。\"","\"他的项目展示了强烈的用户体验意识和结构化的组件设计。性能、回退逻辑和用户流程显然是经过深思熟虑的。\"","\"跨平台能力突出。从网页到Android构建和部署工作流，他的技术成熟度显而易见。\"","\"他始终不仅询问如何构建，还询问如何更好地构建。系统清晰度和用户体验始终是他流程的一部分。\"","\"强烈的学习心态和韧性。有条不紊地处理技术问题，并通过迭代不断改进。\""],
  },
  ru: { sub: "Что говорят люди", title: "Отзывы",
    roles:   ["Руководитель продукта","Креативный директор","Мобильный консультант","UX-стратег","Технический советник"],
    reviews: ["\"Манtас сочетает глубокие технические навыки с системным мышлением. Он подходит к разработке не только как к кодированию, но и как к архитектуре и долгосрочной масштабируемости.\"","\"Его проекты демонстрируют сильную осведомлённость об UX и структурированный дизайн компонентов. Производительность, логика резервирования и пользовательский поток явно продуманы.\"","\"Кросс-платформенные возможности выделяются. От веба до сборок Android и рабочих процессов развёртывания — его техническая зрелость очевидна.\"","\"Он последовательно спрашивает не только как строить, но и как строить лучше. Чёткость системы и пользовательский опыт всегда являются частью его процесса.\"","\"Сильный настрой на обучение и устойчивость. Методично решает технические проблемы и совершенствуется через итерации.\""],
  },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const Testimonials = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handler = () => forceUpdate({});
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = TEST_T[getLang()] || TEST_T["en"];

  return (
    <section id="testimonials">
      <div className="section__header">
        <Reveal y={10}><h5>{t.sub}</h5></Reveal>
        <Reveal y={12} delay={0.06}><h2>{t.title}</h2></Reveal>
      </div>
      <Reveal y={16} delay={0.1}>
        <Swiper className="container testimonials__container" modules={[Pagination, Autoplay]} spaceBetween={40} slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 5000, disableOnInteraction: false }} speed={700}>
          {names.map((name, i) => (
            <SwiperSlide key={i} className="testimonial">
              <div className="client__avatar"><img src={avatars[i]} alt={name} loading="lazy" /></div>
              <h5 className="client__name">{name}</h5>
              <span className="client__role">{t.roles[i]}</span>
              <p className="client__review">{t.reviews[i]}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  );
};

export default Testimonials;
