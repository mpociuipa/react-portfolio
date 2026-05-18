import React, { useState, useEffect } from "react";
import "./LikeButton.css";

const REACTIONS = [
  { emoji: "👎", label: "Thumbs down" },
  { emoji: "👊", label: "Fist bump" },
  { emoji: "👍", label: "Thumbs up" },
  { emoji: "❤️",  label: "Love" },
];

const LIKE_T = {
  en: { label: "How did you like it?", reactions: ["reaction", "reactions"] },
  lt: { label: "Kaip patiko?", reactions: ["reakcija", "reakcijos"] },
  de: { label: "Wie hat es Ihnen gefallen?", reactions: ["Reaktion", "Reaktionen"] },
  fr: { label: "Comment avez-vous aimé?", reactions: ["réaction", "réactions"] },
  it: { label: "Come ti è piaciuto?", reactions: ["reazione", "reazioni"] },
  es: { label: "¿Cómo te gustó?", reactions: ["reacción", "reacciones"] },
  uk: { label: "Як вам сподобалось?", reactions: ["реакція", "реакцій"] },
  zh: { label: "你觉得怎么样？", reactions: ["反应", "反应"] },
  ru: { label: "Как вам понравилось?", reactions: ["реакция", "реакций"] },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const LikeButton = () => {
  const [counts, setCounts] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_reactions");
      const parsed = saved ? JSON.parse(saved) : [0, 0, 0, 0];
      return Array.isArray(parsed) && parsed.length === 4
        ? parsed.map(n => (typeof n === "number" && !isNaN(n) ? n : 0))
        : [0, 0, 0, 0];
    } catch { return [0, 0, 0, 0]; }
  });

  const [active, setActive] = useState(() => {
    try { return JSON.parse(localStorage.getItem("portfolio_reactions_active") || "null"); }
    catch { return null; }
  });

  const [burst, setBurst]       = useState(null);
  const [floaters, setFloaters] = useState([]);
  const [lang, setLang]         = useState(getLang);

  useEffect(() => {
    localStorage.setItem("portfolio_reactions", JSON.stringify(counts));
  }, [counts]);

  useEffect(() => {
    localStorage.setItem("portfolio_reactions_active", JSON.stringify(active));
  }, [active]);

  useEffect(() => {
    const handler = () => setLang(getLang());
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = LIKE_T[lang] || LIKE_T["en"];

  const handleClick = (i) => {
    setBurst(i);
    setTimeout(() => setBurst(null), 400);

    const id = Date.now();
    setFloaters(f => [...f, { id, i }]);
    setTimeout(() => setFloaters(f => f.filter(x => x.id !== id)), 1000);

    setCounts(prev => {
      const next = [...prev];
      if (active === i) {
        next[i] = Math.max(0, next[i] - 1);
        setActive(null);
      } else {
        if (active !== null) next[active] = Math.max(0, next[active] - 1);
        next[i] += 1;
        setActive(i);
      }
      return next;
    });
  };

  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <div className="like-widget">
      <p className="like-widget__label">{t.label}</p>

      <div className="like-widget__buttons">
        {REACTIONS.map((r, i) => (
          <button
            key={i}
            className={`like-btn ${active === i ? "like-btn--active" : ""} ${burst === i ? "like-btn--burst" : ""}`}
            onClick={() => handleClick(i)}
            aria-label={r.label}
            title={r.label}
          >
            <span className="like-btn__emoji">{r.emoji}</span>
            <span className="like-btn__count">{counts[i]}</span>
          </button>
        ))}
      </div>

      {total > 0 && (
        <p className="like-widget__total">
          {total} {total === 1 ? t.reactions[0] : t.reactions[1]}
        </p>
      )}

      {floaters.map(({ id, i }) => (
        <span key={id} className="like-floater" style={{ left: `${15 + i * 22}%` }}>
          {REACTIONS[i].emoji}
        </span>
      ))}
    </div>
  );
};

export default LikeButton;
