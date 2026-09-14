import { ArrowRight } from "lucide-react";
import "./Footer.css";

const WHATSAPP_URL = "https://wa.me/5537999929748?text=";

export default function Footer({ checkoutHref }: { checkoutHref: string }) {
  const whatsappHref = `${WHATSAPP_URL}${encodeURIComponent("Olá, Zaya! Quero conhecer os aromas e fazer um pedido.")}`;

  return (
    <footer className="dark-footer">
      <div className="container dark-footer-grid">
        <div>
          <img src="/images/logo.png" alt="Zaya Aromas Premium" />
          <p>Aromas premium para sua casa.</p>
        </div>
        <div>
          <span>Atendimento</span>
          <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp (37) 9 9992-9748</a>
          <span>Entrega em Divinópolis · MG</span>
          <span>Rua José Pio da Fonseca, 521 · Orion</span>
        </div>
        <div>
          <span>Compra rápida</span>
          <button type="button" onClick={() => document.getElementById("aromas")?.scrollIntoView({ behavior: "smooth" })}>Escolher aromas <ArrowRight /></button>
          <button type="button" onClick={() => document.getElementById("promocoes")?.scrollIntoView({ behavior: "smooth" })}>Ver promoções <ArrowRight /></button>
          <a href="/politica-de-privacidade">Política de Privacidade <ArrowRight /></a>
          <a href="/termos-de-uso">Termos de Uso <ArrowRight /></a>
          <a href="/trocas-e-devolucoes">Trocas e Devoluções <ArrowRight /></a>
        </div>
      </div>
      <div className="container dark-footer-bottom">
        <span>© 2026 Zaya Aromas Premium</span>
        <span>Mais aroma para os seus dias.</span>
      </div>
    </footer>
  );
}
