import React, { useState, useEffect } from "react";
import "./portfolio.css";

import IMG1 from "../../assets/horse-ironing-board-app.jpg";
import IMG2 from "../../assets/horse-ironing-board-app.jpg";
import IMG3 from "../../assets/crimson-sky-firestorm-arena-app.png";
import IMG4 from "../../assets/3d-race-game-windows.png";
import IMG5 from "../../assets/3d-race-game-windows.png";
import IMG6 from "../../assets/houses-construction-app.jpg";
import IMG7 from "../../assets/house-construction-app.jpg";
import IMG8 from "../../assets/javascript-python-course.png";
import IMG9 from "../../assets/linux-training-windows.png";
import IMG10 from "../../assets/health-manager-app.jpg";

import Reveal from "../animations/Reveal";

const images = [
  IMG1,
  IMG2,
  IMG3,
  IMG4,
  IMG5,
  IMG6,
  IMG7,
  IMG8,
  IMG9,
  IMG3,
  IMG10,
];

const demos = [
  "https://manthispoc.gumroad.com/l/epptjq",
  "https://manthispoc.gumroad.com/l/lykjt",
  "https://manthispoc.gumroad.com/l/dinhw",
  "https://manthispoc.gumroad.com/l/svflr",
  "https://manthispoc.gumroad.com/l/onqml",
  "https://manthispoc.gumroad.com/l/bbhjs",
  "https://manthispoc.gumroad.com/l/zlfyu",
  "https://manthispoc.gumroad.com/l/yvpto",
  "https://manthispoc.gumroad.com/l/zkduwe",
  "https://manthispoc.gumroad.com/l/dpfeuy",
  "https://manthispoc.gumroad.com/l/dzvyb",
];

const github = [
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
  "https://github.com/mpociuipa",
];

/* ==========================================================
   IMAGE SEO
========================================================== */

const ALT_TEXT = [
  "Cheerful Horse Android educational game developed by Full Stack Developer Mantas Počiuipa",
  "Cheerful Horse Windows desktop game developed by Full Stack Developer Mantas Počiuipa",
  "Crimson Sky Firestorm Arena Windows action game created by Mantas Počiuipa",
  "3D Race Game for Windows developed using React and Three.js by Mantas Počiuipa",
  "3D Race Game for Android developed using React and Three.js by Mantas Počiuipa",
  "House Construction application for Lithuanian users",
  "House Construction desktop software for Windows",
  "JavaScript Python and Database learning platform",
  "Linux training course for Windows users",
  "Crimson Sky Firestorm Arena Android game",
  "Health Manager desktop application for Windows"
];

const IMAGE_TITLE = [
  "Cheerful Horse Android",
  "Cheerful Horse Windows",
  "Crimson Sky Firestorm Arena",
  "3D Race Game Windows",
  "3D Race Game Android",
  "House Construction App",
  "House Construction Windows",
  "Programming Learning Platform",
  "Linux Training",
  "Crimson Sky Firestorm Arena Android",
  "Health Manager"
];

/* ==========================================================
   MULTILANGUAGE
========================================================== */

const PORTFOLIO_T = {

  en: {

    sub: "My Recent Work",

    title: "Portfolio",

    btn: "Buy",

    titles: [

      "Cheerful Horse on Android",

      "Cheerful Horse on Windows",

      "Crimson Sky Firestorm Arena on Windows",

      "3D Race Game on Windows",

      "3D Race Game on Android",

      "House Construction App for Lithuania",

      "House Construction Desktop Software",

      "JavaScript, Python & Database Course",

      "Linux Training for Windows Users",

      "Crimson Sky Firestorm Arena on Android",

      "Health Manager Desktop Application",

    ],

    descriptions: [

      "Cheerful Horse is an educational Android game developed by Full Stack Developer Mantas Počiuipa. The application demonstrates responsive mobile development, optimized graphics, intuitive gameplay and modern JavaScript programming techniques. It is designed for Android devices and showcases practical experience in software development, UI design and mobile application architecture.",

      "Cheerful Horse for Windows is a desktop version built for Microsoft Windows. The project demonstrates cross-platform software development, responsive user interface design, optimized performance and modern application architecture using current web technologies.",

      "Crimson Sky Firestorm Arena is a 3D action game for Windows featuring immersive gameplay, optimized graphics, interactive environments and smooth performance. The project showcases real-time rendering techniques, game mechanics and desktop software engineering.",

      "3D Race Game for Windows demonstrates advanced React development, Three.js rendering, optimized physics simulation and desktop application deployment. The project highlights modern game development techniques and interactive graphics.",

      "3D Race Game for Android is a mobile racing experience optimized for smartphones and tablets. The application focuses on responsive controls, optimized rendering, smooth animations and cross-platform compatibility.",

      "House Construction App helps users plan and manage residential construction projects. The software provides practical tools for budgeting, planning, organization and project management for homeowners and builders.",

      "House Construction Desktop Software extends the construction planning system to Windows users by providing an optimized desktop interface, advanced project management capabilities and intuitive navigation.",

      "The JavaScript, Python and Database Course is a programming education platform created to help users learn modern software development concepts. The course covers JavaScript programming, Python fundamentals, databases, programming logic and practical development skills.",

      "Linux Training for Windows Users is an educational platform designed to introduce Linux operating systems, command line tools, system administration concepts and practical cybersecurity fundamentals for beginners.",

      "Crimson Sky Firestorm Arena Android version brings an action game experience to mobile devices. The project demonstrates mobile optimization, responsive gameplay, interactive graphics and cross-platform game development.",

      "Health Manager is a Windows desktop application designed to help users organize and manage health-related information. The project demonstrates software architecture, user interface development and practical desktop application engineering.",

    ],

    categories: [

      "GameApplication",

      "SoftwareApplication",

      "VideoGame",

      "GameApplication",

      "MobileApplication",

      "SoftwareApplication",

      "SoftwareApplication",

      "Course",

      "EducationalApplication",

      "MobileApplication",

      "HealthApplication",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },


  lt: {

    sub: "Mano naujausi darbai",

    title: "Portfelis",

    btn: "Pirkti",

    titles: [

      "Linksmas arklys Android",

      "Linksmas arklys Windows",

      "Crimson Sky Firestorm Arena Windows",

      "3D lenktynių žaidimas Windows",

      "3D lenktynių žaidimas Android",

      "Namų statybos programa Lietuvai",

      "Namų statybos programa Windows",

      "JavaScript, Python ir duomenų bazių kursas",

      "Linux mokymai Windows vartotojams",

      "Crimson Sky Firestorm Arena Android",

      "Sveikatos valdymo programa Windows",

    ],

    descriptions: [

      "Linksmas arklys yra edukacinis Android žaidimas sukurtas Manto Počiuipos. Projektas demonstruoja mobiliųjų aplikacijų kūrimą, prisitaikantį dizainą, optimizuotą grafiką ir šiuolaikines JavaScript programavimo technologijas.",

      "Linksmas arklys Windows versija yra darbalaukio programa sukurta Microsoft Windows sistemai. Projektas parodo programinės įrangos kūrimą, vartotojo sąsajos dizainą ir kelių platformų sprendimus.",

      "Crimson Sky Firestorm Arena yra 3D veiksmo žaidimas Windows sistemai. Projekte naudojama interaktyvi grafika, žaidimo mechanikos ir optimizuotas našumas.",

      "3D lenktynių žaidimas Windows platformai sukurtas naudojant modernias React ir Three.js technologijas. Projektas demonstruoja 3D grafiką, interaktyvumą ir žaidimų kūrimo principus.",

      "3D lenktynių žaidimas Android įrenginiams pritaikytas mobilus projektas su optimizuotu valdymu, animacijomis ir sklandžiu veikimu.",

      "Namų statybos programa padeda planuoti ir valdyti statybos projektus. Programa skirta patogiam biudžeto, darbų ir projekto organizavimui.",

      "Namų statybos Windows programa suteikia patogią darbalaukio aplinką projektų planavimui ir valdymui.",

      "JavaScript, Python ir duomenų bazių kursas skirtas programavimo mokymuisi. Naudotojai gali mokytis programavimo pagrindų, duomenų bazių ir praktinio kūrimo.",

      "Linux mokymai Windows vartotojams skirti supažindinti su Linux sistema, terminalu, administravimu ir pagrindiniais saugumo principais.",

      "Crimson Sky Firestorm Arena Android versija pritaikyta mobiliesiems įrenginiams ir demonstruoja mobiliųjų žaidimų kūrimą bei optimizavimą.",

      "Sveikatos valdymo programa Windows sistemai padeda organizuoti sveikatos informaciją ir demonstruoja profesionalų darbalaukio programų kūrimą.",

    ],

    categories: [

      "Žaidimas",

      "Programinė įranga",

      "3D žaidimas",

      "Žaidimas",

      "Mobilioji aplikacija",

      "Programinė įranga",

      "Windows programa",

      "Mokymosi platforma",

      "Edukacinė programa",

      "Android žaidimas",

      "Sveikatos programa",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },

  de: {

    sub: "Meine neuesten Arbeiten",

    title: "Portfolio",

    btn: "Kaufen",

    titles: [

      "Fröhliches Pferd auf Android",

      "Fröhliches Pferd auf Windows",

      "Crimson Sky Firestorm Arena Windows",

      "3D-Rennspiel Windows",

      "3D-Rennspiel Android",

      "Hausbau-App für Litauen",

      "Hausbau-Software für Windows",

      "JavaScript, Python und Datenbankkurs",

      "Linux-Schulung für Windows-Benutzer",

      "Crimson Sky Firestorm Arena Android",

      "Health Manager Windows Anwendung",

    ],

    descriptions: [

      "Fröhliches Pferd ist ein pädagogisches Android-Spiel von Mantas Počiuipa. Das Projekt zeigt moderne mobile Entwicklung, responsive Benutzeroberflächen und optimierte Grafik für Android-Geräte.",

      "Fröhliches Pferd für Windows ist eine Desktop-Anwendung, die moderne Softwareentwicklung, Benutzerfreundlichkeit und plattformübergreifende Entwicklung demonstriert.",

      "Crimson Sky Firestorm Arena ist ein 3D-Actionspiel für Windows mit interaktiver Grafik, optimierter Leistung und moderner Spieleentwicklung.",

      "Das 3D-Rennspiel für Windows wurde mit modernen Webtechnologien entwickelt und zeigt Erfahrungen mit React, Three.js, 3D-Grafik und interaktiven Anwendungen.",

      "Die Android-Version des 3D-Rennspiels bietet optimierte mobile Steuerung, Animationen und plattformübergreifende Entwicklung.",

      "Die Hausbau-App hilft Benutzern bei der Planung und Verwaltung von Bauprojekten mit modernen Softwarelösungen.",

      "Die Windows-Version der Hausbau-Anwendung bietet eine optimierte Desktop-Erfahrung für Projektverwaltung und Organisation.",

      "Der JavaScript-, Python- und Datenbankkurs ist eine Lernplattform für Programmierung, Softwareentwicklung und moderne Technologien.",

      "Die Linux-Schulung für Windows-Benutzer vermittelt Grundlagen von Linux, Terminal, Systemverwaltung und Sicherheit.",

      "Crimson Sky Firestorm Arena Android zeigt mobile Spieleentwicklung mit optimierter Performance und interaktiven Funktionen.",

      "Health Manager ist eine Windows-Anwendung zur Verwaltung von Gesundheitsinformationen und zeigt professionelle Softwareentwicklung.",

    ],

    categories: [

      "Game Application",

      "Software Application",

      "Video Game",

      "Game Application",

      "Mobile Application",

      "Software Application",

      "Desktop Application",

      "Programming Course",

      "Educational Application",

      "Mobile Game",

      "Health Application",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },


  fr: {

    sub: "Mes travaux récents",

    title: "Portfolio",

    btn: "Acheter",

    titles: [

      "Cheval joyeux Android",

      "Cheval joyeux Windows",

      "Crimson Sky Firestorm Arena Windows",

      "Jeu de course 3D Windows",

      "Jeu de course 3D Android",

      "Application de construction maison",

      "Logiciel de construction Windows",

      "Cours JavaScript Python et bases de données",

      "Formation Linux pour utilisateurs Windows",

      "Crimson Sky Firestorm Arena Android",

      "Health Manager Windows",

    ],

    descriptions: [

      "Cheval joyeux est un jeu éducatif Android développé par Mantas Počiuipa. Le projet démontre le développement mobile moderne, les interfaces responsives et l'optimisation graphique.",

      "Cheval joyeux Windows est une application de bureau démontrant la création de logiciels modernes et le développement multiplateforme.",

      "Crimson Sky Firestorm Arena est un jeu d'action 3D pour Windows présentant des graphismes interactifs et une expérience de développement de jeux moderne.",

      "Le jeu de course 3D Windows utilise React et Three.js pour créer une expérience interactive avec des graphiques 3D optimisés.",

      "La version Android du jeu de course 3D est optimisée pour les appareils mobiles avec des contrôles responsifs.",

      "L'application de construction aide les utilisateurs à organiser et planifier leurs projets immobiliers.",

      "Le logiciel Windows de construction offre une expérience de bureau moderne pour la gestion des projets.",

      "Le cours JavaScript, Python et bases de données aide les utilisateurs à apprendre la programmation moderne.",

      "La formation Linux présente les bases du système Linux, du terminal et de l'administration système.",

      "Crimson Sky Firestorm Arena Android démontre le développement de jeux mobiles multiplateformes.",

      "Health Manager est une application Windows conçue pour gérer les informations de santé.",

    ],

    categories: [

      "Application de jeu",

      "Application logicielle",

      "Jeu vidéo",

      "Jeu 3D",

      "Application mobile",

      "Logiciel",

      "Application Windows",

      "Cours informatique",

      "Formation Linux",

      "Jeu Android",

      "Application santé",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },
    it: {

    sub: "I miei lavori recenti",

    title: "Portfolio",

    btn: "Acquistare",

    titles: [

      "Cavallo allegro Android",

      "Cavallo allegro Windows",

      "Crimson Sky Firestorm Arena Windows",

      "Gioco di corse 3D Windows",

      "Gioco di corse 3D Android",

      "Applicazione costruzione casa",

      "Software costruzione Windows",

      "Corso JavaScript Python e database",

      "Formazione Linux per utenti Windows",

      "Crimson Sky Firestorm Arena Android",

      "Health Manager Windows",

    ],

    descriptions: [

      "Cavallo allegro è un gioco educativo Android sviluppato da Mantas Počiuipa. Il progetto dimostra sviluppo mobile moderno, interfacce responsive e ottimizzazione grafica.",

      "Cavallo allegro Windows è un'applicazione desktop che mostra esperienza nello sviluppo software moderno e soluzioni multipiattaforma.",

      "Crimson Sky Firestorm Arena è un gioco d'azione 3D per Windows con grafica interattiva, prestazioni ottimizzate e tecniche moderne di sviluppo giochi.",

      "Il gioco di corse 3D per Windows utilizza React e Three.js mostrando esperienza nello sviluppo 3D, animazioni e applicazioni interattive.",

      "La versione Android del gioco di corse 3D è ottimizzata per dispositivi mobili con controlli responsive e animazioni fluide.",

      "L'applicazione costruzione casa aiuta gli utenti nella pianificazione e gestione dei progetti edilizi.",

      "Il software Windows per costruzioni offre una soluzione desktop moderna per organizzare e gestire progetti.",

      "Il corso JavaScript, Python e database insegna programmazione moderna, sviluppo software e gestione dati.",

      "La formazione Linux per utenti Windows introduce Linux, terminale, amministrazione di sistema e sicurezza informatica.",

      "Crimson Sky Firestorm Arena Android dimostra lo sviluppo di giochi mobili multipiattaforma.",

      "Health Manager è un'applicazione Windows per organizzare informazioni sanitarie e dimostra sviluppo software professionale.",

    ],

    categories: [

      "Applicazione gioco",

      "Applicazione software",

      "Videogioco",

      "Gioco 3D",

      "Applicazione mobile",

      "Software",

      "Applicazione Windows",

      "Corso programmazione",

      "Formazione Linux",

      "Gioco Android",

      "Applicazione salute",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },


  es: {

    sub: "Mi trabajo reciente",

    title: "Portafolio",

    btn: "Comprar",

    titles: [

      "Caballo alegre Android",

      "Caballo alegre Windows",

      "Crimson Sky Firestorm Arena Windows",

      "Juego de carreras 3D Windows",

      "Juego de carreras 3D Android",

      "Aplicación construcción casa",

      "Software construcción Windows",

      "Curso JavaScript Python y bases de datos",

      "Formación Linux para usuarios Windows",

      "Crimson Sky Firestorm Arena Android",

      "Health Manager Windows",

    ],

    descriptions: [

      "Caballo alegre es un juego educativo Android desarrollado por Mantas Počiuipa. Demuestra desarrollo móvil moderno, diseño responsive y optimización gráfica.",

      "Caballo alegre Windows es una aplicación de escritorio que muestra experiencia en desarrollo de software y aplicaciones multiplataforma.",

      "Crimson Sky Firestorm Arena es un videojuego 3D de acción para Windows con gráficos interactivos y desarrollo moderno de juegos.",

      "El juego de carreras 3D para Windows utiliza React y Three.js para crear una experiencia gráfica interactiva.",

      "La versión Android del juego ofrece controles optimizados, animaciones suaves y compatibilidad móvil.",

      "La aplicación de construcción ayuda a planificar y gestionar proyectos de construcción residencial.",

      "El software de construcción para Windows ofrece herramientas profesionales de organización y gestión.",

      "El curso de JavaScript, Python y bases de datos enseña programación y desarrollo de software moderno.",

      "La formación Linux enseña fundamentos del sistema, terminal y administración para usuarios Windows.",

      "Crimson Sky Firestorm Arena Android demuestra desarrollo de juegos móviles multiplataforma.",

      "Health Manager es una aplicación Windows para administrar información relacionada con la salud.",

    ],

    categories: [

      "Aplicación de juego",

      "Software",

      "Videojuego",

      "Juego 3D",

      "Aplicación móvil",

      "Software Windows",

      "Aplicación escritorio",

      "Curso programación",

      "Educación Linux",

      "Juego Android",

      "Aplicación salud",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },
    uk: {

    sub: "Мої останні роботи",

    title: "Портфоліо",

    btn: "Купити",

    titles: [

      "Веселий кінь Android",

      "Веселий кінь Windows",

      "Crimson Sky Firestorm Arena Windows",

      "3D гоночна гра Windows",

      "3D гоночна гра Android",

      "Додаток будівництва будинку",

      "Програма будівництва Windows",

      "Курс JavaScript Python та баз даних",

      "Навчання Linux для користувачів Windows",

      "Crimson Sky Firestorm Arena Android",

      "Health Manager Windows",

    ],

    descriptions: [

      "Веселий кінь — це навчальна Android гра, створена Mantas Počiuipa. Проєкт демонструє сучасну мобільну розробку, адаптивний дизайн та оптимізацію графіки.",

      "Веселий кінь для Windows — це настільний додаток, який демонструє розробку програмного забезпечення та кросплатформні рішення.",

      "Crimson Sky Firestorm Arena — це 3D екшн гра для Windows із інтерактивною графікою, оптимізованою продуктивністю та сучасною розробкою ігор.",

      "3D гоночна гра для Windows створена з використанням React та Three.js. Проєкт демонструє 3D графіку, анімації та інтерактивні технології.",

      "Android версія 3D гоночної гри оптимізована для мобільних пристроїв із плавним керуванням та адаптивним інтерфейсом.",

      "Додаток будівництва допомагає користувачам планувати та керувати будівельними проєктами.",

      "Windows програма будівництва створена для зручного управління та організації будівельних процесів.",

      "Курс JavaScript, Python та баз даних допомагає вивчати сучасне програмування та розробку програмного забезпечення.",

      "Навчання Linux для Windows користувачів знайомить із Linux системами, командним рядком та адмініструванням.",

      "Crimson Sky Firestorm Arena Android демонструє створення мобільних ігор із оптимізацією продуктивності.",

      "Health Manager — це Windows програма для управління інформацією про здоров'я.",

    ],

    categories: [

      "Ігровий додаток",

      "Програмне забезпечення",

      "Відеогра",

      "3D гра",

      "Мобільний додаток",

      "Програма Windows",

      "Настільний додаток",

      "Курс програмування",

      "Навчальна програма",

      "Android гра",

      "Health додаток",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },


  zh: {

    sub: "我的近期作品",

    title: "作品集",

    btn: "购买",

    titles: [

      "快乐的马 Android",

      "快乐的马 Windows",

      "Crimson Sky Firestorm Arena Windows",

      "3D赛车游戏 Windows",

      "3D赛车游戏 Android",

      "家庭建设应用",

      "Windows家庭建设软件",

      "JavaScript Python 数据库课程",

      "Windows用户Linux培训",

      "Crimson Sky Firestorm Arena Android",

      "Health Manager Windows",

    ],

    descriptions: [

      "快乐的马是一款由 Mantas Počiuipa 开发的 Android 教育游戏，展示现代移动开发和优化图形技术。",

      "快乐的马 Windows版本是一款桌面应用，展示软件开发和跨平台技术。",

      "Crimson Sky Firestorm Arena 是一款Windows 3D动作游戏，具有互动图形和现代游戏开发技术。",

      "3D赛车游戏使用React和Three.js开发，展示3D渲染、动画和互动体验。",

      "Android赛车游戏针对移动设备优化，提供流畅控制和响应式体验。",

      "家庭建设应用帮助用户规划和管理住宅建设项目。",

      "Windows家庭建设软件提供桌面环境中的项目管理功能。",

      "JavaScript Python数据库课程帮助用户学习现代编程和软件开发。",

      "Linux培训课程介绍Linux系统、终端和基础管理知识。",

      "Crimson Sky Firestorm Arena Android展示移动游戏开发能力。",

      "Health Manager是一款Windows健康管理应用。",

    ],

    categories: [

      "游戏应用",

      "软件应用",

      "电子游戏",

      "3D游戏",

      "移动应用",

      "Windows软件",

      "桌面应用",

      "编程课程",

      "教育应用",

      "Android游戏",

      "健康应用",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },


  ru: {

    sub: "Мои последние работы",

    title: "Портфолио",

    btn: "Купить",

    titles: [

      "Весёлый конь Android",

      "Весёлый конь Windows",

      "Crimson Sky Firestorm Arena Windows",

      "3D гоночная игра Windows",

      "3D гоночная игра Android",

      "Приложение строительства дома",

      "Программа строительства Windows",

      "Курс JavaScript Python и базы данных",

      "Linux обучение для пользователей Windows",

      "Crimson Sky Firestorm Arena Android",

      "Health Manager Windows",

    ],
    descriptions: ["Весёлый конь — это Android образовательная игра, разработанная Mantas Počiuipa. Проект демонстрирует мобильную разработку, адаптивный дизайн и оптимизацию графики.",

      "Весёлый конь Windows — это настольное приложение, показывающее разработку программного обеспечения и кроссплатформенные технологии.",

      "Crimson Sky Firestorm Arena — это 3D экшен игра для Windows с интерактивной графикой и современной разработкой игр.",

      "3D гоночная игра для Windows создана с использованием React и Three.js и показывает опыт разработки 3D приложений.",

      "Android версия 3D гоночной игры оптимизирована для мобильных устройств с плавным управлением.",

      "Приложение строительства дома помогает пользователям планировать и управлять строительными проектами.",

      "Программа строительства Windows предоставляет удобные инструменты управления проектами.",

      "Курс JavaScript, Python и баз данных предназначен для изучения современного программирования.",

      "Linux обучение для пользователей Windows знакомит с Linux системой, терминалом и администрированием.",

      "Crimson Sky Firestorm Arena Android показывает разработку мобильных игр и оптимизацию производительности.",

      "Health Manager — это Windows приложение для управления информацией о здоровье.",

    ],

    categories: [

      "Игровое приложение",

      "Программное обеспечение",

      "Видеоигра",

      "3D игра",

      "Мобильное приложение",

      "Windows программа",

      "Настольное приложение",

      "Курс программирования",

      "Образовательное приложение",

      "Android игра",

      "Health приложение",

    ],

    operatingSystems: [

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

      "Windows",

      "Windows",

      "Windows",

      "Android",

      "Windows",

    ],

  },

};


// ==========================================================
// LANGUAGE STORAGE
// ==========================================================

const getLang = () => {
  try {
    return localStorage.getItem("portfolioLang") || "en";
  } catch {
    return "en";
  }
};


// ==========================================================
// PORTFOLIO COMPONENT
// ==========================================================

const Portfolio = () => {

  const [lang, setLang] = useState(getLang);


  useEffect(() => {

    const handler = () => {
      setLang(getLang());
    };


    window.addEventListener(
      "langchange",
      handler
    );


    return () => {

      window.removeEventListener(
        "langchange",
        handler
      );

    };

  }, []);


  const t =
    PORTFOLIO_T[lang] ||
    PORTFOLIO_T.en;



  return (

    <section
      id="portfolio"
      aria-label="Portfolio projects"
    >


      <div className="section__header">

        <Reveal y={10}>

          <h5>
            {t.sub}
          </h5>

        </Reveal>


        <Reveal
          y={12}
          delay={0.06}
        >

          <h2>
            {t.title}
          </h2>

        </Reveal>


      </div>




      <div className="container portfolio__container">


        {t.titles.map((title, i) => (


          <Reveal
            key={i}
            y={14}
            delay={i * 0.06}
          >


            <article
              className="portfolio__item"
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >



              <meta
                itemProp="name"
                content={title}
              />


              <meta
                itemProp="applicationCategory"
                content={t.categories[i]}
              />


              <meta
                itemProp="operatingSystem"
                content={t.operatingSystems[i]}
              />



              <div
                className="portfolio__item-image"
              >

                <img
                  src={images[i]}
                  alt={ALT_TEXT[i]}
                  title={IMAGE_TITLE[i]}
                  loading="lazy"
                  itemProp="image"
                />

              </div>




              <h3>
                {title}
              </h3>



              <p
                className="portfolio__description"
                itemProp="description"
              >

                {t.descriptions[i]}

              </p>




              <div
                className="portfolio__item-cta"
              >

                <a
                  href={github[i]}
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${title} GitHub repository`}
                >

                  GitHub

                </a>



                <a
                  href={demos[i]}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${title} purchase page`}
                >

                  {t.btn}

                </a>


              </div>


            </article>


          </Reveal>


        ))}


      </div>


    </section>

  );

};


export default Portfolio;