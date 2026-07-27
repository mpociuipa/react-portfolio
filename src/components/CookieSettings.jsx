import { useState } from "react";
import "./styles/cookie.css";

export default function CookieSettings({ close }) {
  const [analytics, setAnalytics] = useState(false);

  const [marketing, setMarketing] = useState(false);

  const save = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        type: "custom",
        date: new Date().toISOString(),
      }),
    );

    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        analytics,
        marketing,
      }),
    );

    close();
  };

  return (
    <div className="cookie">
      <div className="cookie__box">
        <h2>Cookie Preferences</h2>

        <p>Select which cookies you would like to allow.</p>

        <label>
          <input type="checkbox" checked disabled />
          Necessary Cookies
        </label>

        <br />
        <br />

        <label>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          Analytics Cookies
        </label>

        <br />
        <br />

        <label>
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          Marketing Cookies
        </label>

        <br />
        <br />

        <button className="cookie__primary" onClick={save}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}
