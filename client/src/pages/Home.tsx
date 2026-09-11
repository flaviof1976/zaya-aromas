import { useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronUp, Menu, Sparkles, X } from "lucide-react";

const LOGO = "/manus-storage/Logo01_a87d684e.png";
const PRODUCT_IMAGE = "/manus-storage/zaya-spray-500ml_66bc74e3.png";
const BOTANICAL_IMAGE = "/manus-storage/zaya-botanical_c21f8295.jpg";
const WHATSAPP_BASE = "https://wa.me/?text=";

const aromas = [
  { name: "Bamboo", description: "Fresco, verde, elegante e sofisticado.", color: "#b5cbb9", mark: "B" },
  { name: "Roupa Limpa", description: "Cheiro de limpeza, conforto e roupa recém-lavada.", color: "#d9e2df", mark: "R" },
  { name: "Flor de Algodão", description: "Delicado, suave, aconchegante e limpo.", color: "#f2eadc", mark: "F" },
  { name: "Capim-Limão", description: "Cítrico, refrescante e energizante.", color: "#d6dca8", mark: "C" },
  { name: "Lavanda", description: "Suave, relaxante e clássico.", color: "#c8bfd4", mark: "L" },
  { name: "Lavanda Francesa", description: "Floral, elegante e envolvente.", color: "#b6a1bd", mark: "L", premium: true },
  { name: "Figo Negro", description: "Intenso, sofisticado e marcante.", color: "#9b7e76", mark: "F", premium: true },
];

const promotions = [
  { number: "01", label: "Promoção 1", name: "Zaya Essencial", volume: "500 ml", price: "39,90", detail: "Para experimentar a Zaya", button: "Comprar 500 ml", className: "promotion-light" },
  { number: "02", label: "Promoção 2", name: "Zaya Intense", volume: "1 litro", price: "59,90", detail: "O melhor custo-benefício", button: "Comprar 1 litro", className: "promotion-featured" },
  { number: "03", label: "Promoção 3", name: "Zaya Signature", volume: "2 litros + 250 ml grátis", price: "109,90", detail: "Escolha 2 aromas de 1 L + ganhe 250 ml", button: "Comprar Signature", className: "promotion-dark" },
];

const makeMessage = (promotion: string, aroma: string) =>
  `Olá, Zaya! Quero comprar a ${promotion} no aroma ${aroma}. Pode me passar as formas de pagamento e entrega?`;

function AromaCard({ aroma, selected, onSelect }: { aroma: (typeof aromas)[number]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`store-aroma ${selected ? "store-aroma-selected" : ""}`}
      style={{ "--aroma-color": aroma.color } as React.CSSProperties}
      aria-pressed={selected}
    >
      <span className="aroma-orb">{aroma.mark}</span>
      <span className="aroma-copy"><strong>{aroma.name}</strong><small>{aroma.description}</small></span>
      <span className="aroma-check">{selected ? <Check /> : <ArrowRight />}</span>
      {aroma.premium && <span className="premium-label">Premium</span>}
    </button>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAroma, setSelectedAroma] = useState("Bamboo");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="zaya-page store-page">
      <header className="site-header store-header">
        <div className="header-inner">
          <button type="button" className="brand-lockup" onClick={() => scrollTo("inicio")} aria-label="Voltar ao início"><img src={LOGO} alt="Zaya Aromas Premium" /></button>
          <nav className={`main-nav ${mobileOpen ? "main-nav-open" : ""}`}>
            <button type="button" onClick={() => scrollTo("aromas")}>Aromas</button>
            <button type="button" onClick={() => scrollTo("promocoes")}>Promoções</button>
            <button type="button" onClick={() => scrollTo("duvidas")}>Dúvidas</button>
            <a className="nav-order" href={`${WHATSAPP_BASE}${encodeURIComponent(`Olá, Zaya! Quero comprar ${selectedAroma}.`)}`} target="_blank" rel="noreferrer">Comprar agora <ArrowRight /></a>
          </nav>
          <button type="button" className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="store-hero" id="inicio">
          <div className="container store-hero-grid">
            <div className="store-hero-copy">
              <div className="hero-brand"><img src={LOGO} alt="Zaya Aromas Premium" /></div>
              <p className="eyebrow"><span className="eyebrow-line" /> Aromatizante para sua casa</p>
              <h1>Seu espaço com<br /><em>cheiro de cuidado.</em></h1>
              <p className="hero-text">Aromatizantes Zaya para perfumar sua casa, sua rotina e os momentos que importam.</p>
              <button type="button" className="button button-dark" onClick={() => scrollTo("aromas")}>Escolher meu aroma <ArrowRight /></button>
              <div className="store-benefits"><span><Check /> Compra rápida</span><span><Check /> Entrega em Divinópolis</span></div>
            </div>
            <div className="store-hero-product">
              <div className="product-badge"><Sparkles /> Produto Zaya</div>
              <img src={PRODUCT_IMAGE} alt="Aromatizante Zaya em frasco spray de 500 ml" />
              <div className="product-caption"><span>Frasco spray</span><strong>500 ml</strong></div>
            </div>
          </div>
        </section>

        <section className="store-aromas-section" id="aromas">
          <div className="container">
            <div className="store-section-title"><div><p className="eyebrow">1. Escolha seu aroma</p><h2>Qual vai perfumar<br /><em>sua casa?</em></h2></div><p>Selecione uma fragrância e depois escolha o tamanho ideal nas promoções abaixo.</p></div>
            <div className="aromas-store-grid">{aromas.map((aroma) => <AromaCard key={aroma.name} aroma={aroma} selected={selectedAroma === aroma.name} onSelect={() => setSelectedAroma(aroma.name)} />)}</div>
            <div className="selected-aroma-bar"><span>Seu aroma escolhido: <strong>{selectedAroma}</strong></span><a className="button button-gold button-small" href={`${WHATSAPP_BASE}${encodeURIComponent(makeMessage("Zaya Intense de 1 litro", selectedAroma))}`} target="_blank" rel="noreferrer">Comprar {selectedAroma} <ArrowRight /></a></div>
          </div>
        </section>

        <section className="promotions-section" id="promocoes">
          <div className="container">
            <div className="store-section-title promotions-title"><div><p className="eyebrow">2. Escolha a quantidade</p><h2>Promoções<br /><em>Zaya</em></h2></div><p>Escolheu o tamanho? É só clicar em comprar. O pedido é confirmado pelo WhatsApp.</p></div>
            <div className="promotions-grid">
              {promotions.map((promotion) => (
                <article className={`promotion-card ${promotion.className}`} key={promotion.number}>
                  <div className="promotion-header"><span>{promotion.label}</span><strong>{promotion.number}</strong></div>
                  <div className="promotion-photo"><img src={PRODUCT_IMAGE} alt="Produto Zaya" /><span>{promotion.volume}</span></div>
                  <div className="promotion-content"><h3>{promotion.name}</h3><p className="promotion-detail">{promotion.detail}</p><div className="promotion-price"><span>R$</span><strong>{promotion.price}</strong></div><a className="promotion-button" href={`${WHATSAPP_BASE}${encodeURIComponent(makeMessage(promotion.name, selectedAroma))}`} target="_blank" rel="noreferrer">{promotion.button} <ArrowRight /></a></div>
                </article>
              ))}
            </div>
            <div className="free-delivery"><Check /> <strong>Frete grátis em Divinópolis</strong> na Promoção 3 · Zaya Signature</div>
          </div>
        </section>

        <section className="simple-info-section">
          <div className="container simple-info-grid"><div className="simple-info-image"><img src={BOTANICAL_IMAGE} alt="Algodão e folhas naturais" /></div><div><p className="eyebrow">3. Receba e aproveite</p><h2>Uma casa perfumada,<br /><em>sem complicação.</em></h2><p>Escolha seu aroma, clique na quantidade e fale com a Zaya. A gente combina pagamento e entrega pelo WhatsApp.</p><div className="steps"><div><strong>01</strong><span>Escolha o aroma</span></div><div><strong>02</strong><span>Escolha a promoção</span></div><div><strong>03</strong><span>Compre pelo WhatsApp</span></div></div></div></div>
        </section>

        <section className="faq-section store-faq" id="duvidas">
          <div className="container faq-grid"><div><p className="eyebrow">4. Dúvidas rápidas</p><h2>Ficou alguma<br /><em>dúvida?</em></h2><p className="faq-support">Se precisar, <a href={`${WHATSAPP_BASE}${encodeURIComponent("Olá, Zaya! Tenho uma dúvida antes de comprar.")}`} target="_blank" rel="noreferrer">fale com a Zaya <ArrowRight /></a></p></div><div className="faq-list">{["Qual aroma escolher?", "Como funciona a entrega?", "O que vem na Promoção 3?"].map((question, index) => <div className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong>{openFaq === index ? <ChevronUp /> : <ChevronDown />}</button>{openFaq === index && <p>{index === 0 ? "Bamboo, Capim-Limão e Lavanda são ótimos para começar. Roupa Limpa e Flor de Algodão são suaves e acolhedores. Lavanda Francesa e Figo Negro têm presença mais marcante." : index === 1 ? "A entrega é combinada pelo WhatsApp. Em Divinópolis, a Promoção 3 tem frete grátis." : "Você escolhe 1 litro de Bamboo, 1 litro de Roupa Limpa e ganha 250 ml de Flor de Algodão."}</p>}</div>)}</div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><div><img src={LOGO} alt="Zaya Aromas Premium" /><p>Aromatizantes premium para deixar<br />sua casa com cheiro de cuidado.</p></div><div className="footer-links"><button type="button" onClick={() => scrollTo("aromas")}>Aromas</button><button type="button" onClick={() => scrollTo("promocoes")}>Promoções</button><a href={`${WHATSAPP_BASE}${encodeURIComponent(`Olá, Zaya! Quero comprar ${selectedAroma}.`)}`} target="_blank" rel="noreferrer">WhatsApp <ArrowRight /></a></div><div className="footer-city"><span>Entrega local</span><strong>Divinópolis · MG</strong><span>© 2026 Zaya Aromas</span></div></div><div className="container footer-bottom"><span>Zaya Aromas Premium</span><span>Escolheu. Clicou. Comprou.</span></div></footer>
      <a className="floating-whatsapp" href={`${WHATSAPP_BASE}${encodeURIComponent(`Olá, Zaya! Quero comprar ${selectedAroma}.`)}`} target="_blank" rel="noreferrer"><span className="whatsapp-dot" /> Comprar pelo WhatsApp</a>
    </div>
  );
}
