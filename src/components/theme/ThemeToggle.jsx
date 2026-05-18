import React, { useEffect, useState } from "react";
import { useLang } from "./LangContext";

const THEME_KEY = "theme";

const THEME_TRANSLATIONS = {
  en: { light: "Light", dark: "Dark" },
  lt: { light: "Šviesi", dark: "Tamsi" },
  de: { light: "Hell", dark: "Dunkel" },
  fr: { light: "Clair", dark: "Sombre" },
  it: { light: "Chiaro", dark: "Scuro" },
  es: { light: "Claro", dark: "Oscuro" },
  uk: { light: "Світла", dark: "Темна" },
  zh: { light: "浅色", dark: "深色" },
  ru: { light: "Светлая", dark: "Тёмная" },
};

const getPreferredTheme = () => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
};

const applyTheme = (theme) => {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");
  const { langCode } = useLang();
  console.log("ThemeToggle langCode:", langCode); 
  const t = THEME_TRANSLATIONS[langCode] || THEME_TRANSLATIONS["en"];

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      <span className="theme-toggle__text">
        {theme === "dark" ? t.light : t.dark}
      </span>
    </button>
  );
};

export default ThemeToggle;
