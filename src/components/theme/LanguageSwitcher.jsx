import React, { useState, useEffect, useRef, useCallback } from "react";
import "./LanguageSwitcher.css";
import { useLang } from "./LangContext";

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "lt", flag: "🇱🇹", label: "Lietuvių" },
  { code: "de", flag: "🇩🇪", label: "Vokiečių" },
  { code: "fr", flag: "🇫🇷", label: "Prancūzų" },
  { code: "it", flag: "🇮🇹", label: "Italų" },
  { code: "es", flag: "🇪🇸", label: "Ispanų" },
  { code: "uk", flag: "🇺🇦", label: "Ukrainiečių" },
  { code: "zh", flag: "🇨🇳", label: "Kinų" },
  { code: "ru", flag: "🇷🇺", label: "Rusų" },
];

const LanguageSwitcher = () => {
  const [open, setOpen]       = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const wrapperRef            = useRef(null);
  const { setLangCode }       = useLang();

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLanguage = useCallback((lang) => {
    setOpen(false);
    setCurrent((prev) => prev.code === lang.code ? prev : lang);

    // Išsaugom kalbą ir pranešam visiems komponentams
    localStorage.setItem("portfolioLang", lang.code);
    setLangCode(lang.code);
    window.dispatchEvent(new Event("langchange"));
  }, [setLangCode]);

  return (
    <div className="lang-switcher" ref={wrapperRef}>
      <button
        className="lang-switcher__btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Change language"
      >
        <span className="lang-switcher__globe">🌐</span>
        <span className="lang-switcher__label">{current.flag}</span>
        <span className={`lang-switcher__chevron ${open ? "lang-switcher__chevron--open" : ""}`}>▼</span>
      </button>

      {open && (
        <ul className="lang-switcher__dropdown" role="listbox">
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code === current.code}
              className={`lang-switcher__option ${lang.code === current.code ? "lang-switcher__option--active" : ""}`}
              onClick={() => selectLanguage(lang)}
            >
              <span className="lang-switcher__flag">{lang.flag}</span>
              <span className="lang-switcher__name">{lang.label}</span>
              {lang.code === current.code && <span className="lang-switcher__check">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
