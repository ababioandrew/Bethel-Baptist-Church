// ============================================================
// BETHEL BAPTIST — HOME PAGE DATA
// All static data, media lists and helpers moved here so the
// page component stays focused on rendering & interactions.
// ============================================================

import { SITE } from "../config/site.js";

// Media asset imports
import commercialVid1 from "../assets/videos/commercial.mp4";
import commercialVid2 from "../assets/videos/commercial.mp4";
import commercialVid3 from "../assets/videos/commercial.mp4";
import commercialVid4 from "../assets/videos/commercial.mp4";
import commercialVid5 from "../assets/videos/commercial.mp4";
import commercialVid6 from "../assets/videos/commercial.mp4";
import commercialVid7 from "../assets/videos/commercial.mp4";
import supportContact from "../assets/images/supportContact.jpeg";

import BethelIcon from "../icons/BethelBaptistLogo.png";
import apnImage1 from "../assets/images/apnImage1.png";
import apnImage2 from "../assets/images/apnImage2.png";
import apnImage3 from "../assets/images/apnImage3.png";
import apnImage16 from "../assets/images/apnImage16.png";
import apnImage17 from "../assets/images/menthorShip.jpeg";

/* ============ YOUTUBE / PLAYLIST HELPERS ============ */

export const parseYouTubeUrl = (url) => {
  if (!url) return { embedUrl: "", isYouTube: false, isPlaylist: false };
  const trimmed = url.trim();

  if (trimmed.includes("/embed/")) {
    return {
      embedUrl: trimmed,
      isYouTube: true,
      isPlaylist: trimmed.includes("/embed/videoseries"),
    };
  }

  const listMatch = trimmed.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  const isPlaylistPage =
    /\/playlist(\?|$)/.test(trimmed) ||
    (listMatch && !trimmed.includes("watch"));

  if (isPlaylistPage && listMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}`,
      isYouTube: true,
      isPlaylist: true,
    };
  }

  const vMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (vMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/${vMatch[1]}`,
      isYouTube: true,
      isPlaylist: false,
    };
  }

  const shortsMatch = trimmed.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/${shortsMatch[1]}`,
      isYouTube: true,
      isPlaylist: false,
    };
  }

  const beMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (beMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/${beMatch[1]}`,
      isYouTube: true,
      isPlaylist: false,
    };
  }

  return { embedUrl: "", isYouTube: false, isPlaylist: false };
};

export const normalizeVideo = (item) => {
  const base =
    typeof item === "string" ? { title: item, alt: item, src: item } : { ...item };
  const url = base.src || base.url || "";
  const parsed = parseYouTubeUrl(url);
  return {
    type: "video",
    ...base,
    src: url,
    embedUrl: base.embedUrl || parsed.embedUrl,
    isYouTube: base.isYouTube !== undefined ? base.isYouTube : parsed.isYouTube,
    isPlaylist: base.isPlaylist !== undefined ? base.isPlaylist : parsed.isPlaylist,
    title: base.title || base.name || "Untitled Video",
    alt: base.alt || base.title || "Video",
  };
};

/* ============ SIMPLE DATA ============ */

export const cmArr = [
  commercialVid1, commercialVid2, commercialVid3, commercialVid4,
  commercialVid5, commercialVid6, commercialVid7,
];

export const marqueeMessages = [
  "✨ Special Event This Sunday • Youth Fellowship • Community Outreach • Join Us! ✨",
  `✨ ${SITE.fullName} • A place where destinies are restored and rearranged. • Pray until the soul cracks ✨`,
  "✨ 30 Days of Mentorship Through The Word. Listen, discover, and share. God richly bless you ✨",
];

export const upcomingEvents = [
  { id: 1, title: "Commanding Your Week", date: "Every Sunday", time: "3:00 PM", location: "Main Sanctuary" },
  { id: 2, title: "Sunday Celebration Service", date: "Nov 5, 2026", time: "9:00 AM", location: "Main Sanctuary" },
  { id: 3, title: "Night of Answered Prayers", date: "Nov 20, 2026", time: "10:00 PM", location: "Main Sanctuary" },
];

export const dailyVerses = [
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11" },
  { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
  { text: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
];

export const initialPrayers = [
  { id: 1, name: "Anonymous", request: "Please pray for my family's health and provision.", prayers: 24 },
  { id: 2, name: "Sarah M.", request: "Praying for a breakthrough in my career and peace of mind.", prayers: 18 },
  { id: 3, name: "Anonymous", request: "Agreeing with me for my healing and restoration.", prayers: 32 },
];

export const statsData = [
  { number: "∞", label: "God's Grace" },
  { number: "1", label: "Family In Christ" },
  { number: "1", label: "Body Of Christ" },
  { number: "24/7", label: "Prayer & Faith" },
];

export const versesOfTheDay = [
  { text: "The LORD is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "Trust in the LORD with all your heart, and lean not on your own understanding.", ref: "Proverbs 3:5" },
  { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
  { text: "The joy of the LORD is your strength.", ref: "Nehemiah 8:10" },
  { text: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.", ref: "Jeremiah 29:11" },
  { text: "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles.", ref: "Isaiah 40:31" },
  { text: "The LORD is my light and my salvation; whom shall I fear?", ref: "Psalm 27:1" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "Delight yourself in the LORD, and he will give you the desires of your heart.", ref: "Psalm 37:4" },
  { text: "The name of the LORD is a strong tower; the righteous man runs into it and is safe.", ref: "Proverbs 18:10" },
  { text: "If God is for us, who can be against us?", ref: "Romans 8:31" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6" },
  { text: "Your word is a lamp for my feet, a light on my path.", ref: "Psalm 119:105" },
  { text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28" },
];

export const testimonials = [
  { name: "Sister Akosua", role: "Member since 2020", quote: `I came broken, but God used ${SITE.fullName} to restore my marriage and give me peace that surpasses understanding.` },
  { name: "Brother Kwame", role: "Youth Leader", quote: "The youth ministry here gave me a purpose and a family that prays with me through every season of life." },
  { name: "Mama Adjoa", role: "Prayer Warrior", quote: "When I joined the midnight prayer chain, my son's health turned around within weeks. God is faithful!" },
];

export const givingOptions = [
  { type: "image", src: supportContact, alt: "Support 1", title: "Support 1" },
];

export const leadershipTeam = [
  { name: "Pastor Enoch", role: "Senior Pastor", img: apnImage16, bio: "A shepherd with a passion for prayer, the prophetic, and seeing destinies restored." },
  { name: "Elder Emma", role: "Associate Pastor", img: apnImage16, bio: "Overseeing youth, worship, and discipleship across the ministry." },
  { name: "Deacon Amos", role: "Prayer Director", img: apnImage16, bio: "Guiding the midnight prayer chain and intercession teams." },
];

export const smallGroups = [
  { icon: "⚔️", name: "Men of Valor", when: "Saturdays 7PM", where: "Main Sanctuary" },
  { icon: "🌸", name: "Women of Grace", when: "Wednesdays 6PM", where: "Fellowship Hall" },
  { icon: "🔥", name: "Youth Fire", when: "Fridays 5PM", where: "Youth Center" },
  { icon: "💍", name: "Couples in Christ", when: "Sundays 4PM", where: "Room 204" },
];

export const visitFaqs = [
  { q: "What should I wear?", a: "Come as you are — casual, traditional, or formal. God cares about your heart, not your outfit." },
  { q: "Where do I park?", a: "Free parking is available on-site with attendants to guide you." },
  { q: "What about my kids?", a: "We have safe, age-appropriate children and youth classes during every service." },
  { q: "How long is the service?", a: "About 2 hours of worship, prayer, and the Word." },
];

/* ============ MINISTRIES / MEDIA ============ */

export const ministries = [
  { icon: BethelIcon, title: "Worship Ministry", desc: "Join us in worship as we lift our hearts to God through praise, prayer, and the teaching of His Word." },
  { icon: BethelIcon, title: "Youth Ministry", desc: "A welcoming environment where young people can grow in faith, build friendships, and discover their purpose in Christ." },
  { icon: BethelIcon, title: "Prayer Ministry", desc: "Come together with us in prayer as we seek God, encourage one another, and stand together in faith." },
  { icon: BethelIcon, title: "Community Ministry", desc: "Serving our community with compassion, kindness, and practical support while sharing the love of Christ." },
];

export const mediaItems = [
  { type: "image", src: apnImage1,  alt: "Church Event 1",  title: "Church Event 1" },
  { type: "image", src: apnImage2,  alt: "Church Event 2",  title: "Church Event 2" },
  { type: "image", src: apnImage3,  alt: "Church Event 3",  title: "Church Event 3" },
  { type: "image", src: apnImage16, alt: "Church Event 16", title: "Church Event 16" },
  { type: "image", src: apnImage17, alt: "Church Event 17", title: "Church Event 17" },
  { type: "video", src: "https://youtube.com/shorts/dbqnn792Y7M", embedUrl: "https://www.youtube.com/embed/dbqnn792Y7M", isYouTube: true, alt: "Sunday Sermon", title: "Sunday Sermon" },
  { type: "video", src: "https://youtube.com/shorts/A7usTs1ds5k", embedUrl: "https://www.youtube.com/embed/A7usTs1ds5k", isYouTube: true, alt: "Commanding your week", title: "Commanding your week" },
  { type: "video", src: "https://youtube.com/shorts/mbcNqd7bJGs", embedUrl: "https://www.youtube.com/embed/mbcNqd7bJGs", isYouTube: true, alt: "Community Outreach", title: "Community Outreach" },
  { type: "video", src: "https://www.youtube.com/watch?v=Z5QRcyom9bw", embedUrl: "https://www.youtube.com/embed/Z5QRcyom9bw", isYouTube: true, alt: "Community Outreach", title: "Community Outreach" },
  { type: "video", src: "https://www.youtube.com/watch?v=JgWr4jljWXU", embedUrl: "https://www.youtube.com/embed/JgWr4jljWXU", isYouTube: true, alt: "Community Outreach", title: "Community Outreach" },
];

const commandingWeekRaw = [
  { src: "https://www.youtube.com/watch?v=pHvM7OhRGJc", title: "7 HOURS PRAYER: OVERTHROWING DEMONIC ALTARS 2", duration: "2:07:09" },
  { src: "https://www.youtube.com/watch?v=f-XEk3Efw5o", title: "7 HOURS PRAYER: OVERTHROWING DEMONIC ALTARS 2", duration: "2:39:53" },
  { src: "https://www.youtube.com/watch?v=z57II3LdN7E", title: "7 HOURS PRAYER : OVERTHROWING DEMONIC ALATRS 2", duration: "1:51:50" }
];

export const commandingWeekVideos = commandingWeekRaw.map((v) =>
  normalizeVideo({ ...v, alt: SITE.fullName })
);

export const localVideos = commandingWeekRaw.map((v) =>
  normalizeVideo({ ...v, alt: SITE.fullName })
);

/* ============ LOCAL AUDIOS ============ */
/* Kept identical (drive IDs) — titles changed only where "APN" appeared */

export const localAudios = [
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1dIp-bszTMGFEB3y6LNbwWj8IeGD7f2Cp", title: "Lord teach me your ways", alt: "Lord teach me your ways", fileName: "Lord teach me your ways", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1eneFciwAOhkYEujY_eR2GcKvFWPlY1RY", title: "Lord show me what to do", alt: "Lord show me what to do", fileName: "Lord show me what to do", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1zYBrCqq7oWnbFfu8th2uSiDOASPj3ozY", title: "1st Partners meeting 2025", alt: "1st Partners meeting 2025", fileName: "1st Partners meeting 2025", local: true }
];


/* Combine everything into the media gallery */
export const fullMediaItems = [
  ...mediaItems,
  {
    type: "commandingWeek",
    title: "Commanding Your Week Videos",
    alt: "Commanding Your Week Videos",
    videos: commandingWeekVideos,
  },
  ...localVideos,
  ...localAudios,
];