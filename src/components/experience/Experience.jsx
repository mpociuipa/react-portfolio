import React, { useState, useEffect } from "react";
import "./experience.css";
import { BsPatchCheckFill } from "react-icons/bs";
import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const EXP_T = {
  en: { sub: "Technical Expertise", title: "Engineering Experience",
    sections: [
      { title: "Engineering Foundations", level: "Applied", skills: ["Git (branching strategies, remote workflows)","Linux CLI & Server Environments","SSH Workflows & Remote Administration","System-Level Debugging & Problem Solving"] },
      { title: "Frontend Engineering", level: "Experience", skills: ["React / Next.js","TypeScript (ES6+)","Component Architecture & State Design","Responsive UI (Tailwind, Bootstrap)","Performance-Oriented UI Thinking"] },
      { title: "Backend & API Architecture", level: "Applied", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","REST API Design & Integration","Authentication & Backend Structure","Database Modeling (MySQL, PostgreSQL)"] },
      { title: "Database Engineering", level: "Applied", skills: ["MySQL (Schema Design & Query Optimization)","PostgreSQL","Oracle Database","MongoDB (NoSQL Concepts)","Firebase (Cloud Data Integration)","Relational Modeling & Data Structuring","Neon (Serverless PostgreSQL)"] },
      { title: "Hybrid & Mobile Engineering", level: "Applied", skills: ["Electron (Desktop Applications)","Web-to-Desktop Packaging (.exe)","Capacitor (Web → iOS Integration)","iOS Application Builds (.ipa)","CI/CD for iOS (GitHub Actions + macOS runners)","App Store / TestFlight Deployment Workflow"] },
      { title: "Android & Mobile Development", level: "Applied", skills: ["Java (OOP, Android APIs)","Android Studio (IDE & Emulator)","Android Application Builds (.apk)","Activity & Fragment Lifecycle","Android SDK & Gradle Configuration","Google Play Deployment Workflow"] },
      { title: "Cloud & DevOps", level: "Applied", skills: ["Oracle Cloud Infrastructure","Server Provisioning & Configuration","CI/CD Pipelines (GitHub Actions)","Automated Build Workflows (Web & iOS)","Environment Variables & Secrets Management","Production Deployment Practices","Docker (Containerization & Service Deployment)","DNS Filtering & Network Security (AdGuard Home)"] },
      { title: "AI & Automation Engineering", level: "Applied", skills: ["OpenClaw AI Agent Deployment & Configuration","Self-Hosted AI Gateway (VPS + systemd)","WhatsApp Bot Integration (Multi-language)","LLM API Integration (OpenRouter, Anthropic)","Email Automation via CLI (himalaya / IMAP/SMTP)","AI Agent Skill Configuration & Prompt Engineering","Secure Agent Access Control & Policy Management"] },
      { title: "Marketing & Growth Tools", level: "Applied", skills: ["Brevo (Email Marketing & Subscriber Management)","Google Analytics 4 (Traffic & User Behavior)","Cron-job.org (Automated Scheduled Tasks)","Newsletter Campaigns & Audience Segmentation"] },
      { title: "Agile & Scrum Methodology", level: "Applied", skills: ["Agile Principles & Iterative Development","Scrum Framework (Sprints, Ceremonies)","Sprint Planning & Backlog Refinement","Daily Standups & Retrospectives","User Stories & Acceptance Criteria","Kanban Boards (Jira / GitHub Projects)"] },
      { title: "Systems & Security Awareness", level: "Applied / Learning", skills: ["HTTPS & TLS Concepts","MITM & Attack Surface Awareness","Backend Exposure Risk Analysis","Security-Oriented System Thinking","DNS-Level Network Protection"] },
    ]
  },
  lt: { sub: "Techninė ekspertizė", title: "Inžinerinė patirtis",
    sections: [
      { title: "Inžineriniai pagrindai", level: "Taikoma", skills: ["Git (šakojimo strategijos, nuotoliniai srautai)","Linux CLI ir serverio aplinkos","SSH srautai ir nuotolinė administracija","Sistemos lygio derinimas ir problemų sprendimas"] },
      { title: "Frontend inžinerija", level: "Patirtis", skills: ["React / Next.js","TypeScript (ES6+)","Komponentų architektūra ir būsenos dizainas","Responsyvus UI (Tailwind, Bootstrap)","Veiklos orientuotas UI mąstymas"] },
      { title: "Backend ir API architektūra", level: "Taikoma", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","REST API dizainas ir integracija","Autentikacija ir backend struktūra","Duomenų bazės modeliavimas (MySQL, PostgreSQL)"] },
      { title: "Duomenų bazių inžinerija", level: "Taikoma", skills: ["MySQL (schemos dizainas ir užklausų optimizavimas)","PostgreSQL","Oracle duomenų bazė","MongoDB (NoSQL koncepcijos)","Firebase (debesų duomenų integracija)","Reliacinis modeliavimas ir duomenų struktūrizavimas","Neon (serverinis PostgreSQL)"] },
      { title: "Hibridinė ir mobilioji inžinerija", level: "Taikoma", skills: ["Electron (desktop programos)","Web-to-Desktop pakavimas (.exe)","Capacitor (Web → iOS integracija)","iOS aplikacijų kūrimas (.ipa)","CI/CD iOS (GitHub Actions + macOS runners)","App Store / TestFlight diegimo srautas"] },
      { title: "Android ir mobilioji plėtra", level: "Taikoma", skills: ["Java (OOP, Android API)","Android Studio (IDE ir emuliatorius)","Android aplikacijų kūrimas (.apk)","Activity ir Fragment gyvavimo ciklas","Android SDK ir Gradle konfigūracija","Google Play diegimo srautas"] },
      { title: "Debesija ir DevOps", level: "Taikoma", skills: ["Oracle Cloud infrastruktūra","Serverio parengimas ir konfigūracija","CI/CD konvejeriai (GitHub Actions)","Automatizuoti kūrimo srautai (Web ir iOS)","Aplinkos kintamieji ir paslapčių valdymas","Gamybinio diegimo praktikos","Docker (konteinerizacija ir paslaugų diegimas)","DNS filtravimas ir tinklo saugumas (AdGuard Home)"] },
      { title: "DI ir automatizavimo inžinerija", level: "Taikoma", skills: ["OpenClaw DI agento diegimas ir konfigūracija","Savarankiškai talpinamas DI šliuzas (VPS + systemd)","WhatsApp boto integracija (daugiakalbė)","LLM API integracija (OpenRouter, Anthropic)","El. pašto automatizavimas per CLI (himalaya / IMAP/SMTP)","DI agento įgūdžių konfigūracija ir užuominų inžinerija","Saugus agento prieigos valdymas ir politikų valdymas"] },
      { title: "Rinkodara ir augimo įrankiai", level: "Taikoma", skills: ["Brevo (el. pašto rinkodara ir prenumeratorių valdymas)","Google Analytics 4 (srauto ir vartotojų elgesio analizė)","Cron-job.org (automatizuotos suplanuotos užduotys)","Naujienlaiškių kampanijos ir auditorijos segmentavimas"] },
      { title: "Agile ir Scrum metodologija", level: "Taikoma", skills: ["Agile principai ir iteratyvus kūrimas","Scrum sistema (sprintai, ceremonijos)","Sprinto planavimas ir užduočių tikslinimas","Kasdieniniai susitikimai ir retrospektyvos","Vartotojų istorijos ir priėmimo kriterijai","Kanban lentos (Jira / GitHub Projects)"] },
      { title: "Sistemų ir saugos supratimas", level: "Taikoma / Mokymasis", skills: ["HTTPS ir TLS koncepcijos","MITM ir atakos paviršiaus supratimas","Backend rizikos analizė","Saugos orientuotas sistemų mąstymas","DNS lygio tinklo apsauga"] },
    ]
  },
  de: { sub: "Technisches Fachwissen", title: "Ingenieurerfahrung",
    sections: [
      { title: "Ingenieurgrundlagen", level: "Angewandt", skills: ["Git (Branching-Strategien, Remote-Workflows)","Linux CLI & Server-Umgebungen","SSH-Workflows & Remote-Administration","System-Level-Debugging & Problemlösung"] },
      { title: "Frontend-Engineering", level: "Erfahrung", skills: ["React / Next.js","TypeScript (ES6+)","Komponentenarchitektur & State-Design","Responsive UI (Tailwind, Bootstrap)","Performance-orientiertes UI-Denken"] },
      { title: "Backend & API-Architektur", level: "Angewandt", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","REST API-Design & Integration","Authentifizierung & Backend-Struktur","Datenbankmodellierung (MySQL, PostgreSQL)"] },
      { title: "Datenbank-Engineering", level: "Angewandt", skills: ["MySQL (Schema-Design & Query-Optimierung)","PostgreSQL","Oracle Datenbank","MongoDB (NoSQL-Konzepte)","Firebase (Cloud-Datenintegration)","Relationales Modellieren & Datenstrukturierung","Neon (Serverloses PostgreSQL)"] },
      { title: "Hybrid & Mobile Engineering", level: "Angewandt", skills: ["Electron (Desktop-Anwendungen)","Web-to-Desktop-Packaging (.exe)","Capacitor (Web → iOS-Integration)","iOS-Anwendungsbuilds (.ipa)","CI/CD für iOS (GitHub Actions + macOS-Runner)","App Store / TestFlight-Deployment-Workflow"] },
      { title: "Android & Mobile-Entwicklung", level: "Angewandt", skills: ["Java (OOP, Android APIs)","Android Studio (IDE & Emulator)","Android-Anwendungsbuilds (.apk)","Activity & Fragment-Lebenszyklus","Android SDK & Gradle-Konfiguration","Google Play Deployment-Workflow"] },
      { title: "Cloud & DevOps", level: "Angewandt", skills: ["Oracle Cloud Infrastructure","Server-Bereitstellung & Konfiguration","CI/CD-Pipelines (GitHub Actions)","Automatisierte Build-Workflows (Web & iOS)","Umgebungsvariablen & Secrets-Management","Produktions-Deployment-Praktiken","Docker (Containerisierung & Service-Deployment)","DNS-Filterung & Netzwerksicherheit (AdGuard Home)"] },
      { title: "KI & Automatisierungs-Engineering", level: "Angewandt", skills: ["OpenClaw KI-Agent Deployment & Konfiguration","Self-Hosted KI-Gateway (VPS + systemd)","WhatsApp-Bot-Integration (mehrsprachig)","LLM API-Integration (OpenRouter, Anthropic)","E-Mail-Automatisierung via CLI (himalaya / IMAP/SMTP)","KI-Agent Skill-Konfiguration & Prompt-Engineering","Sichere Agent-Zugriffskontrolle & Richtlinienverwaltung"] },
      { title: "Marketing & Wachstums-Tools", level: "Angewandt", skills: ["Brevo (E-Mail-Marketing & Abonnentenverwaltung)","Google Analytics 4 (Traffic & Nutzerverhalten)","Cron-job.org (automatisierte geplante Aufgaben)","Newsletter-Kampagnen & Zielgruppensegmentierung"] },
      { title: "Agile & Scrum-Methodik", level: "Angewandt", skills: ["Agile Prinzipien & iterative Entwicklung","Scrum-Framework (Sprints, Zeremonien)","Sprint-Planung & Backlog-Verfeinerung","Daily Standups & Retrospektiven","User Stories & Akzeptanzkriterien","Kanban-Boards (Jira / GitHub Projects)"] },
      { title: "Systeme & Sicherheitsbewusstsein", level: "Angewandt / Lernend", skills: ["HTTPS & TLS-Konzepte","MITM & Angriffsflächen-Bewusstsein","Backend-Expositionsrisikoanalyse","Sicherheitsorientiertes Systemdenken","DNS-Level-Netzwerkschutz"] },
    ]
  },
  fr: { sub: "Expertise technique", title: "Expérience en ingénierie",
    sections: [
      { title: "Fondements de l'ingénierie", level: "Appliqué", skills: ["Git (stratégies de branchement, workflows distants)","Linux CLI & environnements serveur","Workflows SSH & administration distante","Débogage au niveau système & résolution de problèmes"] },
      { title: "Ingénierie frontend", level: "Expérience", skills: ["React / Next.js","TypeScript (ES6+)","Architecture de composants & conception d'état","UI responsive (Tailwind, Bootstrap)","Pensée UI orientée performance"] },
      { title: "Backend & architecture API", level: "Appliqué", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","Conception & intégration REST API","Authentification & structure backend","Modélisation de base de données (MySQL, PostgreSQL)"] },
      { title: "Ingénierie des bases de données", level: "Appliqué", skills: ["MySQL (conception de schéma & optimisation)","PostgreSQL","Oracle Database","MongoDB (concepts NoSQL)","Firebase (intégration de données cloud)","Modélisation relationnelle & structuration des données","Neon (PostgreSQL sans serveur)"] },
      { title: "Ingénierie hybride & mobile", level: "Appliqué", skills: ["Electron (applications desktop)","Packaging Web-to-Desktop (.exe)","Capacitor (intégration Web → iOS)","Builds d'application iOS (.ipa)","CI/CD pour iOS (GitHub Actions + runners macOS)","Workflow de déploiement App Store / TestFlight"] },
      { title: "Développement Android & mobile", level: "Appliqué", skills: ["Java (POO, APIs Android)","Android Studio (IDE & émulateur)","Builds d'application Android (.apk)","Cycle de vie Activity & Fragment","Android SDK & configuration Gradle","Workflow de déploiement Google Play"] },
      { title: "Cloud & DevOps", level: "Appliqué", skills: ["Oracle Cloud Infrastructure","Provisionnement & configuration de serveur","Pipelines CI/CD (GitHub Actions)","Workflows de build automatisés (Web & iOS)","Variables d'environnement & gestion des secrets","Pratiques de déploiement en production","Docker (conteneurisation & déploiement de services)","Filtrage DNS & sécurité réseau (AdGuard Home)"] },
      { title: "Ingénierie IA & automatisation", level: "Appliqué", skills: ["Déploiement & configuration d'agent IA OpenClaw","Passerelle IA auto-hébergée (VPS + systemd)","Intégration de bot WhatsApp (multilingue)","Intégration API LLM (OpenRouter, Anthropic)","Automatisation des e-mails via CLI (himalaya / IMAP/SMTP)","Configuration des compétences d'agent IA & ingénierie des prompts","Contrôle d'accès sécurisé aux agents & gestion des politiques"] },
      { title: "Outils marketing & croissance", level: "Appliqué", skills: ["Brevo (marketing par e-mail & gestion des abonnés)","Google Analytics 4 (trafic & comportement des utilisateurs)","Cron-job.org (tâches planifiées automatisées)","Campagnes de newsletter & segmentation d'audience"] },
      { title: "Méthodologie Agile & Scrum", level: "Appliqué", skills: ["Principes Agile & développement itératif","Framework Scrum (Sprints, Cérémonies)","Planification de sprint & raffinement du backlog","Daily Standups & Rétrospectives","User Stories & Critères d'acceptation","Tableaux Kanban (Jira / GitHub Projects)"] },
      { title: "Systèmes & sensibilisation à la sécurité", level: "Appliqué / Apprentissage", skills: ["Concepts HTTPS & TLS","Sensibilisation MITM & surface d'attaque","Analyse des risques d'exposition backend","Pensée système orientée sécurité","Protection réseau au niveau DNS"] },
    ]
  },
  it: { sub: "Competenza tecnica", title: "Esperienza ingegneristica",
    sections: [
      { title: "Fondamenti ingegneristici", level: "Applicato", skills: ["Git (strategie di branching, workflow remoti)","Linux CLI & ambienti server","Workflow SSH & amministrazione remota","Debug a livello di sistema & risoluzione dei problemi"] },
      { title: "Ingegneria frontend", level: "Esperienza", skills: ["React / Next.js","TypeScript (ES6+)","Architettura di componenti & progettazione dello stato","UI responsive (Tailwind, Bootstrap)","Pensiero UI orientato alle prestazioni"] },
      { title: "Backend & architettura API", level: "Applicato", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","Progettazione & integrazione REST API","Autenticazione & struttura backend","Modellazione database (MySQL, PostgreSQL)"] },
      { title: "Ingegneria del database", level: "Applicato", skills: ["MySQL (progettazione schema & ottimizzazione query)","PostgreSQL","Oracle Database","MongoDB (concetti NoSQL)","Firebase (integrazione dati cloud)","Modellazione relazionale & strutturazione dati","Neon (PostgreSQL serverless)"] },
      { title: "Ingegneria ibrida & mobile", level: "Applicato", skills: ["Electron (applicazioni desktop)","Packaging Web-to-Desktop (.exe)","Capacitor (integrazione Web → iOS)","Build applicazioni iOS (.ipa)","CI/CD per iOS (GitHub Actions + runner macOS)","Workflow di deployment App Store / TestFlight"] },
      { title: "Sviluppo Android & mobile", level: "Applicato", skills: ["Java (OOP, API Android)","Android Studio (IDE & emulatore)","Build applicazioni Android (.apk)","Ciclo di vita Activity & Fragment","Android SDK & configurazione Gradle","Workflow di deployment Google Play"] },
      { title: "Cloud & DevOps", level: "Applicato", skills: ["Oracle Cloud Infrastructure","Provisioning & configurazione server","Pipeline CI/CD (GitHub Actions)","Workflow di build automatizzati (Web & iOS)","Variabili d'ambiente & gestione dei segreti","Pratiche di deployment in produzione","Docker (containerizzazione & deployment di servizi)","Filtraggio DNS & sicurezza di rete (AdGuard Home)"] },
      { title: "Ingegneria IA & automazione", level: "Applicato", skills: ["Deployment & configurazione agente IA OpenClaw","Gateway IA self-hosted (VPS + systemd)","Integrazione bot WhatsApp (multilingue)","Integrazione API LLM (OpenRouter, Anthropic)","Automazione email via CLI (himalaya / IMAP/SMTP)","Configurazione skill agente IA & prompt engineering","Controllo accesso sicuro agli agenti & gestione delle policy"] },
      { title: "Strumenti di marketing & crescita", level: "Applicato", skills: ["Brevo (email marketing & gestione abbonati)","Google Analytics 4 (traffico & comportamento utenti)","Cron-job.org (attività pianificate automatizzate)","Campagne newsletter & segmentazione del pubblico"] },
      { title: "Metodologia Agile & Scrum", level: "Applicato", skills: ["Principi Agile & sviluppo iterativo","Framework Scrum (Sprint, Cerimonie)","Pianificazione dello sprint & raffinamento del backlog","Daily Standup & Retrospettive","User Story & Criteri di accettazione","Bacheche Kanban (Jira / GitHub Projects)"] },
      { title: "Sistemi & consapevolezza della sicurezza", level: "Applicato / In apprendimento", skills: ["Concetti HTTPS & TLS","Consapevolezza MITM & superficie di attacco","Analisi del rischio di esposizione backend","Pensiero di sistema orientato alla sicurezza","Protezione di rete a livello DNS"] },
    ]
  },
  es: { sub: "Experiencia técnica", title: "Experiencia en ingeniería",
    sections: [
      { title: "Fundamentos de ingeniería", level: "Aplicado", skills: ["Git (estrategias de ramificación, flujos remotos)","Linux CLI & entornos de servidor","Flujos SSH & administración remota","Depuración a nivel de sistema & resolución de problemas"] },
      { title: "Ingeniería frontend", level: "Experiencia", skills: ["React / Next.js","TypeScript (ES6+)","Arquitectura de componentes & diseño de estado","UI responsive (Tailwind, Bootstrap)","Pensamiento UI orientado al rendimiento"] },
      { title: "Backend & arquitectura API", level: "Aplicado", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","Diseño e integración REST API","Autenticación & estructura backend","Modelado de base de datos (MySQL, PostgreSQL)"] },
      { title: "Ingeniería de bases de datos", level: "Aplicado", skills: ["MySQL (diseño de esquema & optimización)","PostgreSQL","Oracle Database","MongoDB (conceptos NoSQL)","Firebase (integración de datos en la nube)","Modelado relacional & estructuración de datos","Neon (PostgreSQL sin servidor)"] },
      { title: "Ingeniería híbrida & móvil", level: "Aplicado", skills: ["Electron (aplicaciones desktop)","Empaquetado Web-to-Desktop (.exe)","Capacitor (integración Web → iOS)","Builds de aplicación iOS (.ipa)","CI/CD para iOS (GitHub Actions + runners macOS)","Flujo de despliegue App Store / TestFlight"] },
      { title: "Desarrollo Android & móvil", level: "Aplicado", skills: ["Java (POO, APIs Android)","Android Studio (IDE & emulador)","Builds de aplicación Android (.apk)","Ciclo de vida Activity & Fragment","Android SDK & configuración Gradle","Flujo de despliegue Google Play"] },
      { title: "Cloud & DevOps", level: "Aplicado", skills: ["Oracle Cloud Infrastructure","Aprovisionamiento & configuración de servidor","Pipelines CI/CD (GitHub Actions)","Flujos de build automatizados (Web & iOS)","Variables de entorno & gestión de secretos","Prácticas de despliegue en producción","Docker (contenedorización & despliegue de servicios)","Filtrado DNS & seguridad de red (AdGuard Home)"] },
      { title: "Ingeniería de IA & automatización", level: "Aplicado", skills: ["Despliegue & configuración de agente IA OpenClaw","Gateway IA auto-hospedado (VPS + systemd)","Integración de bot WhatsApp (multilingüe)","Integración API LLM (OpenRouter, Anthropic)","Automatización de email via CLI (himalaya / IMAP/SMTP)","Configuración de habilidades de agente IA & ingeniería de prompts","Control de acceso seguro a agentes & gestión de políticas"] },
      { title: "Herramientas de marketing & crecimiento", level: "Aplicado", skills: ["Brevo (marketing por email & gestión de suscriptores)","Google Analytics 4 (tráfico & comportamiento de usuarios)","Cron-job.org (tareas programadas automatizadas)","Campañas de newsletter & segmentación de audiencia"] },
      { title: "Metodología Agile & Scrum", level: "Aplicado", skills: ["Principios Agile & desarrollo iterativo","Framework Scrum (Sprints, Ceremonias)","Planificación de sprint & refinamiento del backlog","Daily Standups & Retrospectivas","User Stories & Criterios de aceptación","Tableros Kanban (Jira / GitHub Projects)"] },
      { title: "Sistemas & conciencia de seguridad", level: "Aplicado / Aprendiendo", skills: ["Conceptos HTTPS & TLS","Conciencia MITM & superficie de ataque","Análisis de riesgo de exposición backend","Pensamiento de sistema orientado a la seguridad","Protección de red a nivel DNS"] },
    ]
  },
  uk: { sub: "Технічна експертиза", title: "Інженерний досвід",
    sections: [
      { title: "Інженерні основи", level: "Застосовано", skills: ["Git (стратегії гілок, віддалені робочі процеси)","Linux CLI & серверні середовища","SSH робочі процеси & віддалене адміністрування","Налагодження на рівні системи & вирішення проблем"] },
      { title: "Frontend інжиніринг", level: "Досвід", skills: ["React / Next.js","TypeScript (ES6+)","Архітектура компонентів & дизайн стану","Адаптивний UI (Tailwind, Bootstrap)","UI мислення, орієнтоване на продуктивність"] },
      { title: "Backend & архітектура API", level: "Застосовано", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","Дизайн & інтеграція REST API","Автентифікація & структура backend","Моделювання бази даних (MySQL, PostgreSQL)"] },
      { title: "Інжиніринг баз даних", level: "Застосовано", skills: ["MySQL (дизайн схеми & оптимізація запитів)","PostgreSQL","Oracle Database","MongoDB (концепції NoSQL)","Firebase (хмарна інтеграція даних)","Реляційне моделювання & структурування даних","Neon (безсерверний PostgreSQL)"] },
      { title: "Гібридний & мобільний інжиніринг", level: "Застосовано", skills: ["Electron (desktop додатки)","Web-to-Desktop пакування (.exe)","Capacitor (Web → iOS інтеграція)","iOS збірки додатків (.ipa)","CI/CD для iOS (GitHub Actions + macOS runners)","Робочий процес розгортання App Store / TestFlight"] },
      { title: "Android & мобільна розробка", level: "Застосовано", skills: ["Java (ООП, Android API)","Android Studio (IDE & емулятор)","Android збірки додатків (.apk)","Життєвий цикл Activity & Fragment","Android SDK & конфігурація Gradle","Робочий процес розгортання Google Play"] },
      { title: "Хмара & DevOps", level: "Застосовано", skills: ["Oracle Cloud Infrastructure","Підготовка & конфігурація сервера","CI/CD пайплайни (GitHub Actions)","Автоматизовані робочі процеси збірки (Web & iOS)","Змінні середовища & управління секретами","Практики розгортання у виробництві","Docker (контейнеризація & розгортання сервісів)","DNS фільтрація & мережева безпека (AdGuard Home)"] },
      { title: "ШІ & інжиніринг автоматизації", level: "Застосовано", skills: ["Розгортання & конфігурація агента ШІ OpenClaw","Self-Hosted шлюз ШІ (VPS + systemd)","Інтеграція бота WhatsApp (багатомовний)","Інтеграція API LLM (OpenRouter, Anthropic)","Автоматизація електронної пошти через CLI (himalaya / IMAP/SMTP)","Конфігурація навичок агента ШІ & prompt engineering","Безпечний контроль доступу агентів & управління політиками"] },
      { title: "Інструменти маркетингу & зростання", level: "Застосовано", skills: ["Brevo (email маркетинг & управління підписниками)","Google Analytics 4 (трафік & поведінка користувачів)","Cron-job.org (автоматизовані заплановані завдання)","Кампанії розсилок & сегментація аудиторії"] },
      { title: "Методологія Agile & Scrum", level: "Застосовано", skills: ["Принципи Agile & ітеративна розробка","Фреймворк Scrum (спринти, церемонії)","Планування спринту & уточнення бекlogу","Щоденні зустрічі & ретроспективи","Користувацькі історії & критерії прийняття","Kanban дошки (Jira / GitHub Projects)"] },
      { title: "Системи & обізнаність безпеки", level: "Застосовано / Навчання", skills: ["Концепції HTTPS & TLS","Обізнаність MITM & поверхні атаки","Аналіз ризику відкриття backend","Системне мислення, орієнтоване на безпеку","Захист мережі на рівні DNS"] },
    ]
  },
  zh: { sub: "技术专长", title: "工程经验",
    sections: [
      { title: "工程基础", level: "应用", skills: ["Git（分支策略、远程工作流）","Linux CLI和服务器环境","SSH工作流和远程管理","系统级调试和问题解决"] },
      { title: "前端工程", level: "经验", skills: ["React / Next.js","TypeScript (ES6+)","组件架构和状态设计","响应式UI（Tailwind, Bootstrap）","以性能为导向的UI思维"] },
      { title: "后端和API架构", level: "应用", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","REST API设计和集成","身份验证和后端结构","数据库建模（MySQL, PostgreSQL）"] },
      { title: "数据库工程", level: "应用", skills: ["MySQL（模式设计和查询优化）","PostgreSQL","Oracle数据库","MongoDB（NoSQL概念）","Firebase（云数据集成）","关系建模和数据结构化","Neon（无服务器PostgreSQL）"] },
      { title: "混合和移动工程", level: "应用", skills: ["Electron（桌面应用）","Web到桌面打包（.exe）","Capacitor（Web → iOS集成）","iOS应用构建（.ipa）","iOS的CI/CD（GitHub Actions + macOS运行器）","App Store / TestFlight部署工作流"] },
      { title: "Android和移动开发", level: "应用", skills: ["Java（OOP，Android APIs）","Android Studio（IDE和模拟器）","Android应用构建（.apk）","Activity和Fragment生命周期","Android SDK和Gradle配置","Google Play部署工作流"] },
      { title: "云和DevOps", level: "应用", skills: ["Oracle云基础设施","服务器配置","CI/CD管道（GitHub Actions）","自动化构建工作流（Web和iOS）","环境变量和密钥管理","生产部署实践","Docker（容器化和服务部署）","DNS过滤和网络安全（AdGuard Home）"] },
      { title: "AI和自动化工程", level: "应用", skills: ["OpenClaw AI代理部署和配置","自托管AI网关（VPS + systemd）","WhatsApp机器人集成（多语言）","LLM API集成（OpenRouter, Anthropic）","通过CLI进行电子邮件自动化（himalaya / IMAP/SMTP）","AI代理技能配置和提示工程","安全代理访问控制和策略管理"] },
      { title: "营销和增长工具", level: "应用", skills: ["Brevo（电子邮件营销和订阅者管理）","Google Analytics 4（流量和用户行为）","Cron-job.org（自动化计划任务）","新闻通讯活动和受众细分"] },
      { title: "敏捷和Scrum方法论", level: "应用", skills: ["敏捷原则和迭代开发","Scrum框架（冲刺、仪式）","冲刺规划和待办事项细化","每日站会和回顾","用户故事和验收标准","看板（Jira / GitHub Projects）"] },
      { title: "系统和安全意识", level: "应用 / 学习中", skills: ["HTTPS和TLS概念","MITM和攻击面意识","后端暴露风险分析","以安全为导向的系统思维","DNS级别网络保护"] },
    ]
  },
  ru: { sub: "Техническая экспертиза", title: "Инженерный опыт",
    sections: [
      { title: "Инженерные основы", level: "Применяется", skills: ["Git (стратегии ветвления, удалённые рабочие процессы)","Linux CLI & серверные среды","SSH рабочие процессы & удалённое администрирование","Отладка на уровне системы & решение проблем"] },
      { title: "Frontend инжиниринг", level: "Опыт", skills: ["React / Next.js","TypeScript (ES6+)","Архитектура компонентов & дизайн состояния","Адаптивный UI (Tailwind, Bootstrap)","UI мышление, ориентированное на производительность"] },
      { title: "Backend & архитектура API", level: "Применяется", skills: ["Node.js / Express","Python (FastAPI)","Laravel (PHP)","Дизайн & интеграция REST API","Аутентификация & структура backend","Моделирование базы данных (MySQL, PostgreSQL)"] },
      { title: "Инжиниринг баз данных", level: "Применяется", skills: ["MySQL (дизайн схемы & оптимизация запросов)","PostgreSQL","Oracle Database","MongoDB (концепции NoSQL)","Firebase (облачная интеграция данных)","Реляционное моделирование & структурирование данных","Neon (бессерверный PostgreSQL)"] },
      { title: "Гибридный & мобильный инжиниринг", level: "Применяется", skills: ["Electron (desktop приложения)","Web-to-Desktop упаковка (.exe)","Capacitor (Web → iOS интеграция)","iOS сборки приложений (.ipa)","CI/CD для iOS (GitHub Actions + macOS runners)","Рабочий процесс развёртывания App Store / TestFlight"] },
      { title: "Android & мобильная разработка", level: "Применяется", skills: ["Java (ООП, Android APIs)","Android Studio (IDE & эмулятор)","Android сборки приложений (.apk)","Жизненный цикл Activity & Fragment","Android SDK & конфигурация Gradle","Рабочий процесс развёртывания Google Play"] },
      { title: "Облако & DevOps", level: "Применяется", skills: ["Oracle Cloud Infrastructure","Подготовка & конфигурация сервера","CI/CD пайплайны (GitHub Actions)","Автоматизированные рабочие процессы сборки (Web & iOS)","Переменные среды & управление секретами","Практики производственного развёртывания","Docker (контейнеризация & развёртывание сервисов)","DNS фильтрация & сетевая безопасность (AdGuard Home)"] },
      { title: "ИИ & инжиниринг автоматизации", level: "Применяется", skills: ["Развёртывание & конфигурация агента ИИ OpenClaw","Self-Hosted шлюз ИИ (VPS + systemd)","Интеграция бота WhatsApp (многоязычный)","Интеграция API LLM (OpenRouter, Anthropic)","Автоматизация email через CLI (himalaya / IMAP/SMTP)","Конфигурация навыков агента ИИ & prompt engineering","Безопасный контроль доступа агентов & управление политиками"] },
      { title: "Инструменты маркетинга & роста", level: "Применяется", skills: ["Brevo (email маркетинг & управление подписчиками)","Google Analytics 4 (трафик & поведение пользователей)","Cron-job.org (автоматизированные запланированные задачи)","Кампании рассылок & сегментация аудитории"] },
      { title: "Методология Agile & Scrum", level: "Применяется", skills: ["Принципы Agile & итеративная разработка","Фреймворк Scrum (спринты, церемонии)","Планирование спринта & уточнение бэклога","Ежедневные стендапы & ретроспективы","Пользовательские истории & критерии приёмки","Kanban доски (Jira / GitHub Projects)"] },
      { title: "Системы & осведомлённость безопасности", level: "Применяется / Обучение", skills: ["Концепции HTTPS & TLS","Осведомлённость MITM & поверхности атаки","Анализ риска раскрытия backend","Системное мышление, ориентированное на безопасность","Защита сети на уровне DNS"] },
    ]
  },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const Experience = () => {
  const [lang, setLang] = useState(getLang);

  useEffect(() => {
    const handler = () => setLang(getLang());
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = EXP_T[lang] || EXP_T["en"];

  return (
    <section id="experience">
      <div className="section__header">
        <Reveal y={10}><h5>{t.sub}</h5></Reveal>
        <Reveal y={12} delay={0.06}><h2>{t.title}</h2></Reveal>
      </div>
      <div className="container experience__container">
        {t.sections.map((sec, i) => (
          <Reveal key={i} y={18} delay={0.08 + i * 0.03}>
            <div className="experience__section">
              <h3>{sec.title}</h3>
              <Stagger>
                <div className="experience__content">
                  {sec.skills.map((skill, j) => (
                    <StaggerItem key={j}>
                      <article className="experience__details">
                        <BsPatchCheckFill className="experience__details-icon" />
                        <div>
                          <h4>{skill}</h4>
                          <small className="text-light">{sec.level}</small>
                        </div>
                      </article>
                    </StaggerItem>
                  ))}
                </div>
              </Stagger>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
