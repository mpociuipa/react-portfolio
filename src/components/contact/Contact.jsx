import React, { useRef, useState, useEffect } from "react";
import "./contact.css";
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import emailjs from "emailjs-com";
import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const CONTACT_T = {
  en: { sub: "Get In Touch", title: "Contact Me", sendMsg: "Send a message", namePh: "Your Full Name", emailPh: "Your Email", msgPh: "Your Message", submit: "Send Message", success: "Message sent successfully ✔", error: "Something went wrong. Try again." },
  lt: { sub: "Susisiekite", title: "Kontaktai", sendMsg: "Siųsti žinutę", namePh: "Jūsų vardas", emailPh: "Jūsų el. paštas", msgPh: "Jūsų žinutė", submit: "Siųsti žinutę", success: "Žinutė išsiųsta sėkmingai ✔", error: "Kažkas nepavyko. Bandykite dar kartą." },
  de: { sub: "In Kontakt treten", title: "Kontakt", sendMsg: "Nachricht senden", namePh: "Ihr vollständiger Name", emailPh: "Ihre E-Mail", msgPh: "Ihre Nachricht", submit: "Nachricht senden", success: "Nachricht erfolgreich gesendet ✔", error: "Etwas ist schief gelaufen. Versuchen Sie es erneut." },
  fr: { sub: "Entrer en contact", title: "Me contacter", sendMsg: "Envoyer un message", namePh: "Votre nom complet", emailPh: "Votre e-mail", msgPh: "Votre message", submit: "Envoyer le message", success: "Message envoyé avec succès ✔", error: "Quelque chose a mal tourné. Réessayez." },
  it: { sub: "Mettersi in contatto", title: "Contattami", sendMsg: "Invia un messaggio", namePh: "Il tuo nome completo", emailPh: "La tua email", msgPh: "Il tuo messaggio", submit: "Invia messaggio", success: "Messaggio inviato con successo ✔", error: "Qualcosa è andato storto. Riprova." },
  es: { sub: "Ponerse en contacto", title: "Contáctame", sendMsg: "Enviar un mensaje", namePh: "Su nombre completo", emailPh: "Su correo electrónico", msgPh: "Su mensaje", submit: "Enviar mensaje", success: "Mensaje enviado exitosamente ✔", error: "Algo salió mal. Inténtalo de nuevo." },
  uk: { sub: "Зв'язатися", title: "Контакт", sendMsg: "Надіслати повідомлення", namePh: "Ваше повне ім'я", emailPh: "Ваша електронна пошта", msgPh: "Ваше повідомлення", submit: "Надіслати", success: "Повідомлення успішно надіслано ✔", error: "Щось пішло не так. Спробуйте ще раз." },
  zh: { sub: "联系方式", title: "联系我", sendMsg: "发送消息", namePh: "您的全名", emailPh: "您的电子邮件", msgPh: "您的留言", submit: "发送消息", success: "消息发送成功 ✔", error: "出了点问题。请再试一次。" },
  ru: { sub: "Связаться", title: "Контакт", sendMsg: "Отправить сообщение", namePh: "Ваше полное имя", emailPh: "Ваш email", msgPh: "Ваше сообщение", submit: "Отправить", success: "Сообщение успешно отправлено ✔", error: "Что-то пошло не так. Попробуйте ещё раз." },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handler = () => { forceUpdate({}); setStatus(null); };
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = CONTACT_T[getLang()] || CONTACT_T["en"];

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_sq6b9op", "template_k1x5xiq", form.current, "c7gM2rC3G9e3ntxxG")
      .then(() => { setStatus("success"); form.current.reset(); }, () => { setStatus("error"); });
  };

  return (
    <section id="contact">
      <div className="section__header">
        <Reveal y={10}><h5>{t.sub}</h5></Reveal>
        <Reveal y={12} delay={0.06}><h2>{t.title}</h2></Reveal>
      </div>
      <div className="container contact__container">
        <Reveal y={18} delay={0.1}>
          <div className="contact__options">
            <Stagger>
              <StaggerItem>
                <article className="contact__option">
                  <MdOutlineEmail className="contact__option-icon" />
                  <h4>Email</h4>
                  <h5>mantis.poc@gmail.com</h5>
                  <a href="mailto:mantis.poc@gmail.com" target="_blank" rel="noreferrer">{t.sendMsg}</a>
                </article>
              </StaggerItem>
              <StaggerItem>
                <article className="contact__option">
                  <RiMessengerLine className="contact__option-icon" />
                  <h4>Messenger</h4>
                  <h5>mantaspociuipa</h5>
                  <a href="https://m.me/Mantas.Pociuipa" target="_blank" rel="noreferrer">{t.sendMsg}</a>
                </article>
              </StaggerItem>
              <StaggerItem>
                <article className="contact__option">
                  <BsWhatsapp className="contact__option-icon" />
                  <h4>WhatsApp</h4>
                  <h5>+37060414208</h5>
                  <a href="https://api.whatsapp.com/send?phone=37067513104" target="_blank" rel="noreferrer">{t.sendMsg}</a>
                </article>
              </StaggerItem>
            </Stagger>
          </div>
        </Reveal>
        <Reveal y={18} delay={0.14}>
          <form ref={form} onSubmit={sendEmail} className="contact__form">
            <input type="text"  name="name"    placeholder={t.namePh}  required />
            <input type="email" name="email"   placeholder={t.emailPh} required />
            <textarea           name="message" rows="7" placeholder={t.msgPh} required></textarea>
            <button type="submit" className="btn btn-primary">{t.submit}</button>
            {status === "success" && <p className="contact__status success">{t.success}</p>}
            {status === "error"   && <p className="contact__status error">{t.error}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
