import { useState, useEffect } from "react";
import CookieSettings from "./CookieSettings";
import "./styles/cookie.css";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setShow(true);
    }
  }, []);

  const saveConsent = (type) => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        type,
        date: new Date().toISOString(),
      }),
    );

    setShow(false);
  };

  if (!show) return null;
  if (showSettings) {
    return (
      <CookieSettings
        close={() => {
          setShow(false);
          setShowSettings(false);
        }}
      />
    );
  }

  return (
    <div className="cookie">
      <div className="cookie__box">
        <h2>🍪 Cookie Preferences</h2>

        <p>
          We use cookies to improve your experience, analyze website traffic,
          remember preferences and improve our services. Essential cookies are
          always enabled.
        </p>

        <div className="cookie__buttons">
          <button
            className="cookie__secondary"
            onClick={() => saveConsent("essential")}
          >
            Reject Non-Essential
          </button>

          <button
            className="cookie__secondary"
            onClick={() => setShowSettings(true)}
          >
            Customize
          </button>

          <button
            className="cookie__primary"
            onClick={() => saveConsent("all")}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
