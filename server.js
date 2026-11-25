// server.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import axios from "axios";

// ============================================================
// HARDCODED CONFIGURATION — NO .env REQUIRED
// ============================================================

const CONFIG = {
  // --- Server ---
  PORT: 5000,
  NODE_ENV: "development",

  // --- Branding (Bethel Baptist) ---
  CHURCH_NAME: "Bethel Baptist",
  CHURCH_FULL_NAME: "Bethel Baptist Church",
  CHURCH_TAG: "#BethelBaptist",
  CHURCH_EMAIL: "info@bethelbaptist.org",
  CHURCH_PHONE: "+233207464426",

  // --- Admin auth ---
  ADMIN_PASSWORD: "bethel2025",

  // --- Email (Gmail + App Password) ---
  // To generate an App Password: https://myaccount.google.com/apppasswords
  EMAIL_USER: "bethelbaptistchurch@gmail.com",
  EMAIL_PASS: "your-16-char-app-password-here",
  ENQUIRY_EMAIL: "info@bethelbaptist.org",

  // --- SMS (FastHostTech) ---
  SMS_TOKEN: "ad7f314d2725f7709692a8a5ce312913665f5de0e070c6cb2ba7ecc5906dc69d",
  SMS_SENDER: "BETHEL",
  SMS_ENDPOINT: "https://api.fasthosttech.com/fastapi/v1/send-sms/",

  // --- Storage ---
  DATA_DIR: "", // resolved below to <project>/data
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = CONFIG.DATA_DIR || path.join(__dirname, "data");

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ============================================================
// EMAIL TRANSPORTER
// ============================================================
let transporter = null;

try {
  if (CONFIG.EMAIL_USER && CONFIG.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: CONFIG.EMAIL_USER,
        pass: CONFIG.EMAIL_PASS,
      },
    });
    console.log("✅ Email transporter configured");
  } else {
    console.warn("⚠️  Email credentials not configured");
  }
} catch (error) {
  console.error("❌ Email configuration error:", error.message);
}

const ADMIN_PASSWORD = CONFIG.ADMIN_PASSWORD;

// ============================================================
// IN-MEMORY + DISK STORE
// ============================================================
const seedAnnouncements = [
  {
    id: crypto.randomUUID(),
    title: "Sunday Celebration Service",
    message:
      "Join us this Sunday at 9:00 AM in the Main Sanctuary for a powerful time of worship and the Word.",
    author: "Church Admin",
    pinned: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Night of Answered Prayers",
    message:
      "Friday 10:00 PM — come with an expectant heart. The altar of answered prayers is open.",
    author: "Church Admin",
    pinned: false,
    createdAt: new Date().toISOString(),
  },
];

const seedMembers = [
  { id: "m-001", title: "Mr",   name: "Kwame Mensah",   phone: "0541215212", gender: "male" },
  { id: "m-002", title: "Mrs",  name: "Akosua Boateng", phone: "0207464426", gender: "female" },
  { id: "m-003", title: "Miss", name: "Adjoa Serwaa",   phone: "0244000111", gender: "female" },
  { id: "m-004", title: "Mr",   name: "Yaw Owusu",      phone: "0555000222", gender: "male" },
  { id: "m-005", title: "Mrs",  name: "Esi Danso",      phone: "0266000333", gender: "female" },
];

const memStore = {
  announcements: seedAnnouncements,
  members: seedMembers,
  attendance: {},
};

const ensureDir = () => {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
};

const loadFromDisk = () => {
  try {
    if (!ensureDir()) return;
    for (const key of Object.keys(memStore)) {
      const file = path.join(DATA_DIR, `${key}.json`);
      if (fs.existsSync(file)) {
        memStore[key] = JSON.parse(fs.readFileSync(file, "utf8"));
      } else {
        fs.writeFileSync(file, JSON.stringify(memStore[key], null, 2));
      }
    }
  } catch (e) {
    console.warn("⚠️  Disk persistence unavailable, using in-memory store:", e.message);
  }
};

const persist = (key) => {
  try {
    if (!ensureDir()) return;
    fs.writeFileSync(
      path.join(DATA_DIR, `${key}.json`),
      JSON.stringify(memStore[key], null, 2)
    );
  } catch {
    /* silent */
  }
};
loadFromDisk();

// ============================================================
// DATE + MESSAGE HELPERS
// ============================================================
const pad2 = (n) => String(n).padStart(2, "0");

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const formatChurchDate = (isoDate) => {
  const d = isoDate ? new Date(`${isoDate}T00:00:00`) : new Date();
  const safe = Number.isNaN(d.getTime()) ? new Date() : d;
  const weekday = safe.toLocaleDateString("en-GB", { weekday: "long" });
  const day = safe.getDate();
  const month = safe.toLocaleDateString("en-GB", { month: "long" });
  const year = safe.getFullYear();
  return `${weekday} ${day} ${month} ${year}`;
};

const buildAbsenceMessage = (member, isoDate) => {
  const title = member.title || (member.gender === "female" ? "Miss" : "Mr");
  const name = member.name || member.fullName || "Member";

  const templates = [
    `Greetings ${title} ${name}, This is ${CONFIG.CHURCH_FULL_NAME}. We would like to check up on you since we didn't see you during the Command Your Week service. We wish to see you soon. God richly bless you. ${CONFIG.CHURCH_TAG}`,
    `Hello ${title} ${name}, we missed you during the Command Your Week service! We hope you are doing well. Looking forward to seeing you soon. Stay blessed. ${CONFIG.CHURCH_TAG}`,
    `Peace be with you ${title} ${name}. ${CONFIG.CHURCH_FULL_NAME} noticed your absence during the Command Your Week service. We are praying for you and hope all is well. See you in the next service! ${CONFIG.CHURCH_TAG}`,
    `Hi ${title} ${name}, ${CONFIG.CHURCH_FULL_NAME} here. We missed your presence at church during the Command Your Week service. Is everything okay? We are here for you. God bless you. ${CONFIG.CHURCH_TAG}`,
    `Greetings ${title} ${name}, we missed you during the Command Your Week service. "Let us not give up meeting together but let us encourage one another." (Hebrews 10:25). Hope to see you soon! ${CONFIG.CHURCH_TAG}`,
    `Greetings ${title} ${name}, this is ${CONFIG.CHURCH_FULL_NAME}. We just wanted to check up on you as we missed you in church during the Command Your Week service. We hope all is well. We look forward to seeing you this Sunday. God richly bless you. ${CONFIG.CHURCH_TAG}`,
  ];

  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};

const normalizePhone = (raw) => {
  if (!raw) return "";
  const digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("233")) return digits;
  if (digits.startsWith("0")) return `233${digits.slice(1)}`;
  return digits;
};

// ============================================================
// SMS SEND
// ============================================================
async function sendSms({ to, message }) {
  const recipient = normalizePhone(to);
  if (!recipient) return { success: false, to, error: "Missing phone number" };

  try {
    const response = await axios.post(
      CONFIG.SMS_ENDPOINT,
      { senderId: CONFIG.SMS_SENDER, contacts: [recipient], message },
      {
        headers: {
          authorization: `Bearer ${CONFIG.SMS_TOKEN}`,
          "content-type": "application/json",
        },
      }
    );

    const data = response.data;

    if (
      data?.msg?.includes("Insufficient SMS credits") ||
      data?.message?.includes("Insufficient SMS credits")
    ) {
      return {
        success: false,
        to: recipient,
        error: "Insufficient SMS credits please recharge to continue",
      };
    }

    if (data?.success === false || data?.result?.success === false) {
      return {
        success: false,
        to: recipient,
        error: data?.message || data?.result?.message || "Failed to send SMS",
      };
    }

    return { success: true, status: response.status, to: recipient, data };
  } catch (err) {
    console.error("SMS API Error:", err.response?.data || err.message);
    return {
      success: false,
      to: recipient,
      error: err.response?.data?.message || err.message,
    };
  }
}

// ============================================================
// ADMIN AUTH MIDDLEWARE
// ============================================================
function requireAdmin(req, res, next) {
  if (!ADMIN_PASSWORD) {
    return res
      .status(503)
      .json({ success: false, message: "Admin auth not configured" });
  }

  const supplied =
    req.headers["x-admin-password"] ||
    (req.body && req.body.password) ||
    req.query.password;

  if (supplied !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid admin password" });
  }
  next();
}

// ============================================================
// ROUTES
// ============================================================
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: `${CONFIG.CHURCH_FULL_NAME} backend running`,
    email: !!transporter,
    sms: !!CONFIG.SMS_TOKEN,
    environment: "Local",
    timestamp: new Date().toISOString(),
  });
});

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// ---------- Enquiry ----------
app.post("/api/send-enquiry", async (req, res) => {
  try {
    const { message, whatsappCaption } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Enquiry message is required.",
      });
    }

    const emailMessage = message.trim();
    const whatsappMessage = whatsappCaption?.trim() || emailMessage;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"${CONFIG.CHURCH_FULL_NAME}" <${CONFIG.EMAIL_USER}>`,
          to: CONFIG.ENQUIRY_EMAIL,
          subject: `New ${CONFIG.CHURCH_FULL_NAME} Website Enquiry`,
          text: `${emailMessage}\n\nWhatsApp Caption:\n${whatsappMessage}`,
          html: `
            <h2>New ${CONFIG.CHURCH_FULL_NAME} Website Enquiry</h2>
            <p>${escapeHtml(emailMessage)}</p>
            <hr/>
            <p><strong>WhatsApp Caption:</strong></p>
            <p>${escapeHtml(whatsappMessage)}</p>
          `,
        });
        console.log("✅ Enquiry email sent");
      } catch (emailError) {
        console.error("❌ Email send error:", emailError.message);
      }
    } else {
      console.warn("⚠️  Email not sent - transporter not configured");
    }

    res.json({
      success: true,
      message: "Enquiry sent successfully.",
      whatsappCaption: whatsappMessage,
    });
  } catch (error) {
    console.error("Send enquiry error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send enquiry.",
      error: error.message,
    });
  }
});

// ---------- Announcements ----------
app.get("/api/announcements", (_req, res) => {
  const sorted = [...memStore.announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  res.json({ success: true, announcements: sorted });
});

app.post("/api/admin/verify", requireAdmin, (_req, res) => {
  res.json({ success: true, message: "Admin verified" });
});

app.post("/api/announcements", requireAdmin, (req, res) => {
  const { title, message, author, pinned } = req.body || {};
  if (!title?.trim()) {
    return res.status(400).json({ success: false, message: "Title is required" });
  }
  if (!message?.trim()) {
    return res.status(400).json({ success: false, message: "Message is required" });
  }

  const announcement = {
    id: crypto.randomUUID(),
    title: title.trim(),
    message: message.trim(),
    author: author || "Church Admin",
    pinned: Boolean(pinned),
    createdAt: new Date().toISOString(),
  };

  memStore.announcements.push(announcement);
  persist("announcements");
  res.status(201).json({ success: true, announcement });
});

app.put("/api/announcements/:id", requireAdmin, (req, res) => {
  const idx = memStore.announcements.findIndex((a) => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Announcement not found" });
  }
  const { title, message, pinned } = req.body || {};
  memStore.announcements[idx] = {
    ...memStore.announcements[idx],
    ...(title !== undefined ? { title: String(title).trim() } : {}),
    ...(message !== undefined ? { message: String(message).trim() } : {}),
    ...(pinned !== undefined ? { pinned: Boolean(pinned) } : {}),
    updatedAt: new Date().toISOString(),
  };
  persist("announcements");
  res.json({ success: true, announcement: memStore.announcements[idx] });
});

app.delete("/api/announcements/:id", requireAdmin, (req, res) => {
  const idx = memStore.announcements.findIndex((a) => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Announcement not found" });
  }
  const [removed] = memStore.announcements.splice(idx, 1);
  persist("announcements");
  res.json({ success: true, message: "Announcement deleted", deleted: removed });
});

// ---------- Members ----------
app.get("/api/members", requireAdmin, (_req, res) => {
  res.json({ success: true, members: memStore.members });
});

app.post("/api/members", requireAdmin, (req, res) => {
  const { name, phone, title, gender } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: "name and phone are required" });
  }
  const member = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    phone: String(phone).trim(),
    title: title || (gender === "female" ? "Miss" : "Mr"),
    gender: gender || "male",
  };
  memStore.members.push(member);
  persist("members");
  res.status(201).json({ success: true, member });
});

app.delete("/api/members/:id", requireAdmin, (req, res) => {
  const idx = memStore.members.findIndex((m) => m.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Member not found" });
  }
  const [removed] = memStore.members.splice(idx, 1);
  persist("members");
  res.json({ success: true, deleted: removed });
});

// ---------- Attendance ----------
app.get("/api/attendance", (req, res) => {
  const date = req.query.date || todayISO();
  res.json({
    success: true,
    date,
    presentIds: memStore.attendance[date] || [],
  });
});

app.put("/api/attendance", requireAdmin, (req, res) => {
  const { date, presentIds } = req.body || {};
  const day = date || todayISO();
  if (!Array.isArray(presentIds)) {
    return res.status(400).json({ success: false, message: "presentIds must be an array" });
  }
  memStore.attendance[day] = [...new Set(presentIds)];
  persist("attendance");
  res.json({ success: true, date: day, presentIds: memStore.attendance[day] });
});

app.get("/api/absentees", requireAdmin, (req, res) => {
  const date = req.query.date || todayISO();
  const present = new Set(memStore.attendance[date] || []);
  const absentees = memStore.members.filter((m) => !present.has(m.id));
  res.json({ success: true, date, absentees });
});

// ---------- SMS ----------
app.post("/api/sms/preview", requireAdmin, (req, res) => {
  const { date, memberIds } = req.body || {};
  const day = date || todayISO();
  const present = new Set(memStore.attendance[day] || []);
  const pool =
    Array.isArray(memberIds) && memberIds.length
      ? memStore.members.filter((m) => memberIds.includes(m.id))
      : memStore.members.filter((m) => !present.has(m.id));

  const messages = pool.map((m) => ({
    memberId: m.id,
    name: m.name,
    phone: m.phone,
    title: m.title || (m.gender === "female" ? "Miss" : "Mr"),
    message: buildAbsenceMessage(m, day),
  }));

  res.json({
    success: true,
    date: day,
    dateText: formatChurchDate(day),
    count: messages.length,
    messages,
  });
});

app.post("/api/sms/send-absentees", requireAdmin, async (req, res) => {
  const { date, absentees } = req.body || {};
  const day = date || todayISO();

  if (!absentees || !Array.isArray(absentees) || absentees.length === 0) {
    return res.json({
      success: true,
      date: day,
      sent: 0,
      results: [],
      message: "No absentees provided 🎉",
    });
  }

  const results = [];
  let insufficientCreditsError = null;

  for (const member of absentees) {
    const name = member.fullName || member.name || "Member";
    const phone = member.contacts || member.phone || "";
    const title = member.gender === "female" ? "Miss" : "Mr";

    const tempMember = { name, title, gender: member.gender };
    const message = buildAbsenceMessage(tempMember, day);
    const result = await sendSms({ to: phone, message });

    results.push({
      memberId: member.id || Date.now().toString(),
      name,
      phone,
      ...result,
    });

    if (result.error === "Insufficient SMS credits please recharge to continue") {
      insufficientCreditsError = result.error;
      break;
    }

    await new Promise((r) => setTimeout(r, 250));
  }

  if (insufficientCreditsError) {
    return res.status(400).json({
      success: false,
      message: insufficientCreditsError,
    });
  }

  const sent = results.filter((r) => r.success).length;

  res.json({
    success: true,
    date: day,
    dateText: formatChurchDate(day),
    requested: absentees.length,
    sent,
    failed: absentees.length - sent,
    results,
  });
});

// ============================================================
// FALLBACKS
// ============================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

app.use((error, _req, res, _next) => {
  console.error("Unhandled error:", error.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ============================================================
// START
// ============================================================
app.listen(CONFIG.PORT, () => {
  console.log(`✅ ${CONFIG.CHURCH_FULL_NAME} backend on http://localhost:${CONFIG.PORT}`);
});

export default app;