import React, { useState, useEffect } from "react";
import "./LikeButton.css";

const REACTIONS = [
  { emoji: "👎", label: "Thumbs down" },
  { emoji: "👊", label: "Fist bump" },
  { emoji: "👍", label: "Thumbs up" },
  { emoji: "❤️",  label: "Love" },
];

const LikeButton = () => {
  const [counts, setCounts] = useState(() => {
  try {
    const saved = localStorage.getItem("portfolio_reactions");
    const parsed = saved ? JSON.parse(saved) : [0, 0, 0];
    return Array.isArray(parsed) && parsed.length === 3
      ? parsed.map(n => (typeof n === "number" && !isNaN(n) ? n : 0))
      : [0, 0, 0];
  } catch { return [0, 0, 0]; }
});
  const [active, setActive]       = useState(() => {
    try { return JSON.parse(localStorage.getItem("portfolio_reactions_active") || "null"); }
    catch { return null; }
  });
  const [burst, setBurst]         = useState(null);
  const [floaters, setFloaters]   = useState([]);

  useEffect(() => {
    localStorage.setItem("portfolio_reactions", JSON.stringify(counts));
  }, [counts]);

  useEffect(() => {
    localStorage.setItem("portfolio_reactions_active", JSON.stringify(active));
  }, [active]);

  const handleClick = (i) => {
    setBurst(i);
    setTimeout(() => setBurst(null), 400);

    // spawn floating emoji
    const id = Date.now();
    setFloaters(f => [...f, { id, i }]);
    setTimeout(() => setFloaters(f => f.filter(x => x.id !== id)), 1000);

    setCounts(prev => {
      const next = [...prev];
      if (active === i) {
        // untoggle
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
      <p className="like-widget__label">Kaip patiko?</p>

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
          {total} {total === 1 ? "reakcija" : total < 10 ? "reakcijos" : "reakcijų"}
        </p>
      )}

      {/* Floating emojis */}
      {floaters.map(({ id, i }) => (
        <span key={id} className="like-floater" style={{ left: `${30 + i * 30}%` }}>
          {REACTIONS[i].emoji}
        </span>
      ))}
    </div>
  );
};

export default LikeButton;
