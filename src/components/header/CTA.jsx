import React, { useState, useEffect } from "react";
import CV from "../../assets/cv.pdf";

const CTA_T = {
  en: { download: "Download CV", talk: "Let's Talk" },
  lt: { download: "Atsisiųsti CV", talk: "Susisiekti" },
  de: { download: "Lebenslauf herunterladen", talk: "Kontakt aufnehmen" },
  fr: { download: "Télécharger CV", talk: "Discutons" },
  it: { download: "Scarica CV", talk: "Parliamo" },
  es: { download: "Descargar CV", talk: "Hablemos" },
  uk: { download: "Завантажити CV", talk: "Зв'яжіться" },
  zh: { download: "下载简历", talk: "联系我" },
  ru: { download: "Скачать CV", talk: "Связаться" },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const CTA = ({ onLetsTalkClick }) => {
  const [lang, setLang] = useState(getLang);

  useEffect(() => {
    const handler = () => setLang(getLang());
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = CTA_T[lang] || CTA_T["en"];

  return (
    <div className="cta">
      <a href={CV} download className="btn">{t.download}</a>
      <a href="#contact" className="btn btn-primary" onClick={onLetsTalkClick}>{t.talk}</a>
    </div>
  );
};

export default CTA;
