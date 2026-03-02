import React, { useRef, useState } from "react";
import "./contact.css";
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import emailjs from "emailjs-com";

import Reveal from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sq6b9op",
        "template_k1x5xiq",
        form.current,
        "c7gM2rC3G9e3ntxxG"
      )
      .then(
        () => {
          setStatus("success");
          form.current.reset();
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <section id="contact">
      <div className="section__header">
    <Reveal y={10}><h5>Get In Touch</h5></Reveal>
    <Reveal y={12} delay={0.06}><h2>Contact Me</h2></Reveal>
  </div>

      <div className="container contact__container">
        {/* LEFT SIDE – CONTACT OPTIONS */}
        <Reveal y={18} delay={0.1}>
          <div className="contact__options">

            <Stagger>
              <StaggerItem>
                <article className="contact__option">
                  <MdOutlineEmail className="contact__option-icon" />
                  <h4>Email</h4>
                  <h5>mantis.poc@gmail.com</h5>
                  <a
                    href="mailto:mantis.poc@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Send a message
                  </a>
                </article>
              </StaggerItem>

              <StaggerItem>
                <article className="contact__option">
                  <RiMessengerLine className="contact__option-icon" />
                  <h4>Messenger</h4>
                  <h5>mantaspociuipa</h5>
                  <a
                    href="https://m.me/Mantas.Pociuipa"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Send a message
                  </a>
                </article>
              </StaggerItem>

              <StaggerItem>
                <article className="contact__option">
                  <BsWhatsapp className="contact__option-icon" />
                  <h4>WhatsApp</h4>
                  <h5>+37060414208</h5>
                  <a
                    href="https://api.whatsapp.com/send?phone=37067513104"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Send a message
                  </a>
                </article>
              </StaggerItem>
            </Stagger>

          </div>
        </Reveal>

        {/* RIGHT SIDE – FORM */}
        <Reveal y={18} delay={0.14}>
          <form ref={form} onSubmit={sendEmail} className="contact__form">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              rows="7"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>

            {status === "success" && (
              <p className="contact__status success">
                Message sent successfully ✔
              </p>
            )}

            {status === "error" && (
              <p className="contact__status error">
                Something went wrong. Try again.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;