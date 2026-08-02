import { useState } from "react";
import "./Settings.css";

const accentColors = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#f97316", "#ec4899", "#ef4444"];

function Settings() {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState(accentColors[0]);
  const [language, setLanguage] = useState("English");
  const [autoSummarize, setAutoSummarize] = useState(true);

  return (
    <div className="settings-page card">
      <h2>AI Knowledge Search</h2>
      <p className="settings-sub">Customize your experience.</p>

      <section className="settings-section">
        <h3>Appearance</h3>

        <div className="settings-row">
          <span>Theme</span>
          <div className="theme-toggle">
            {["Light", "Dark", "System"].map((t) => (
              <button
                key={t}
                className={theme === t.toLowerCase() ? "active" : ""}
                onClick={() => setTheme(t.toLowerCase())}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-row">
          <span>Accent Color</span>
          <div className="accent-swatches">
            {accentColors.map((c) => (
              <button
                key={c}
                className={`swatch ${accent === c ? "active" : ""}`}
                style={{ background: c }}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h3>Other</h3>

        <div className="settings-row">
          <span>Language</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div className="settings-row">
          <span>Auto Summarize</span>
          <button
            className={`switch ${autoSummarize ? "on" : ""}`}
            onClick={() => setAutoSummarize(!autoSummarize)}
          >
            <span className="knob" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Settings;