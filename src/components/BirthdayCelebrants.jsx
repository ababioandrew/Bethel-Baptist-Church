import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./BirthdayCelebrants.css";

const BIN_ID = process.env.REACT_APP_JSONBIN_BIN_ID || "6af8d362ac6210605a88248b";
const MASTER_KEY = process.env.REACT_APP_JSONBIN_MASTER_KEY;

const parseDateSafe = (dateStr) => {
  if (!dateStr) return null;
  let d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;
  const parts = dateStr.split(/[-/]/);
  if (parts.length === 3) {
    d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
};

export default function BirthdayCelebrants() {
  const { t, i18n } = useTranslation();
  const [birthdays, setBirthdays] = useState([]);
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        setLoading(true);
        let data = null;
        try {
          const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { "X-Master-Key": MASTER_KEY },
          });
          if (r.ok) data = await r.json();
        } catch (err) {
          console.warn("JSONBin fetch failed, falling back to local storage.", err);
        }
        if (!data) {
          const backup = localStorage.getItem("bethel_dashboard_backup");
          if (backup) data = JSON.parse(backup);
        }
        let members = [];
        if (data) {
          if (data?.record?.members && Array.isArray(data.record.members)) members = data.record.members;
          else if (Array.isArray(data?.record)) members = data.record;
          else if (Array.isArray(data?.members)) members = data.members;
          else if (Array.isArray(data)) members = data;
        }
        processBirthdays(members);
      } catch (e) {
        console.error("Failed to load birthday celebrants:", e);
        setBirthdays([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBirthdays();
  }, []);

  const processBirthdays = (members) => {
    const today = new Date();
    const currentMonthIndex = today.getMonth();
    const currentDay = today.getDate();
    const monthName = new Intl.DateTimeFormat(i18n.language, { month: "long" })
      .format(today);
    setMonth(monthName);

    const list = members
      .filter((m) => {
        const bd = parseDateSafe(m.dateOfBirth);
        return bd && bd.getMonth() === currentMonthIndex;
      })
      .map((m) => {
        const bd = parseDateSafe(m.dateOfBirth);
        const birthDay = bd.getDate();
        let age = today.getFullYear() - bd.getFullYear();
        const had =
          today.getMonth() > bd.getMonth() ||
          (today.getMonth() === bd.getMonth() && currentDay >= birthDay);
        if (!had) age--;

        let ageGroup = "adult";
        if (age < 13) ageGroup = "child";
        else if (age < 18) ageGroup = "youth";

        let status = "upcoming";
        if (birthDay === currentDay) status = "today";
        else if (birthDay < currentDay) status = "past";

        return { ...m, birthDay, calculatedAge: age > 0 ? age : null, ageGroup, status };
      })
      .sort((a, b) => a.birthDay - b.birthDay);

    setBirthdays(list);
  };

  if (loading) {
    return (
      <section className="birthday-section birthday-loading">
        <div className="spinner birthday-spinner" />
        <p>{t("birthdays.loading")}</p>
      </section>
    );
  }

  const upcoming = birthdays.filter((b) => b.status === "upcoming" || b.status === "today");
  const past = birthdays.filter((b) => b.status === "past");

  const fmtDate = (str) => {
    const d = parseDateSafe(str);
    if (!d) return "";
    return new Intl.DateTimeFormat(i18n.language, { month: "long", day: "numeric" }).format(d);
  };

  return (
    <>
      <section className="birthday-section">
        <div className="birthday-header">
          <div>
            <span className="birthday-small-title">{t("birthdays.eyebrow")}</span>
            <h2>{t("birthdays.title", { month })}</h2>
            <p>{t("birthdays.subtitle")}</p>
          </div>
          {birthdays.length > 0 && (
            <button className="birthday-preview-button" onClick={() => setShowPreview(true)}>
              {t("birthdays.previewAll")}
            </button>
          )}
        </div>

        {birthdays.length === 0 ? (
          <div className="birthday-empty">
            <p>{t("birthdays.empty", { month })}</p>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div style={{ marginBottom: "var(--space-6)" }}>
                <h3 className="birthday-group-title">
                  {t("birthdays.upcoming", { month })}
                </h3>
                <div className="birthday-grid">
                  {upcoming.map((m) => (
                    <div
                      key={m.id || m.fullName}
                      className={`birthday-card ${m.status === "today" ? "is-today" : ""}`}
                    >
                      <div className="birthday-icon" aria-hidden="true">
                        {m.status === "today" ? "🎉" : "🎂"}
                      </div>
                      <div className="birthday-info">
                        <h3>
                          {m.fullName}
                          {m.role === "Leader" && <span className="leader-crown">👑</span>}
                        </h3>
                        <p className="birthday-date">
                          🎈 {fmtDate(m.dateOfBirth)}
                          {m.status === "today" && (
                            <span className="today-badge">{t("birthdays.today")}</span>
                          )}
                        </p>
                        {m.location && <p className="birthday-location">📍 {m.location}</p>}
                        {m.contacts && (
                          <p className="birthday-contact">📞 {m.contacts}</p>
                        )}
                        <div className="birthday-badges-row">
                          {m.calculatedAge && (
                            <span className="birthday-badge age-badge">
                              {t("birthdays.turning", { age: m.calculatedAge })}
                            </span>
                          )}
                          <span className="birthday-badge">{t(`birthdays.ageGroups.${m.ageGroup}`)}</span>
                          {m.maritalStatus && <span className="birthday-badge">{m.maritalStatus}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h3 className="birthday-group-title past-title">
                  {t("birthdays.celebrated", { month })}
                </h3>
                <div className="birthday-grid">
                  {past.map((m) => (
                    <div className="birthday-card past-celebration" key={m.id || m.fullName}>
                      <div className="birthday-icon" aria-hidden="true">🎂</div>
                      <div className="birthday-info">
                        <h3>
                          {m.fullName}
                          {m.role === "Leader" && <span className="leader-crown">👑</span>}
                        </h3>
                        <p className="birthday-date">🎈 {fmtDate(m.dateOfBirth)}</p>
                        {m.location && <p className="birthday-location">📍 {m.location}</p>}
                        {m.contacts && <p className="birthday-contact">📞 {m.contacts}</p>}
                        <div className="birthday-badges-row">
                          <span className="birthday-badge success-badge">
                            {t("birthdays.celebratedBadge")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {showPreview && (
        <div
          className="birthday-modal-overlay"
          onClick={() => setShowPreview(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="birthday-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="birthday-close"
              onClick={() => setShowPreview(false)}
              aria-label={t("birthdays.close")}
            >×</button>
            <div className="birthday-modal-icon" aria-hidden="true">🎉</div>
            <h2>{t("birthdays.title", { month })}</h2>
            <p className="birthday-modal-subtitle">{t("birthdays.modalSubtitle")}</p>
            <div className="birthday-preview-list">
              {birthdays.map((m) => (
                <div className="birthday-preview-item" key={m.id || m.fullName}>
                  <div
                    className="preview-date"
                    style={{
                      background:
                        m.status === "today"
                          ? "#e11d48"
                          : m.status === "past"
                          ? "#94a3b8"
                          : "var(--brand-accent)",
                    }}
                  >
                    {m.birthDay}
                  </div>
                  <div className="preview-details">
                    <h3>
                      {m.fullName}
                      {m.role === "Leader" && <span className="leader-crown">👑</span>}
                    </h3>
                    <p>🎂 {fmtDate(m.dateOfBirth)}</p>
                    {m.location && <span>📍 {m.location}</span>}
                    {m.contacts && <span className="preview-contact">📞 {m.contacts}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="birthday-modal-footer">{t("birthdays.footer")}</div>
          </div>
        </div>
      )}
    </>
  );
}