import { useState } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../config/api";
import { SITE } from "../config/site";
import "./Chatbot.css";

// Safe structured renderer — no dangerouslySetInnerHTML
const LinkLine = ({ children, href }) => (
  <p>
    {children} <a className="chat-link" href={href} target="_blank" rel="noopener noreferrer">{href.replace(/^mailto:|^https?:\/\//, "")}</a>
  </p>
);

export default function Chatbot() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { type: "bot", text: t("chatbot.greeting") },
    { type: "bot", text: t("chatbot.chooseOption") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendEmail = async (text) => {
    try {
      await fetch(API_ENDPOINTS.sendEnquiry, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
    } catch (err) {
      console.error("Email error:", err);
    }
  };

  const clearInitial = () =>
    setMessages((prev) =>
      prev.filter(
        (m) =>
          !(
            m.text.includes(t("chatbot.greeting")) ||
            m.text.includes(t("chatbot.chooseOption"))
          )
      )
    );

  const optionReply = (option) => {
    switch (option) {
      case "Enquiries":
        return {
          node: (
            <>
              <p>{t("chatbot.enquiries.intro")}</p>
              <LinkLine href={`mailto:${SITE.email}`}>{t("chatbot.enquiries.email")}</LinkLine>
              <LinkLine href={`https://wa.me/${SITE.whatsapp}`}>{t("chatbot.enquiries.whatsapp")}</LinkLine>
            </>
          ),
        };
      case "Contacts":
        return { node: <LinkLine href={`https://wa.me/${SITE.whatsapp}`}>{t("chatbot.contacts.line")}</LinkLine> };
      case "Initiatives":
        return { node: <p>{t("chatbot.initiatives.line")}</p> };
      case "Remarks":
        return { node: <p>{t("chatbot.remarks.line")}</p> };
      case "Book a Meeting":
        return { node: <p>{t("chatbot.meeting.line")}</p> };
      default:
        return { node: <p>{t("chatbot.unknown")}</p> };
    }
  };

  const handleOption = (option) => {
    clearInitial();
    setIsTyping(true);
    setTimeout(() => {
      const { node } = optionReply(option);
      setMessages((prev) => [...prev, { type: "bot", node }]);
      setIsTyping(false);
    }, 900);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    clearInitial();
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    sendEmail(input);
    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(input)}`,
      "_blank"
    );
    setMessages((prev) => [...prev, { type: "bot", text: t("chatbot.sent") }]);
    setInput("");
  };

  const options = ["Enquiries", "Contacts", "Initiatives", "Remarks", "Book a Meeting"];

  return (
    <div className="chatbot-page">
      <div className="chatbot-header">
        <h2>{t("chatbot.header")}</h2>
        <p>{t("chatbot.subtitle")}</p>
      </div>

      <div className="chatbot-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message-row ${m.type}`}>
            <div className="avatar" aria-hidden="true">
              {m.type === "bot" ? "🤖" : "🧑"}
            </div>
            <div className={`message ${m.type}`}>
              {m.node ? m.node : m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator" aria-live="polite">
            <span /><span /><span />
          </div>
        )}
      </div>

      <div className="chatbot-options">
        {options.map((opt) => (
          <button key={opt} onClick={() => handleOption(opt)}>{opt}</button>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={t("chatbot.placeholder")}
        />
        <button onClick={sendMessage}>{t("chatbot.send")}</button>
      </div>
    </div>
  );
}