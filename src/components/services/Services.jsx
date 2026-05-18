import React, { useState, useEffect } from "react";
import "./services.css";
import { BiCheck } from "react-icons/bi";
import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const SERVICES_T = {
  en: { sub: "What I Provide", title: "Engineering Services",
    services: [
      { title: "Full-Stack Web Engineering", items: ["Frontend architecture (React, Next.js, TypeScript)","Backend API development (Node.js, FastAPI, Laravel)","Database modeling (MySQL, PostgreSQL, MongoDB)","Authentication, security & production-ready structure"] },
      { title: "Cross-Platform Applications", items: ["Desktop apps with Electron (.exe builds)","Android signed release builds (.apk)","iOS build workflows (.ipa via CI/CD)","App Store / TestFlight deployment setup"] },
      { title: "Cloud & Deployment", items: ["Oracle Cloud server configuration","CI/CD automation (GitHub Actions)","Environment variables & secrets management","Production deployment & hosting strategy"] },
      { title: "Technical UI & System Design", items: ["Performance-oriented UI architecture","Responsive layouts (Tailwind / Bootstrap)","Minimalist, structured UX thinking","Security-aware frontend & backend integration"] },
    ]
  },
  lt: { sub: "Ką teikiu", title: "Inžinerinės paslaugos",
    services: [
      { title: "Full-Stack web inžinerija", items: ["Frontend architektūra (React, Next.js, TypeScript)","Backend API kūrimas (Node.js, FastAPI, Laravel)","Duomenų bazės modeliavimas (MySQL, PostgreSQL, MongoDB)","Autentikacija, saugumas ir gamybai paruošta struktūra"] },
      { title: "Kelių platformų programos", items: ["Desktop programos su Electron (.exe versijos)","Android pasirašytos versijų versijos (.apk)","iOS kūrimo srautai (.ipa per CI/CD)","App Store / TestFlight diegimo nustatymas"] },
      { title: "Debesija ir diegimas", items: ["Oracle Cloud serverio konfigūracija","CI/CD automatizavimas (GitHub Actions)","Aplinkos kintamieji ir paslapčių valdymas","Gamybinis diegimas ir prieglobos strategija"] },
      { title: "Techninis UI ir sistemos dizainas", items: ["Veiklos orientuota UI architektūra","Responsyvūs maketai (Tailwind / Bootstrap)","Minimalistinis, struktūrizuotas UX mąstymas","Saugos požiūriu orientuota frontend ir backend integracija"] },
    ]
  },
  de: { sub: "Was ich biete", title: "Engineering-Dienstleistungen",
    services: [
      { title: "Full-Stack Web Engineering", items: ["Frontend-Architektur (React, Next.js, TypeScript)","Backend-API-Entwicklung (Node.js, FastAPI, Laravel)","Datenbankmodellierung (MySQL, PostgreSQL, MongoDB)","Authentifizierung, Sicherheit & produktionsreife Struktur"] },
      { title: "Plattformübergreifende Anwendungen", items: ["Desktop-Apps mit Electron (.exe-Builds)","Android signierte Release-Builds (.apk)","iOS Build-Workflows (.ipa via CI/CD)","App Store / TestFlight Deployment-Setup"] },
      { title: "Cloud & Deployment", items: ["Oracle Cloud Serverkonfiguration","CI/CD-Automatisierung (GitHub Actions)","Umgebungsvariablen & Secrets-Management","Produktions-Deployment & Hosting-Strategie"] },
      { title: "Technisches UI & System-Design", items: ["Performance-orientierte UI-Architektur","Responsive Layouts (Tailwind / Bootstrap)","Minimalistisches, strukturiertes UX-Denken","Sicherheitsbewusste Frontend & Backend-Integration"] },
    ]
  },
  fr: { sub: "Ce que je fournis", title: "Services d'ingénierie",
    services: [
      { title: "Ingénierie Web Full-Stack", items: ["Architecture frontend (React, Next.js, TypeScript)","Développement API backend (Node.js, FastAPI, Laravel)","Modélisation de base de données (MySQL, PostgreSQL, MongoDB)","Authentification, sécurité & structure prête pour la production"] },
      { title: "Applications multiplateformes", items: ["Applications desktop avec Electron (.exe)","Builds de version signés Android (.apk)","Workflows de build iOS (.ipa via CI/CD)","Configuration de déploiement App Store / TestFlight"] },
      { title: "Cloud & Déploiement", items: ["Configuration du serveur Oracle Cloud","Automatisation CI/CD (GitHub Actions)","Variables d'environnement & gestion des secrets","Déploiement en production & stratégie d'hébergement"] },
      { title: "UI technique & conception système", items: ["Architecture UI orientée performance","Mises en page responsive (Tailwind / Bootstrap)","Pensée UX minimaliste et structurée","Intégration frontend & backend consciente de la sécurité"] },
    ]
  },
  it: { sub: "Cosa offro", title: "Servizi di ingegneria",
    services: [
      { title: "Ingegneria Web Full-Stack", items: ["Architettura frontend (React, Next.js, TypeScript)","Sviluppo API backend (Node.js, FastAPI, Laravel)","Modellazione database (MySQL, PostgreSQL, MongoDB)","Autenticazione, sicurezza & struttura pronta per la produzione"] },
      { title: "Applicazioni multipiattaforma", items: ["App desktop con Electron (.exe)","Build di rilascio firmati Android (.apk)","Workflow di build iOS (.ipa via CI/CD)","Configurazione deployment App Store / TestFlight"] },
      { title: "Cloud & Deployment", items: ["Configurazione server Oracle Cloud","Automazione CI/CD (GitHub Actions)","Variabili d'ambiente & gestione dei segreti","Deployment in produzione & strategia di hosting"] },
      { title: "UI tecnica & progettazione sistema", items: ["Architettura UI orientata alle prestazioni","Layout responsive (Tailwind / Bootstrap)","Pensiero UX minimalista e strutturato","Integrazione frontend & backend consapevole della sicurezza"] },
    ]
  },
  es: { sub: "Lo que ofrezco", title: "Servicios de ingeniería",
    services: [
      { title: "Ingeniería Web Full-Stack", items: ["Arquitectura frontend (React, Next.js, TypeScript)","Desarrollo de API backend (Node.js, FastAPI, Laravel)","Modelado de base de datos (MySQL, PostgreSQL, MongoDB)","Autenticación, seguridad & estructura lista para producción"] },
      { title: "Aplicaciones multiplataforma", items: ["Apps de escritorio con Electron (.exe)","Builds de lanzamiento firmados Android (.apk)","Workflows de build iOS (.ipa via CI/CD)","Configuración de despliegue App Store / TestFlight"] },
      { title: "Cloud & Despliegue", items: ["Configuración de servidor Oracle Cloud","Automatización CI/CD (GitHub Actions)","Variables de entorno & gestión de secretos","Despliegue en producción & estrategia de hosting"] },
      { title: "UI técnica & diseño de sistema", items: ["Arquitectura UI orientada al rendimiento","Layouts responsive (Tailwind / Bootstrap)","Pensamiento UX minimalista y estructurado","Integración frontend & backend consciente de la seguridad"] },
    ]
  },
  uk: { sub: "Що я надаю", title: "Інженерні послуги",
    services: [
      { title: "Full-Stack веб інжиніринг", items: ["Frontend архітектура (React, Next.js, TypeScript)","Розробка backend API (Node.js, FastAPI, Laravel)","Моделювання бази даних (MySQL, PostgreSQL, MongoDB)","Автентифікація, безпека & готова до виробництва структура"] },
      { title: "Кросплатформні додатки", items: ["Desktop додатки з Electron (.exe)","Android підписані релізні збірки (.apk)","iOS робочі процеси збірки (.ipa через CI/CD)","Налаштування розгортання App Store / TestFlight"] },
      { title: "Хмара & Розгортання", items: ["Конфігурація сервера Oracle Cloud","Автоматизація CI/CD (GitHub Actions)","Змінні середовища & управління секретами","Виробниче розгортання & стратегія хостингу"] },
      { title: "Технічний UI & дизайн системи", items: ["UI архітектура, орієнтована на продуктивність","Адаптивні макети (Tailwind / Bootstrap)","Мінімалістичне, структуроване UX мислення","Frontend & backend інтеграція з урахуванням безпеки"] },
    ]
  },
  zh: { sub: "我提供什么", title: "工程服务",
    services: [
      { title: "全栈Web工程", items: ["前端架构（React, Next.js, TypeScript）","后端API开发（Node.js, FastAPI, Laravel）","数据库建模（MySQL, PostgreSQL, MongoDB）","身份验证、安全性和生产就绪结构"] },
      { title: "跨平台应用", items: ["使用Electron的桌面应用（.exe构建）","Android签名发布构建（.apk）","iOS构建工作流（.ipa通过CI/CD）","App Store / TestFlight部署设置"] },
      { title: "云和部署", items: ["Oracle云服务器配置","CI/CD自动化（GitHub Actions）","环境变量和密钥管理","生产部署和托管策略"] },
      { title: "技术UI和系统设计", items: ["以性能为导向的UI架构","响应式布局（Tailwind / Bootstrap）","简约、结构化的UX思维","安全感知的前后端集成"] },
    ]
  },
  ru: { sub: "Что я предоставляю", title: "Инженерные услуги",
    services: [
      { title: "Full-Stack веб инжиниринг", items: ["Frontend архитектура (React, Next.js, TypeScript)","Разработка backend API (Node.js, FastAPI, Laravel)","Моделирование базы данных (MySQL, PostgreSQL, MongoDB)","Аутентификация, безопасность & готовая к производству структура"] },
      { title: "Кроссплатформенные приложения", items: ["Desktop приложения с Electron (.exe)","Android подписанные релизные сборки (.apk)","iOS рабочие процессы сборки (.ipa через CI/CD)","Настройка развёртывания App Store / TestFlight"] },
      { title: "Облако & Развёртывание", items: ["Конфигурация сервера Oracle Cloud","Автоматизация CI/CD (GitHub Actions)","Переменные среды & управление секретами","Производственное развёртывание & стратегия хостинга"] },
      { title: "Технический UI & дизайн системы", items: ["UI архитектура, ориентированная на производительность","Адаптивные макеты (Tailwind / Bootstrap)","Минималистичное, структурированное UX мышление","Frontend & backend интеграция с учётом безопасности"] },
    ]
  },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const Services = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handler = () => forceUpdate({});
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = SERVICES_T[getLang()] || SERVICES_T["en"];

  return (
    <section id="services">
      <div className="section__header">
        <Reveal y={10}><h5>{t.sub}</h5></Reveal>
        <Reveal y={12} delay={0.06}><h2>{t.title}</h2></Reveal>
      </div>
      <Reveal y={16} delay={0.1}>
        <Stagger>
          <div className="container services__container">
            {t.services.map((service, index) => (
              <StaggerItem key={index}>
                <article className="service">
                  <div className="service__head"><h3>{service.title}</h3></div>
                  <ul className="service__list">
                    {service.items.map((item, i) => (
                      <li key={i}><BiCheck className="service__list-icon" /><p>{item}</p></li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Reveal>
    </section>
  );
};

export default Services;
