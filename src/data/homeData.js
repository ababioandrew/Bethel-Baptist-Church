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
import apnImage4 from "../assets/images/apnImage4.png";
import apnImage5 from "../assets/images/apnImage5.png";
import apnImage6 from "../assets/images/apnImage6.png";
import apnImage7 from "../assets/images/apnImage7.png";
import apnImage8 from "../assets/images/apnImage8.png";
import apnImage9 from "../assets/images/apnImage9.png";
import apnImage10 from "../assets/images/apnImage10.png";
import apnImage11 from "../assets/images/apnImage11.png";
import apnImage12 from "../assets/images/apnImage12.png";
import apnImage13 from "../assets/images/apnImage13.png";
import apnImage14 from "../assets/images/apnImage14.png";
import apnImage15 from "../assets/images/apnImage15.png";
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
  { type: "image", src: apnImage4,  alt: "Church Event 4",  title: "Church Event 4" },
  { type: "image", src: apnImage5,  alt: "Church Event 5",  title: "Church Event 5" },
  { type: "image", src: apnImage6,  alt: "Church Event 6",  title: "Church Event 6" },
  { type: "image", src: apnImage7,  alt: "Church Event 7",  title: "Church Event 7" },
  { type: "image", src: apnImage8,  alt: "Church Event 8",  title: "Church Event 8" },
  { type: "image", src: apnImage9,  alt: "Church Event 9",  title: "Church Event 9" },
  { type: "image", src: apnImage10, alt: "Church Event 10", title: "Church Event 10" },
  { type: "image", src: apnImage11, alt: "Church Event 11", title: "Church Event 11" },
  { type: "image", src: apnImage12, alt: "Church Event 12", title: "Church Event 12" },
  { type: "image", src: apnImage13, alt: "Church Event 13", title: "Church Event 13" },
  { type: "image", src: apnImage14, alt: "Church Event 14", title: "Church Event 14" },
  { type: "image", src: apnImage15, alt: "Church Event 15", title: "Church Event 15" },
  { type: "image", src: apnImage16, alt: "Church Event 16", title: "Church Event 16" },
  { type: "image", src: apnImage17, alt: "Church Event 17", title: "Church Event 17" },
  { type: "video", src: "https://youtube.com/shorts/dbqnn792Y7M", embedUrl: "https://www.youtube.com/embed/dbqnn792Y7M", isYouTube: true, alt: "Sunday Sermon", title: "Sunday Sermon" },
  { type: "video", src: "https://youtube.com/shorts/A7usTs1ds5k", embedUrl: "https://www.youtube.com/embed/A7usTs1ds5k", isYouTube: true, alt: "Commanding your week", title: "Commanding your week" },
  { type: "video", src: "https://youtube.com/shorts/mbcNqd7bJGs", embedUrl: "https://www.youtube.com/embed/mbcNqd7bJGs", isYouTube: true, alt: "Community Outreach", title: "Community Outreach" },
  { type: "video", src: "https://www.youtube.com/watch?v=Z5QRcyom9bw", embedUrl: "https://www.youtube.com/embed/Z5QRcyom9bw", isYouTube: true, alt: "Community Outreach", title: "Community Outreach" },
  { type: "video", src: "https://www.youtube.com/watch?v=JgWr4jljWXU", embedUrl: "https://www.youtube.com/embed/JgWr4jljWXU", isYouTube: true, alt: "Community Outreach", title: "Community Outreach" },
];

/* ============ COMMANDING-WEEK VIDEOS ============ */
/* (URL list unchanged from the original; the .map(normalizeVideo)
   is applied below so this array can be spread into mediaItems) */

const commandingWeekRaw = [
  { src: "https://www.youtube.com/watch?v=pHvM7OhRGJc", title: "7 HOURS PRAYER: OVERTHROWING DEMONIC ALTARS 2", duration: "2:07:09" },
  { src: "https://www.youtube.com/watch?v=f-XEk3Efw5o", title: "7 HOURS PRAYER: OVERTHROWING DEMONIC ALTARS 2", duration: "2:39:53" },
  { src: "https://www.youtube.com/watch?v=z57II3LdN7E", title: "7 HOURS PRAYER : OVERTHROWING DEMONIC ALATRS 2", duration: "1:51:50" },
  { src: "https://www.youtube.com/watch?v=QDbO0e68h74", title: "COMMAND YOUR WEEK SERVICE - 1ST NOVEMBER 2026.", duration: "4:02:16" },
  { src: "https://www.youtube.com/watch?v=JFW4mh1NQ_E", title: "COMAND YOUR WEEK SUNDAY SERVICE - 25/10/2026", duration: "3:44:21" },
  { src: "https://www.youtube.com/watch?v=NSGc6wJgTRE", title: "COMMAND YOUR WEEK - SUNDAY SERVICE. 18TH OCTOBER 2026.", duration: "49:39:00" },
  { src: "https://www.youtube.com/watch?v=SCk2Eduu6Gc", title: "COMMAND YOUR WEEK :READING THE SPEAKINGS OF AN ALTAR 11TH OCTOBER 2026", duration: "3:12:40" },
  { src: "https://www.youtube.com/watch?v=PY2HTpO_-Hk", title: "7 HOURS OF PRAYERS - OVERTHROWING DEMONIC ALTARS.", duration: "6:53:31" },
  { src: "https://www.youtube.com/watch?v=JE3rARGfSyg", title: "COMMAND YOUR WEEK - DEALING WITH DEMONIC RESISTANCE-- 27/09/2026", duration: "4:05:37" },
  { src: "https://www.youtube.com/watch?v=ChwpcNMsR38", title: "COMMAND YOUR WEEK - DEALING WITH ALTARS AGAINST GOD'S PLAN FOR YOUR LIFE- 20TH SEPTEMBER 2026", duration: "3:37:58" },
  { src: "https://www.youtube.com/watch?v=HevKhedmZPk", title: "testing", duration: "1:00" },
  { src: "https://www.youtube.com/watch?v=_Bh0GP82bg0", title: "COMMAND YOUR WEEK", duration: "2:44:59" },
  { src: "https://www.youtube.com/watch?v=1T0CZsr49qk", title: "COMMAND YOUR WEEK, RECOVERING THE AXE HEAD 13 SEPTEMBER 2026", duration: "59:29:00" },
  { src: "https://www.youtube.com/watch?v=GgRtrVpf12s", title: "7 HOURS PRAYER , OVERTHROWING SATANIC ALTARS", duration: "6:26:33" },
  { src: "https://www.youtube.com/watch?v=BJXJ9HmbvFk", title: "COMMAND YOUR WEEK", duration: "3:57:26" },
  { src: "https://www.youtube.com/watch?v=3SExAYuq8qw", title: "COMMAND YOUR WEEK SUNDAY SERVICE", duration: "2:16:24" },
  { src: "https://www.youtube.com/watch?v=pNeZIvRGyqg", title: "COMMAND YOUR WEEK - SUNDAY SERVICE - 23/08/26", duration: "19:37" },
  { src: "https://www.youtube.com/watch?v=_JEHoemPADA", title: "COMMAND YOUR WEEK - SUNDAY SERVICE - 16TH AUGUST 2026.", duration: "3:34:55" },
  { src: "https://www.youtube.com/watch?v=Z0roJRaFmBc", title: "COMMAND YOUR WEEK - WHAT SUBSTANCE DID YOU RECEIVE -9TH AUGUST 2026.", duration: "4:00:53" },
  { src: "https://www.youtube.com/watch?v=GIQ_0LELhx0", title: "7 HOURS PRAYER - DIVINE INTERVENTION.", duration: "6:26:16" },
  { src: "https://www.youtube.com/watch?v=pHl15LnZCME", title: "COMMAND YOUR WEEK - SATISFY ME EARLY-26TH JULY 2026.", duration: "3:38:39" },
  { src: "https://www.youtube.com/watch?v=BIj7IW4Mlh0", title: "COMMAN YOUR WEEK - SUNDAY SERVICE.", duration: "2:23:25" },
  { src: "https://www.youtube.com/watch?v=CXLeNShiqYk", title: "COMMAND YOUR WEEK - SUNDAY SERVICE.", duration: "2:37:24" },
  { src: "https://www.youtube.com/watch?v=2CLrPuvayZQ", title: "COMMAND YOUR WEEK - SUNDAY SERVICE", duration: "3:15:46" },
  { src: "https://www.youtube.com/watch?v=r6SJ5fFy19g", title: "70 DAYS OF FASTING AND PRAYERS, DAY 70", duration: "2:30:14" },
  { src: "https://www.youtube.com/watch?v=hpx-Bx87eK4", title: "COMMAND YOUR WEEK - SUNDAY SERVICE", duration: "2:58:28" },
  { src: "https://www.youtube.com/watch?v=4zFuWtYW01M", title: "70 DAYS FASTING AND PRAYERS, COMMAND YOUR WEEK SERVICE", duration: "13:49" },
  { src: "https://www.youtube.com/watch?v=wEfpmYKD1lU", title: "COMMAND YOUR WEEK - SUNDAY SERVICE.", duration: "2:38:22" },
  { src: "https://www.youtube.com/watch?v=3aYxeaPPfjs", title: "'' COMMAND YOUR WEEK '' SUNDAY SERVICE.", duration: "3:40:38" },
  { src: "https://www.youtube.com/watch?v=VbOYcW1uuy8", title: "'' COMMAND YOUR WEEK '' SUNDAY SERVICE.", duration: "3:37:56" },
  { src: "https://www.youtube.com/watch?v=5nFotNZwMDU", title: "70 DAYS OF FASTING AND PRAYERS, 7 HOURS PRAYER", duration: "1:01:30" },
  { src: "https://www.youtube.com/watch?v=VqOoVzEwQXw", title: "70 DAYS OF FASTING AND PRAYERS, 7 HOURS PRAYER", duration: "38:32:00" },
  { src: "https://www.youtube.com/watch?v=6-M-Zbym_6M", title: "70 DAYS OF FASTING AND PRAYERS, 7 HOURS PRAYER", duration: "57:40:00" },
  { src: "https://www.youtube.com/watch?v=R7pKJX36mg4", title: "70 DAYS OF FASTING AND PRAYERS, COMMAND YOUR WEEK", duration: "16:13" },
  { src: "https://www.youtube.com/watch?v=92pp1tiLDXM", title: "70 DAYS OF FASTING AND PRAYERS, COMMAND YOUR WEEK", duration: "16:55" },
  { src: "https://www.youtube.com/watch?v=3PG3frsgnEE", title: "COMMAND YOUR WEEK - 70 DAYS OF FASTING & PRAYERS.", duration: "3:19:59" },
  { src: "https://www.youtube.com/watch?v=AfoVa0ENtLk", title: "70 DAYS OF FASTING AND PRAYERS, 7 HOURS PRAYER", duration: "6:22:44" },
  { src: "https://www.youtube.com/watch?v=NxdGg9h7jcs", title: "COMMAND YOUR WEEK", duration: "2:48:35" },
  { src: "https://www.youtube.com/watch?v=VJMhVmmLSC0", title: "COMMAND YOUR WEEK.", duration: "4:16" },
  { src: "https://www.youtube.com/watch?v=3m_olIfinao", title: "COMMAND YOUR WEEK.", duration: "3:14:14" },
  { src: "https://www.youtube.com/watch?v=s-dC2JGD63w", title: "COMMAND YOUR WEEK.", duration: "3:41:02" },
  { src: "https://www.youtube.com/watch?v=QqJTxfdJAEo", title: "7 HOURS PRAYER : THE WILL OF GOD", duration: "1:06:32" },
  { src: "https://www.youtube.com/watch?v=dXFsQVzZfvs", title: "7 HOURS PRAYER : THE WILL OF GOD", duration: "1:57:13" },
  { src: "https://www.youtube.com/watch?v=XyGhj9o_UsA", title: "COMMAND YOUR WEEK - BREAKTHROUGH SERVICE.", duration: "3:25:28" },
  { src: "https://www.youtube.com/watch?v=KG9QdhtYEoU", title: "COMMAND YOUR WEEK.", duration: "3:52:58" },
  { src: "https://www.youtube.com/watch?v=CigoSSrl_VM", title: "SCHOOL OF PRAYER : STAYING WITH GOD IN PRAYER", duration: "3:20:06" },
  { src: "https://www.youtube.com/watch?v=2Pyfo-Q7d0s", title: "7 HOURS OF PRAYER", duration: "5:27:12" },
  { src: "https://www.youtube.com/watch?v=ceeGjUY2QOM", title: "BREAKTHROUGH SERVICE", duration: "4:02:59" },
  { src: "https://www.youtube.com/watch?v=E_ZKx3Gp9Ss", title: "SPIRITUAL WARFARE", duration: "4:21:55" },
  { src: "https://www.youtube.com/watch?v=18WEuo_xiW0", title: "PRAY WITHOUT CEASING", duration: "3:07:43" },
  { src: "https://www.youtube.com/watch?v=3oYRcXbQ82Y", title: "PRAY WITHOUT CEASING", duration: "1:15:00" },
  { src: "https://www.youtube.com/watch?v=A7o1qfyU464", title: "SCHOOL OF PRAYER", duration: "4:11:19" },
  { src: "https://www.youtube.com/watch?v=2pRsOcFJeoA", title: "END OF YEAR SERVICE - THANKSGIVING SERVICE", duration: "5:07:54" },
  { src: "https://www.youtube.com/watch?v=GifdsfOp2mE", title: "THERE SHALL BE A PERFORMANCE", duration: "3:24:24" },
  { src: "https://www.youtube.com/watch?v=bB-ltQU54LU", title: "SCHOOL OF PRAYER", duration: "2:57:08" },
  { src: "https://www.youtube.com/watch?v=DAdTiNSQ7JE", title: "7 hours Prayer", duration: "15:14" },
  { src: "https://www.youtube.com/watch?v=ET90ErCew4E", title: "7 HOURS PRAYERS", duration: "1:29:57" },
  { src: "https://www.youtube.com/watch?v=sHQwqKj3j1s", title: "BREAKTHROUGH SERVICE", duration: "3:40:20" },
  { src: "https://www.youtube.com/watch?v=4qGgHFkpLkM", title: "HOW GOD RESTORES MEN", duration: "4:19:37" },
  { src: "https://www.youtube.com/watch?v=CrbRh7bIOVs", title: "PRAYER AND DELIVERANCE SERVICE", duration: "4:38:12" },
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
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1zYBrCqq7oWnbFfu8th2uSiDOASPj3ozY", title: "1st Partners meeting 2025", alt: "1st Partners meeting 2025", fileName: "1st Partners meeting 2025", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1kDdm_pJkP5LJR2qlXKcBkctOZUYA2NN1", title: "Court Of Heaven day 2", alt: "Court Of Heaven day 2", fileName: "Court Of Heaven day 2", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1XDgbawuJlvu-e5TRSSSZx0EoLT-uAgB6", title: "Look upon me with mercy", alt: "Look upon me with mercy", fileName: "Look upon me with mercy", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1s8Kwp49GZG99NuRa9KHXu0RzB64g_r5P", title: "Heighten my Discernment", alt: "Heighten my Discernment", fileName: "heighten my Discernment", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1duC1koBeulxcec6Fc53cLjcVK11zChft", title: "Divine Restoration day 2", alt: "Divine Restoration day 2", fileName: "Divine Restoration day 2", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1__h3ZpqZH9TyancDdc6Lhu8x3a2b4TMC", title: "Divine Restoration day 1", alt: "Divine Restoration day 1", fileName: "Divine Restoration day 1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1-llpkekmqCLd3wW6C_xPgK4v39-To-SH", title: "Restoration day 2", alt: "Restoration day 2", fileName: "Restoration day 2", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1epFrY6k5mmd-cGJp8chAgB5CvXSrNnJz", title: "Restoration day 1", alt: "Restoration day 1", fileName: "Restoration day 1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1manoB8udsFJy10UURSdtO73GNbOxGUUT", title: "Language of supplication unedited", alt: "Language of supplication unedited", fileName: "Language of supplication unedited", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1zQ_dtkV3usM44fNboqF3LOP5ymkD8j3d", title: "7 hours prayer_the help of God", alt: "7 hours prayer_the help of God", fileName: "7 hours prayer_the help of God", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1EDHRjI1v1O1m7Rro1rOSM9wLlHNU6L1Z", title: "For your glory", alt: "For your glory", fileName: "For you glory", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1dY3VHlHivdZ9Rv4Qg_DAVVfeP077RaFU", title: "First hour mercy meeting 2025", alt: "First hour mercy meeting 2025", fileName: "first hour mercy meeting 2025", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1nn_y7bXCw1--dhqvKNCc7iG59WZ-vd4B", title: "Hunger for more", alt: "Hunger for more", fileName: "Hunger for more", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1CbLdVYdtcOzriQpMaotaskyK_p6H2ZtB", title: "Conquering the spirit of fear", alt: "Conquering the spirit of fear", fileName: "Conquering the spirit of fear", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1HXDfJ-BSSoS6rjcRMjhkQN4HZgLoiFFw", title: "Conquering the spirit of fear Part 2", alt: "Conquering the spirit of fear Part 2", fileName: "Conquering the spirit of fear Part 2", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1jsojzOIoG7x822_YDzyggFm6w7xuJpzE", title: "Prophetic spy 1", alt: "Prophetic spy 1", fileName: "prophetic spy 1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1lFoVN16J59Cdu00Udgw0XJ9WquiF1s9h", title: "How satan fights", alt: "How satan fights", fileName: "How satan fights", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1EGX3FlCHioPseLBaQKpamUhdgx_HFjWq", title: "Sunday Midnight Prayers", alt: "Sunday Midnight Prayers", fileName: "SundayMidnight", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1QrxZpZjDgbvYQNsTU4SLHLZao7V3xYrt", title: "Life Is Spiritual", alt: "Life Is Spiritual", fileName: "Life Is Spiritual", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=12B3ZT8gTJoQiuhnuhgHVK-4HlrxJ2B6c", title: "Praying your obedience before the judge", alt: "Praying your obedience before the judge", fileName: "Praying your obedience before the judge _Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1Bi7hLjvyyQeMlDwcLld700ccH3j65NwV", title: "Introduction to the court of heaven", alt: "Introduction to the court of heaven", fileName: "introduction to the court of heaven_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1e6qBQZdqNbfgYlqFeP8iPa7QRJMIChQQ", title: "Prayer chain day 1 session 1", alt: "Prayer chain day 1 session 1", fileName: "Prayer chain day 1 session 1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=102PgCc-qzOeg2gCiNUR6R1MmYXbx6zmm", title: "Deliverance: A Call Unto Alignment", alt: "Deliverance: A Call Unto Alignment", fileName: "Why many are not doers of the word Part 1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1VEeo7423HFoiIVHf04Fr_8Op0EVLFV2M", title: "Think on these things 2", alt: "Think on these things 2", fileName: "The shiloh cry APN", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1C0abeQIs7MpZNtFBCvgQSB_rtiNToBtK", title: "The Shiloh Cry", alt: "The Shiloh Cry", fileName: "The Shiloh Cry", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1VEeo7423HFoiIVHf04Fr_8Op0EVLFV2M", title: "The Shiloh Cry 2", alt: "The Shiloh Cry 2", fileName: "The shiloh cry APN", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1cbeGYeMqsLmWl_Lu0vLZ6QFo3gM09htg", title: "The Shiloh Cry 3", alt: "The Shiloh Cry 3", fileName: "The shiloh cry_ Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1cbeGYeMqsLmWl_Lu0vLZ6QFo3gM09htg", title: "The Shiloh Cry: Covenants", alt: "The Shiloh Cry: Covenants", fileName: "The Shiloh cry_Covenants_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1cbeGYeMqsLmWl_Lu0vLZ6QFo3gM09htg", title: "The Shiloh Cry 4", alt: "The Shiloh Cry 4", fileName: "The Shiloh2_Cry_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1YJTizAc3nvKzlhRA1JGK5HYwC_O4g2tW", title: "Think on these things 2", alt: "Think on these things 2", fileName: "The shiloh cry APN", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1RbWHyN3t_36gK0iwr_p5P9Qe0zYODdK_", title: "Hear this before 2026", alt: "Hear this before 2026", fileName: "Hear this before 2026_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1CzcLsIS8lu00Qg2y8sk4Aw3u--JnXY0F", title: "1st Shiloh Cry Meeting 2025", alt: "1st Shiloh Cry Meeting 2025", fileName: "1st Shiloh cry meeting 2025_Pastor Enoch_1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1CzNMZ0Edq9ln8oil54yrAq8fVQl5OakM", title: "A Call Unto Prayer", alt: "A Call Unto Prayer", fileName: "A call unto prayer_Pastor Enoch_1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1jxdltrhiNYo3JglQuuYtkXGbnpuYh-Y-", title: "A Call Unto Prayer 1", alt: "A Call Unto Prayer 1", fileName: "A call unto prayer1_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1IJGN9yeS18PuLMOVWUHW3YIKKD1F5C44", title: "Accessing Higher Dimensions of Mercy", alt: "Accessing Higher Dimensions of Mercy", fileName: "Accessing higher dimensions of mercy_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1D33dh0m4PYq4J0zSNL_bcVbGrWSU_mcf", title: "Activating the Mystery of Intervention Through Alignment", alt: "Activating the Mystery of Intervention Through Alignment", fileName: "Activating the mystery of intervention through alignment_Pastor Enoch_1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1L-kQYQAx8ygXrkCOYWDv2wc3YUl_TnfH", title: "And God Wrought Special Miracles", alt: "And God Wrought Special Miracles", fileName: "And God wrought special miracles_Pastor Enoch_1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1Ye81tkXnj5VvCGrsBoKVCM4zT3hQ3Hb5", title: "Midnight Prayers: Manifesting Prophecies 2", alt: "Midnight Prayers: Manifesting Prophecies 2", fileName: "APN Midnight Prayers Manifesting Prophecies 2", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1YWsXUOZqeLXdfTnfm4c6_KMMPVya_jtJ", title: "Midnight Prayers: Manifesting Prophecies", alt: "Midnight Prayers: Manifesting Prophecies", fileName: "APN Midnight Prayers Manifesting Prophecies", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1ORt6NpbmunfUlqyGt3yctH1d40iYhfSm", title: "Breaking the Yoke of Kadesh-Barnea", alt: "Breaking the Yoke of Kadesh-Barnea", fileName: "breaking the yoke of kadeshbarnea_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1fA4ey6kAzqxIGQLM_EFDi-KppIwG70Qm", title: "Breaking the Yoke of Kadesh-Barnea 2", alt: "Breaking the Yoke of Kadesh-Barnea 2", fileName: "Breaking the yoke of kadeshbarnea 2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1z3sM2eku78yBEKHnnvWQR4iWaTbz3bdK", title: "Court of Heaven Legalities: Evil Covenants", alt: "Court of Heaven Legalities: Evil Covenants", fileName: "Court of heaven legalities_evil covenants_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1pGQUA-wSy_4-xpwT7HuO6qvt8_ot0QWh", title: "Court of Heaven Legalities: Unforgiveness", alt: "Court of Heaven Legalities: Unforgiveness", fileName: "Court of heaven legalities_unforgiveness_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=11Qp3u2z2Q230BXLwiTb5wQZ2Z65hDVnE", title: "Court of Heaven Legalities: Wrong Motives", alt: "Court of Heaven Legalities: Wrong Motives", fileName: "Court of heaven legalities_wrong motives _Ps Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1904YtVfBMqEEJeGBeMICj_Co5FL8hTm1", title: "Court of Heaven: Wrong Motives Part 2", alt: "Court of Heaven: Wrong Motives Part 2", fileName: "Court of heaven_wrong motives Part 2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1m4wBuZaa6LGOY58lQZjrcepMMKE79UDe", title: "Divine Speed: The Ministry of Men", alt: "Divine Speed: The Ministry of Men", fileName: "Divine speed_the ministry of men_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1ZFGkEZB05e-nnBmI6k4iXmcu-KCbacE2", title: "Lord Awake For Me", alt: "Lord Awake For Me", fileName: "Lord awake for me_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1DdPfuj4eA5QYMWdlm9HRSisKtmemhE69", title: "Insight Into the Court of Heaven", alt: "Insight Into the Court of Heaven", fileName: "Insight into the court of heaven_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1a1TFVuLRzg5qX6dF8t6vecMhxedDGCxJ", title: "How to Deal With Wrong Motives", alt: "How to Deal With Wrong Motives", fileName: "How to deal with wrong motives_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1CYUb03Fq2LizaBw9uHdH_iuUSW7E129V", title: "Manifesting Prophecies: The Gift of an Eye to See", alt: "Manifesting Prophecies: The Gift of an Eye to See", fileName: "Manifesting Prophecies _the gift of an eye to see Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1nEyNqnKPl7S1I5ouAfY2AYRHZRe-wJO8", title: "Sermon by Pastor Enoch", alt: "Sermon by Pastor Enoch", fileName: "Sermon-by Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1ZQNwQfBoTJAxpiaFnQF3z9G4MayqtRXx", title: "Raising Financial Altars", alt: "Raising Financial Altars", fileName: "Raising Financial Altars_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1PgFD1cOk2m6vER7BgZcjquK7Lw8fvx-4", title: "Restore My Wasted Years", alt: "Restore My Wasted Years", fileName: "Restore my wasted years_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1yLkeTfAD-6ZGfgszdrsPcAkw75WIUrN4", title: "Restoration Day 3", alt: "Restoration Day 3", fileName: "Restoration day 3_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1hnCuKZqWs62pUN4Brs--nE8gyqS7fkO9", title: "Prayers Against Witchcraft Powers", alt: "Prayers Against Witchcraft Powers", fileName: "Prayers against witchcraft powers_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1pKyOfLIFriKWudlMBxHU77HdaZ8T6oXS", title: "The Shiloh Cry 24th Jan 2025", alt: "The Shiloh Cry 24th Jan 2025", fileName: "The Shiloh cry 24th JAN 2025_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1EovEmepGwPf0XRHtg3_vKmjvjM7rYoIf", title: "Staying With God in Prayer", alt: "Staying With God in Prayer", fileName: "Staying with God in prayer_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1IZowWAauiyfhZGiEaN_KFKnOnnacJMrW", title: "The Burden of Alignment", alt: "The Burden of Alignment", fileName: "The burden of alignment_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1BVfUX6NeUNmh425U3imLh-e3msSaDDJu", title: "Spiritual Empowerment Day 2", alt: "Spiritual Empowerment Day 2", fileName: "Spiritual Empowerment day 2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1nZqQ7R4VDqraz2JZ0Ff9Gq-6u9-ugyJ-", title: "Spiritual Empowerment Day 3", alt: "Spiritual Empowerment Day 3", fileName: "Spiritual Empowerment day 3", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=18dRo1yf0OUM9ZeM-wVSBq7bVNIT5Up9Z", title: "Spiritual Empowerment Day 4: The Grace to Wait", alt: "Spiritual Empowerment Day 4: The Grace to Wait", fileName: "Spiritual Empowerment day 4_The Grace to wait_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1i1JgI6ao1O87eu1K5dZqH1ys1hSr7kZM", title: "Spiritual Marriage", alt: "Spiritual Marriage", fileName: "Spiritual marriage_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1Mly8jMsZA8PwC3MAtw6otmyHf5fEiqJF", title: "Satisfy Us Early", alt: "Satisfy Us Early", fileName: "Satisfy us early _Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1uJstxfGSfIcjeU5i94bigp0rniz9ChtH", title: "Satisfy Us Early: Warfare Prayers", alt: "Satisfy Us Early: Warfare Prayers", fileName: "Satisfy us early_Warfare Prayers_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1vf0lYbjxD_jn1FbRC9ublf_xdjdNCHyW", title: "Satisfy Us Early: Warfare Prayers 2", alt: "Satisfy Us Early: Warfare Prayers 2", fileName: "Satisfy us early_warfare prayers_Pastor Enoch_2", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1YhG8eDDp7OuOJo1ci-odhzHQSKrTXPiW", title: "Satisfy Us Early: Delayed Prophecies", alt: "Satisfy Us Early: Delayed Prophecies", fileName: "Satisfy us early_delayed prophecies_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1yl8EZLbt9trxg9fi7_eD88WIrBEzAduo", title: "The Grace for Speed 2", alt: "The Grace for Speed 2", fileName: "The grace for speed 2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1frBIPsowNJUQ42tXPEkX_3C16VINHweL", title: "The Grace for Speed", alt: "The Grace for Speed", fileName: "The Grace for Speed_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1ZdYzs9sXAIzniM8In2-R_jkVsZgUAsIF", title: "The Fear of God", alt: "The Fear of God", fileName: "The fear of God_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=182m7gMMUBscQ-y_iycPWV77IY9-Ppybt", title: "The Fear of the Lord", alt: "The Fear of the Lord", fileName: "The fear of the Lord_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1yDQ1K6S7IHNsOy02sgUNpLpy3lAvpq0U", title: "The Dynamics of Divine Speed", alt: "The Dynamics of Divine Speed", fileName: "The dynamics of divine speed_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1TwInAvbjwCO2swLhOS2iJVsBWARPLQLx", title: "The Help of God", alt: "The Help of God", fileName: "The help of God _Pastor Enoch Annang", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1mLKN7wkp-c_A4vN63G1Kis9zbhvv_IAB", title: "The Language of Supplication: Understanding the Times", alt: "The Language of Supplication: Understanding the Times", fileName: "The language of supplication_understanding the times_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1nuasjX3xgaq4_OHgLUsOPdVt0q8yQBeV", title: "The Ministry of Men 2", alt: "The Ministry of Men 2", fileName: "The ministry of men 2_Ps Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1Ybm1jbH3hVHFRQUryB2vOdgrRHK6r5ls", title: "The Ministry of Men 3", alt: "The Ministry of Men 3", fileName: "The ministry of men 3_Ps Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1HX1KqmwNWIrLZgEontKlKAVVsfi-lSvT", title: "The Help of God (5 Hours)", alt: "The Help of God (5 Hours)", fileName: "The help of God 5 hours", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1b6c1vaqg0lIJXqu56G6FjrgoJ_2Mo2Rt", title: "The Ministry of Men 4", alt: "The Ministry of Men 4", fileName: "The ministry of men 4_Ps Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=16lUeLNcECG1HVp36VzEk5Dg5sDgoe8VB", title: "The Ministry of Men 5", alt: "The Ministry of Men 5", fileName: "The ministry of men 5_Ps Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=121kaSrVzFWApza-HJ3SPRPUFOWcliZoO", title: "The Ministry of Men", alt: "The Ministry of Men", fileName: "The ministry of men Ps Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=17CQkvSRSZ4gXUA0SCe7uMt73tIIB6iJo", title: "The Need for Revelation", alt: "The Need for Revelation", fileName: "The need for revelation_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1KXjZrVakyDUjlht7izfUMIlFHQJ9dnLM", title: "The Organic Side of Restoration", alt: "The Organic Side of Restoration", fileName: "The organic side of restoration", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1WZYDFksEI_OqyL8lHuRAxLgkWBglhb_w", title: "The Word of the Lord for September 2023", alt: "The Word of the Lord for September 2023", fileName: "The word of the Lord for September 2023_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1GSpW6ErO9wObvwq5xaXTCKONExyF79j1", title: "There Has to Be More", alt: "There Has to Be More", fileName: "There has to be more_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1zX51STYhN1Tnq0MlY3bwI2fDBLzgcC67", title: "Think on These Things: The Mercies of God", alt: "Think on These Things: The Mercies of God", fileName: "Think on these things _the mercies of God_Pastor", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1_-j18t5ZwtjJksl5TrDLia5RjnzMmBiH", title: "Understanding the Will of God Part 2", alt: "Understanding the Will of God Part 2", fileName: "Understanding the will of God Part 2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1BEE4gwTWKWNfYOFACfxh-UjxubT1nhFQ", title: "Understanding the Will of God", alt: "Understanding the Will of God", fileName: "Understanding the will of God_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=18nPSwrh4bqMDf1a6hqzWaLtScJUpiqjm", title: "Unseating the Strong Man: Day 1", alt: "Unseating the Strong Man: Day 1", fileName: "Unseating the strong man _Day 1 _Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=14DPpYTaHi747U84i_LI9g0CSmLM_BW-k", title: "Unseating the Strong Man: Day 2", alt: "Unseating the Strong Man: Day 2", fileName: "Unseating the strongman_Day 2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1qoGA4Fpg7yp9Ns_wGxYe1tpuM5VZl6oC", title: "Wednesday Afternoon Restoration (Unedited)", alt: "Wednesday Afternoon Restoration (Unedited)", fileName: "Wednesday afternoon restoration unedited", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1r3UPNvevv-R9bedB665ckyDPXVgmrrap", title: "What Happened to Your Prophecies", alt: "What Happened to Your Prophecies", fileName: "What happened to your prophecies_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1a6u0NzRFC39-FAIT_PMndKMQBWHOA9HV", title: "What Has God Told You", alt: "What Has God Told You", fileName: "What has God told you_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1ZNWVfgaIldTQEDmqJFapoaOfsSGT7qiC", title: "What You Need Is a Word From God", alt: "What You Need Is a Word From God", fileName: "What you need is a word from God_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1s3wFm0BeExX4ZYGOoRfSGmArwHRoehPN", title: "Who Art Thou, O Great Mountain", alt: "Who Art Thou, O Great Mountain", fileName: "Who art thou O great mountain_ Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=13bi8sNk_W4-avZ2WwzTyD_sV_o32cBTk", title: "Why Is the Word of God Not Working in Your Life", alt: "Why Is the Word of God Not Working in Your Life", fileName: "Why is the word of God not working in your life_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1QDoftf8Fu8lr8DTZW5rvUg9TX_AMb_D4", title: "Establishing the Will of God", alt: "Establishing the Will of God", fileName: "Establishing the will of God_Ps Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1SqNR_2LZKKwouVESwind66f2WqsLj3pn", title: "A Charge to Declare Holy War", alt: "A Charge to Declare Holy War", fileName: "A charge to declare holy war _Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1vqJrTgxUUyqL13Ys_RbeUsU73SCMbNYq", title: "An Example of How Satan Uses Legalities Against the Believer", alt: "An Example of How Satan Uses Legalities Against the Believer", fileName: "An example of How satan uses lagalities against the believer_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=18DS0iRFByDvG0Q-tfgwymW5GcPcp2ydJ", title: "Breaking the Spell", alt: "Breaking the Spell", fileName: "Breaking the spell_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1eEpfMlekOQN-vObk-trBOfMiwz2T2pi8", title: "How God Strengthens Our Hands", alt: "How God Strengthens Our Hands", fileName: "How God strengthens our hands_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1rBKPFc9saT2UDwtiEtfQPNjPfOc-n7zz", title: "How to Interpret Accurately the Happenings in Your Life", alt: "How to Interpret Accurately the Happenings in Your Life", fileName: "How to interprete accurately the happenings in your life_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1WnE47UPvmacHdP7RY0GuQqn7hSGgvVbc", title: "How to Interpret the Happenings in Your Life Part 2", alt: "How to Interpret the Happenings in Your Life Part 2", fileName: "How to interprete the happenings in your life _Part 2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1BD0wPlhoyb77SGQfpo_zB_vQh5ZiV5_B", title: "Knowing God Experientially", alt: "Knowing God Experientially", fileName: "Knowing God experentially_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1_H8EcDRcE0ixVJTyfUy5U5carBzk9-Fr", title: "Let the Blood Speak", alt: "Let the Blood Speak", fileName: "Let the blood speak_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1pCkHVt6uNVd6KwiiJzlFL1TqSezXmJJ7", title: "Manifesting Prophecy: Dealing With Discouragement", alt: "Manifesting Prophecy: Dealing With Discouragement", fileName: "Manifesting Prophecy_ dealing with discouragement_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1AwVqVoLorRoe9zopBSjMD_-zs41cf_kz", title: "Receiving Feedback in Prayer: The Knowing of Revelation", alt: "Receiving Feedback in Prayer: The Knowing of Revelation", fileName: "Receiving feedback in prayer_ the knowing of revelation_Pastor", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1GHIx0DQz0fk8COq_dMVNGzY8PKRRMo4p", title: "The Dynamics to Manifesting Prophecy", alt: "The Dynamics to Manifesting Prophecy", fileName: "The dynamics to manifesting prophecy_ Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1pCkHVt6uNVd6KwiiJzlFL1TqSezXmJJ7", title: "The Sacrifice of Prayer", alt: "The Sacrifice of Prayer", fileName: "The Sacrifice of Prayer_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=18LcAa-xetHdRa30q84mQHtiwARS2nEcp", title: "Waiting on God: Dealing With Impatience", alt: "Waiting on God: Dealing With Impatience", fileName: "Waiting on God_Dealing with Impatience_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=19W1zdec_idOt58VcD1JwHED_FG7xEiLF", title: "Breakthrough Service", alt: "Breakthrough Service", fileName: "Breakthrough Service_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1N9RdhgB7YceQ3cD41oX_Qwz_TST3oUoC", title: "September Prayers", alt: "September Prayers", fileName: "September Prayers", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1uE2oBQY5D6l-tP_3Bp4kGMrS2IrBNmVT", title: "September Prayers They Continued 1st Session", alt: "September Prayers They Continued 1st Session", fileName: "September Prayers They Continued 1st session_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1vXDB1IplU6E9kvW6XAr9D4ITqVPukMH8", title: "Doers of the Word", alt: "Doers of the Word", fileName: "Doers of the Word_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1w5_Z-9cYbLcqOFnwL9dOH3uHqVUL-dxu", title: "Don't Give Up", alt: "Don't Give Up", fileName: "Dont Give up_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=16fxpwCa0pqUOGRgASaD3SX_PRZ6ASyRy", title: "Hour of Mercy: Manifesting Prophecies", alt: "Hour of Mercy: Manifesting Prophecies", fileName: "Hour of mercy Manifesting Prophecies_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1UClQyaYx0Exn1ePJc9N5_LKkOyWXgLLG", title: "Hour of Mercy With Prophetic Prayers", alt: "Hour of Mercy With Prophetic Prayers", fileName: "Hour of mercy with Prophetic prayers_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1v8DzNZ4gSTht7s0t-aAVOjURPANo84DW", title: "How God Strengthens Our Hands", alt: "How God Strengthens Our Hands", fileName: "How God strengthens our hands_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1V8WAanYmRZxeiPWGXv0cR5BKwAuBlthG", title: "Invoking the Confusion of the Lord Against Your Enemies", alt: "Invoking the Confusion of the Lord Against Your Enemies", fileName: "Invoking the confusion of the Lord against your enemies_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1BqgEICnPWeAg6zVtvKySuhteo8HG-ZZj", title: "Lord You Are Pleased With Me", alt: "Lord You Are Pleased With Me", fileName: "Lord you are pleased with me", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1K9fpCULhCEvL9mPup8aiRGrNQn4YzbOI", title: "Lord Perform What You Have Spoken", alt: "Lord Perform What You Have Spoken", fileName: "Lord perform what you have spoken_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=16WzFiQbcxLx_4rUvHI5dZTQ-n7r8s3jQ", title: "Manifesting Prophecies 3", alt: "Manifesting Prophecies 3", fileName: "Manifesting Prophecies 3_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1RlLmrAvi6lQ1pBeJeyj-kPAUGfgL5Pqx", title: "Manifesting Prophecies: Being Fully Persuaded", alt: "Manifesting Prophecies: Being Fully Persuaded", fileName: "Manifesting Prophecies_being fully persuaded_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1w7zxMTaNRzPtmymFiJv4YkI26DhenENY", title: "Manifesting Prophecies: Conquering the Spirit of Fear", alt: "Manifesting Prophecies: Conquering the Spirit of Fear", fileName: "Manifesting Prophecies_Conquering the spirit of fear_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1HSvm0Yhn4pOO_YTy9A9i44rnHwxmDdtl", title: "Manifesting Prophecies: Testimonies", alt: "Manifesting Prophecies: Testimonies", fileName: "Manifesting Prophecies_Testimonies_ Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1La0LN9oznYGMlhxOuT2UcK8jBxZUMDWK", title: "Manifesting Prophecies: The Gift of an Eye", alt: "Manifesting Prophecies: The Gift of an Eye", fileName: "Manifesting Prophecies_the gift of an eye_Pastor", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=14E3JDtUHcaD_05zDVF82Iak5Gv3-TDV7", title: "Manifesting Prophecies: Think on These Things", alt: "Manifesting Prophecies: Think on These Things", fileName: "Manifesting Prophecies_Think on these things_ Past Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=17veJST5Ou92IB2UD0M5xBIHqLjc1WeLd", title: "Manifesting Prophecies: Waiting on God", alt: "Manifesting Prophecies: Waiting on God", fileName: "Manifesting Prophecies_Waiting on God Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=14G2Tx1u5g3FwFLiXzj_LRF60MTzvdxg9", title: "Manifesting the Word of the Lord", alt: "Manifesting the Word of the Lord", fileName: "Manifesting Manifesting the word of the Lord_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1pCkHVt6uNVd6KwiiJzlFL1TqSezXmJJ7", title: "Manifesting Prophecy: Dealing With Discouragement 2", alt: "Manifesting Prophecy: Dealing With Discouragement 2", fileName: "Manifesting Prophecy_ dealing with discouragement2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=16w3CoQfj231QXdouL3p3QWInoYr5V4nh", title: "Men Sent by God (Full Message)", alt: "Men Sent by God (Full Message)", fileName: "Men sent by God full message _Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1g4QFXLxKI0BomlHMexZnZZPiZFLemhn-", title: "My Prayers for You This Month of July", alt: "My Prayers for You This Month of July", fileName: "My prayers for you this month of July_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1CPtAlSJYUw1K3h9K0mV5vU3MGcX0wr3K", title: "Non-Cognitive Modes of Communication 1", alt: "Non-Cognitive Modes of Communication 1", fileName: "Non-cognitive modes of communication 1", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=12gFUyPhP1ALxvdCIWYjTRpy5MHn9yUCG", title: "Patterns of Favour: Maintaining and Building Relationship", alt: "Patterns of Favour: Maintaining and Building Relationship", fileName: "Patterns of favour_maintaining and building relatonship Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=14yXjGDNnrbSXuMUF4_VTvIJlrVKPbtDT", title: "Prayer Charge", alt: "Prayer Charge", fileName: "Prayer charge_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1U9SCFL6E8P3ciLFJu-wgGx2fAZpW9eKI", title: "Prayers Against Evil Marks", alt: "Prayers Against Evil Marks", fileName: "Prayers against evil marks_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1xso6yq1Tdhgg7K22EpvnLLkcJK1BWWIH", title: "Prayers Against Evil Reports", alt: "Prayers Against Evil Reports", fileName: "Prayers against evil reports_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1AFgu6M1qYdeMgQpzY8wQDBvsXias3FIa", title: "Prayers Against Problem Expanders", alt: "Prayers Against Problem Expanders", fileName: "Prayers against problem expanders_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1YdMS0gH3EoaXcYP-C_XBnhLz2th_Ksxu", title: "Prayers Against Spiritual Marriage", alt: "Prayers Against Spiritual Marriage", fileName: "Prayers against spiritual marriage_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=11UFdO4LIt6pVtCZd0el5xrj1iWdZERo7", title: "Prayers Against Spiritual Marriage 2", alt: "Prayers Against Spiritual Marriage 2", fileName: "Prayers against spiritual marriage2_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=12DVALl52k8Syqd5IsHsM1v5kDqkpeKvb", title: "Praying the Promises of God", alt: "Praying the Promises of God", fileName: "Praying the promises of God_Pastor Enoch", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1-ZPSKzGMwarPXD6imB6WXgJsyMPBlXL2", title: "Preaching From Light", alt: "Preaching From Light", fileName: "Preaching from light", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1HdPy3-WUJtal3Ung0ULA9jOlPsABI4oH", title: "Prophecies During 14 Days Fasting in December 2023", alt: "Prophecies During 14 Days Fasting in December 2023", fileName: "Prophecies during 14 days fasting in december 2023", local: true },
  { type: "audio", src: "https://drive.google.com/uc?export=download&id=1C6Bq2NB7T8g3t92lHXUSKHSoGQIxInPA", title: "Prophecy About the Church of Pentecost 16 December 2023", alt: "Prophecy About the Church of Pentecost 16 December 2023", fileName: "Prophecy about the church of pentecost 16 december 2023", local: true },
];


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