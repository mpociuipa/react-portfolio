import React, { useState, useEffect } from "react";
import "./LikeButton.css";

const SUPABASE_URL = "https://pnmbokqqxmnjmrlierzk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubWJva3FxeG1uam1ybGllcnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTM1NzMsImV4cCI6MjA5NDY2OTU3M30.tUNR73YETBqj7Td8jlNGd68xiPGtETOmdKM43gLy5O8"; // ← įdėk savo naują raktą

const REACTIONS = [
  { emoji: "👎", label: "Thumbs down", id: "thumbs_down" },
  { emoji: "👊", label: "Fist bump",   id: "fist"        },
  { emoji: "👍", label: "Thumbs up",   id: "thumbs_up"   },
  { emoji: "❤️",  label: "Love",        id: "heart"       },
];

const LIKE_T = {
  en: { label: "How did you like it?", reactions: ["reaction", "reactions"] },
  lt: { label: "Kaip patiko?",          reactions: ["reakcija", "reakcijos"] },
  de: { label: "Wie hat es Ihnen gefallen?", reactions: ["Reaktion", "Reaktionen"] },
  fr: { label: "Comment avez-vous aimé?",    reactions: ["réaction", "réactions"] },
  it: { label: "Come ti è piaciuto?",        reactions: ["reazione", "reazioni"] },
  es: { label: "¿Cómo te gustó?",            reactions: ["reacción", "reacciones"] },
  uk: { label: "Як вам сподобалось?",        reactions: ["реакція", "реакцій"] },
  zh: { label: "你觉得怎么样？",              reactions: ["反应", "反应"] },
  ru: { label: "Как вам понравилось?",       reactions: ["реакция", "реакций"] },
};

const getLang = () => { try { return localStorage.getItem("portfolioLang") || "en"; } catch { return "en"; } };

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

async function fetchCounts() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/reactions?select=id,count`, { headers: HEADERS });
  return res.json();
}

async function updateCount(id, delta) {
  // Pirma gauk dabartinę reikšmę
  const res  = await fetch(`${SUPABASE_URL}/rest/v1/reactions?id=eq.${id}&select=count`, { headers: HEADERS });
  const data = await res.json();
  if (!data || !data[0]) return;
  const newCount = Math.max(0, data[0].count + delta);
  await fetch(`${SUPABASE_URL}/rest/v1/reactions?id=eq.${id}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({ count: newCount }),
  });
}

const LikeButton = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [active, setActive] = useState(() => {
    try { return JSON.parse(localStorage.getItem("portfolio_reactions_active") || "null"); }
    catch { return null; }
  });
  const [burst, setBurst]       = useState(null);
  const [floaters, setFloaters] = useState([]);
  const [lang, setLang]         = useState(getLang);

  useEffect(() => {
    fetchCounts().then(data => {
      if (!Array.isArray(data)) return;
      const next = [0, 0, 0, 0];
      REACTIONS.forEach((r, i) => {
        const row = data.find(d => d.id === r.id);
        if (row) next[i] = row.count;
      });
      setCounts(next);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = () => setLang(getLang());
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const t = LIKE_T[lang] || LIKE_T["en"];

  const handleClick = async (i) => {
    setBurst(i);
    setTimeout(() => setBurst(null), 400);

    const id = Date.now();
    setFloaters(f => [...f, { id, i }]);
    setTimeout(() => setFloaters(f => f.filter(x => x.id !== id)), 1000);

    const prevActive = active;

    if (prevActive === i) {
      setActive(null);
      localStorage.setItem("portfolio_reactions_active", "null");
      setCounts(prev => { const n = [...prev]; n[i] = Math.max(0, n[i] - 1); return n; });
      await updateCount(REACTIONS[i].id, -1);
    } else {
      if (prevActive !== null) {
        setCounts(prev => { const n = [...prev]; n[prevActive] = Math.max(0, n[prevActive] - 1); return n; });
        await updateCount(REACTIONS[prevActive].id, -1);
      }
      setActive(i);
      localStorage.setItem("portfolio_reactions_active", JSON.stringify(i));
      setCounts(prev => { const n = [...prev]; n[i] += 1; return n; });
      await updateCount(REACTIONS[i].id, 1);
    }
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
