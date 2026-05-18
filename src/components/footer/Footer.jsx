import React, { useState, useEffect } from "react";
import "./footer.css";

import { FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoTwitter } from "react-icons/io";

import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const FOOTER_TRANSLATIONS = {
  en: { links: ["Home","About","Experience","Services","Portfolio","Testimonials","Contact"], subscribeTitle: "Subscribe to newsletter", placeholder: "your@email.com", btnIdle: "Subscribe", btnLoading: "Sending...", copyright: "All rights reserved.", invalidEmail: "Please enter valid email", successMsg: "Subscribed successfully", failMsg: "Subscription failed", serverErr: "Server error" },
  lt: { links: ["Pradžia","Apie mane","Patirtis","Paslaugos","Portfelis","Atsiliepimai","Kontaktai"], subscribeTitle: "Prenumeruoti naujienlaiškį", placeholder: "jusu@pastas.lt", btnIdle: "Prenumeruoti", btnLoading: "Siunčiama...", copyright: "Visos teisės saugomos.", invalidEmail: "Įveskite teisingą el. paštą", successMsg: "Sėkmingai užsiprenumeravote", failMsg: "Nepavyko užsiprenumeruoti", serverErr: "Serverio klaida" },
  de: { links: ["Startseite","Über mich","Erfahrung","Dienstleistungen","Portfolio","Referenzen","Kontakt"], subscribeTitle: "Newsletter abonnieren", placeholder: "ihre@email.de", btnIdle: "Abonnieren", btnLoading: "Senden...", copyright: "Alle Rechte vorbehalten.", invalidEmail: "Bitte gültige E-Mail eingeben", successMsg: "Erfolgreich abonniert", failMsg: "Abonnement fehlgeschlagen", serverErr: "Serverfehler" },
  fr: { links: ["Accueil","À propos","Expérience","Services","Portfolio","Témoignages","Contact"], subscribeTitle: "S'abonner à la newsletter", placeholder: "votre@email.fr", btnIdle: "S'abonner", btnLoading: "Envoi...", copyright: "Tous droits réservés.", invalidEmail: "Veuillez entrer un email valide", successMsg: "Abonné avec succès", failMsg: "Échec de l'abonnement", serverErr: "Erreur serveur" },
  it: { links: ["Home","Chi sono","Esperienza","Servizi","Portfolio","Testimonianze","Contatto"], subscribeTitle: "Iscriviti alla newsletter", placeholder: "tua@email.it", btnIdle: "Iscriviti", btnLoading: "Invio...", copyright: "Tutti i diritti riservati.", invalidEmail: "Inserisci un'email valida", successMsg: "Iscritto con successo", failMsg: "Iscrizione fallita", serverErr: "Errore del server" },
  es: { links: ["Inicio","Sobre mí","Experiencia","Servicios","Portafolio","Testimonios","Contacto"], subscribeTitle: "Suscribirse al boletín", placeholder: "tu@email.com", btnIdle: "Suscribirse", btnLoading: "Enviando...", copyright: "Todos los derechos reservados.", invalidEmail: "Por favor ingresa un email válido", successMsg: "Suscrito exitosamente", failMsg: "Fallo en la suscripción", serverErr: "Error del servidor" },
  uk: { links: ["Головна","Про мене","Досвід","Послуги","Портфоліо","Відгуки","Контакт"], subscribeTitle: "Підписатися на розсилку", placeholder: "ваш@email.com", btnIdle: "Підписатися", btnLoading: "Надсилання...", copyright: "Всі права захищені.", invalidEmail: "Введіть правильний email", successMsg: "Успішно підписано", failMsg: "Помилка підписки", serverErr: "Помилка сервера" },
  zh: { links: ["首页","关于","经验","服务","作品集","推荐","联系"], subscribeTitle: "订阅新闻通讯", placeholder: "您的@邮箱.com", btnIdle: "订阅", btnLoading: "发送中...", copyright: "版权所有。", invalidEmail: "请输入有效的电子邮件", successMsg: "订阅成功", failMsg: "订阅失败", serverErr: "服务器错误" },
  ru: { links: ["Главная","Обо мне","Опыт","Услуги","Портфолио","Отзывы","Контакт"], subscribeTitle: "Подписаться на рассылку", placeholder: "ваш@email.com", btnIdle: "Подписаться", btnLoading: "Отправка...", copyright: "Все права защищены.", invalidEmail: "Введите корректный email", successMsg: "Успешно подписано", failMsg: "Ошибка подписки", serverErr: "Ошибка сервера" },
};

const linkIds = ["#header","#about","#experience","#services","#portfolio","#testimonials","#contact"];

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const Footer = () => {
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang]       = useState(getLang);

  useEffect(() => {
    const handler = () => setLang(getLang());
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = FOOTER_TRANSLATIONS[lang] || FOOTER_TRANSLATIONS["en"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) { setMessage(t.invalidEmail); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (res.ok) { setMessage(data.message || t.successMsg); setEmail(""); }
      else         { setMessage(data.message || t.failMsg); }
    } catch { setMessage(t.serverErr); }
    finally { setLoading(false); }
  };

  return (
    <footer className="footer">

      <Reveal y={10}>
        <a href="#header" className="footer__logo">MANTAS POČIUIPA</a>
      </Reveal>

      {/* NAVIGATION su Stagger – key={i} užtikrina kad animacija nevyktų iš naujo */}
      <Stagger>
        <ul className="permalinks">
          {t.links.map((name, i) => (
            <StaggerItem key={i}>
              <li><a href={linkIds[i]}>{name}</a></li>
            </StaggerItem>
          ))}
        </ul>
      </Stagger>

      <Reveal y={12} delay={0.1}>
        <div className="footer__socials">
          <a href="https://linkedin.com"  target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="https://github.com"    target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://facebook.com"  target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://twitter.com"   target="_blank" rel="noreferrer" aria-label="Twitter"><IoLogoTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
        </div>
      </Reveal>

      <Reveal y={10} delay={0.15}>
        <div className="footer__subscribe">
          <p className="footer__subscribe-title">{t.subscribeTitle}</p>
          <form className="footer__subscribe-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={t.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? t.btnLoading : t.btnIdle}
            </button>
          </form>
          {message && <p className="form-message">{message}</p>}
        </div>
      </Reveal>

      <Reveal y={8} delay={0.2}>
        <div className="footer__copyright">
          <small>© {new Date().getFullYear()} Mantas Počiuipa. {t.copyright}</small>
        </div>
      </Reveal>

    </footer>
  );
};

export default Footer;
