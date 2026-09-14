import { useEffect, useState } from "react";

const KEY = "zaya_cookie_consent";
const GA_ID = "G-PDVPB8ZR5C";

declare global { interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void; } }

function loadAnalytics() {
  if (document.getElementById("zaya-ga-script")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  const script = document.createElement("script");
  script.id = "zaya-ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    setChoice(saved);
    setVisible(!saved);
    if (saved === "accepted") loadAnalytics();
    const handler = (event: Event) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
      if (link && window.gtag) window.gtag("event", "whatsapp_click", { link_url: link.href, transport_type: "beacon" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const save = (value: string) => {
    localStorage.setItem(KEY, value);
    setChoice(value);
    setVisible(false);
    if (value === "accepted") loadAnalytics();
  };

  if (!visible && choice) return <button onClick={() => { localStorage.removeItem(KEY); setChoice(null); setVisible(true); }} style={{ position: "fixed", left: 14, bottom: 14, zIndex: 9998, border: "1px solid rgba(18,61,58,.2)", background: "#fff", color: "#123d3a", borderRadius: 999, padding: "8px 12px", fontSize: 12, cursor: "pointer", boxShadow: "0 4px 18px rgba(0,0,0,.12)" }}>Preferências de cookies</button>;

  return <div role="dialog" aria-label="Preferências de cookies" style={{ position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 9999, maxWidth: 920, margin: "0 auto", background: "#fff", color: "#17201f", border: "1px solid rgba(18,61,58,.16)", borderRadius: 14, padding: "18px 20px", boxShadow: "0 10px 35px rgba(0,0,0,.18)" }}>
    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 7 }}>Cookies e privacidade</div>
    <div style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 14 }}>Usamos cookies de análise para entender o uso do site e melhorar sua experiência. Você pode aceitar ou recusar. A recusa não impede sua navegação nem seus pedidos pelo WhatsApp. <a href="/politica-de-cookies" style={{ color: "#123d3a", textDecoration: "underline" }}>Saiba mais</a>.</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button onClick={() => save("accepted")} style={{ background: "#123d3a", color: "#fff", border: "1px solid #123d3a", borderRadius: 8, padding: "9px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Aceitar cookies de análise</button>
      <button onClick={() => save("rejected")} style={{ background: "#fff", color: "#123d3a", border: "1px solid #123d3a", borderRadius: 8, padding: "9px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Recusar</button>
    </div>
  </div>;
}
