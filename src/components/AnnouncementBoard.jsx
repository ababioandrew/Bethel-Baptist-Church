import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { FaBullhorn, FaTrash } from "react-icons/fa";
import "./AnnouncementBoard.css";
// import { 
//   JSONBIN_BIN_ID as BIN_ID, 
//   JSONBIN_MASTER_KEY as MASTER_KEY, 
//   ADMIN_DELETE_PASSWORD 
// } from "../data/validation";

const BIN_ID = "6b0615acac6210605aa1f169";
const MASTER_KEY = "$2a$10$vHVlIdrYpHuwF/VxfmetyufB6JoAqbipsW/Wi5vn6284P/lTnYQHO";
const ADMIN_DELETE_PASSWORD = ".bbc";

const API = {
  base: `https://api.jsonbin.io/v3/b/${BIN_ID}`,
  latest: `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
};

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "X-Master-Key": MASTER_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }
  if (!response.ok) {
    const message = data && typeof data === "object" ? data.message || data.error : data;
    throw new Error(message || `Request failed (${response.status})`);
  }
  return data;
}

export default function AnnouncementBoard() {
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState([]);
  const [fullRecord, setFullRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchJSON(API.latest);
      const record = data?.record || data || {};
      setFullRecord(record);
      setAnnouncements(Array.isArray(record.announcements) ? record.announcements : []);
    } catch (err) {
      console.error("Announcement load failed:", err);
      Swal.fire({ icon: "error", title: "Could not load announcements", text: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (a) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete Announcement?",
      html: `Are you sure you want to delete <strong>${a.title}</strong>?`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });
    if (!confirm.isConfirmed) return;

    const pw = await Swal.fire({
      title: "Admin Password Required",
      input: "password",
      inputPlaceholder: "Enter admin password",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
      inputValidator: (v) => (!v || !v.trim() ? "Password cannot be empty." : null),
    });
    if (!pw.isConfirmed) return;
    if (pw.value !== ADMIN_DELETE_PASSWORD) {
      return Swal.fire({ icon: "error", title: "Incorrect Password", confirmButtonColor: "#d33" });
    }

    try {
      setDeleting(true);
      const updatedList = announcements.filter((x) => x.id !== a.id);
      const payload = { ...(fullRecord || {}), announcements: updatedList };
      await fetchJSON(API.base, { method: "PUT", body: JSON.stringify(payload) });
      setFullRecord(payload);
      setAnnouncements(updatedList);
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Announcement removed.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Delete Failed", text: err.message });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <section className="announcement-section">
        <p className="announcement-loading">Loading announcements…</p>
      </section>
    );
  }

  return (
    <section className="announcement-section">
      <h2 className="announcement-title">
        <FaBullhorn aria-hidden="true" /> {t("announcements.title")}
      </h2>

      {announcements.length === 0 ? (
        <p className="announcement-empty">{t("announcements.empty")}</p>
      ) : (
        <div className="announcement-list">
          {announcements.map((a) => (
            <article key={a.id} className="announcement-card">
              <div className="announcement-card__header">
                <h3 className="announcement-card__title">{a.title}</h3>
                <div className="announcement-card__actions">
                  <span className="announcement-card__date">{a.date}</span>

                  <button
                    type="button"
                    className="announcement-delete"
                    onClick={() => handleDelete(a)}
                    disabled={deleting}
                    title="Delete announcement"
                    aria-label={`Delete announcement: ${a.title}`}
                  >
                    <FaTrash aria-hidden="true" />
                    <span>{deleting ? "Deleting..." : "Delete"}</span>
                  </button>



                </div>
              </div>
              <p className="announcement-card__message">{a.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}