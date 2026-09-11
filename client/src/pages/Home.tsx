import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Leaf,
  Menu,
  Minus,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

const LOGO = "/manus-storage/Logo01_a87d684e.png";
const HERO_IMAGE = "/manus-storage/zaya-hero_c88e3851.jpg";
const BOTANICAL_IMAGE = "/manus-storage/zaya-botanical_c21f8295.jpg";

const WHATSAPP_BASE = "https://wa.me/?text=";

const aromas = [
  { name: "Bamboo", tone: "Fresco", description: "verde, elegante e sofisticado.", color: "#b5cbb9", mark: "B" },
  { name: "Roupa Limpa", tone: "Conforto", description: "limpeza, acolhimento e roupa recém-lavada.", color: "#d9e2df", mark: "R" },
  { name: "Flor de Algodão", tone: "Delicado", description: "suave, aconchegante e limpo.", color: "#f2eadc", mark: "F" },
  { name: "Capim-Limão", tone: "Energizante", description: "cítrico, refrescante e luminoso.", color: "#d6dca8", mark: "C" },
  { name: "Lavanda", tone: "Clássico", description: "suave, relaxante e atemporal.", color: "#c8bfd4", mark: "L" },
  { name: "Lavanda Francesa", tone: "Premium", description: "floral, elegante e envolvente.", color: "#b6a1bd", mark: "L", premium: true },
  { name: "Figo Negro", tone: "Marcante", description: "intenso, sofisticado e inesquecível.", color: "#9b7e76", mark: "F", premium: true },
];

const plans = [
  {
    id: "essencial",
    eyebrow: "Para descobrir",
    name: "Zaya Essencial",
    volume: "500 ml",
    price: "39,90",
    note: "Seu primeiro encontro com a Zaya.",
    cta: "Quero experimentar",
    accent: "light",
  },
  {
    id: "intense",
    eyebrow: "A escolha da Zaya",
    name: "Zaya Intense",
    volume: "1 litro",
    price: "59,90",
    note: "O equilíbrio perfeito entre volume e valor.",
    cta: "Escolher meu aroma",
    accent: "featured",
  },
  {
    id: "signature",
    eyebrow: "Para viver a experiência",
    name: "Zaya Signature",
    volume: "2 L + 250 ml grátis",
    price: "109,90",
    note: "Monte uma combinação para cada canto da casa.",
    cta: "Montar meu 2,25 L",
    accent: "dark",
  },
];

const whatsappMessage = (product: string, aroma?: string) =>
  `Olá, Zaya! Quero pedir ${product}${aroma ? ` com o aroma ${aroma}` : ""}. Pode me ajudar?`;

function ProductSilhouette({ variant }: { variant: "small" | "tall" | "signature" }) {
  return (
    <div className={`product-art product-art-${variant}`} aria-hidden="true">
      <div className="product-cap" />
      <div className="product-neck" />
      <div className="product-body">
        <span className="product-stamp">ZAYA</span>
        <span className="product-line">AROMAS · PREMIUM</span>
      </div>
    </div>
  );
}

function AromaCard({ aroma, selected, onSelect }: { aroma: (typeof aromas)[number]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`aroma-card ${selected ? "aroma-card-selected" : ""}`}
      style={{ "--aroma-color": aroma.color } as React.CSSProperties}
      aria-pressed={selected}
    >
      <span className="aroma-orb">{aroma.mark}</span>
      <span className="aroma-info">
        <span className="aroma-name">{aroma.name}</span>
        <span className="aroma-description">{aroma.description}</span>
      </span>
      <span className="aroma-arrow"><ArrowUpRight /></span>
      {aroma.premium && <span className="aroma-premium">Premium</span>}
    </button>
  );
}

function ArrowUpRight() {
  return <ArrowRight className="rotate-[-45deg]" />;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAroma, setSelectedAroma] = useState("Bamboo");
  const [signatureAromas, setSignatureAromas] = useState(["Bamboo", "Roupa Limpa", "Flor de Algodão"]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const signatureMessage = useMemo(
    () => `Olá, Zaya! Quero montar meu Signature de 2,25 L com: ${signatureAromas.join(", ")}.`,
    [signatureAromas],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const cycleSignature = (index: number, direction: number) => {
    const currentIndex = aromas.findIndex((aroma) => aroma.name === signatureAromas[index]);
    const next = (currentIndex + direction + aromas.length) % aromas.length;
    setSignatureAromas((current) => current.map((item, i) => (i === index ? aromas[next].name : item)));
  };

  return (
    <div className="zaya-page">
      <header className="site-header">
        <div className="header-inner">
          <button type="button" className="brand-lockup" onClick={() => scrollTo("inicio")} aria-label="Voltar ao início">
            <img src={LOGO} alt="Zaya Aromas Premium" />
          </button>
          <nav className={`main-nav ${mobileOpen ? "main-nav-open" : ""}`}>
            <button type="button" onClick={() => scrollTo("colecao")}>Coleção</button>
            <button type="button" onClick={() => scrollTo("aromas")}>Aromas</button>
            <button type="button" onClick={() => scrollTo("ritual")}>O ritual Zaya</button>
            <a className="nav-order" href={`${WHATSAPP_BASE}${encodeURIComponent("Olá, Zaya! Quero conhecer os aromatizantes disponíveis.")}`} target="_blank" rel="noreferrer">Falar com a Zaya <ArrowRight /></a>
          </nav>
          <button type="button" className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-image" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
          <div className="hero-overlay" />
          <div className="hero-content container">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Aromas que ficam</p>
              <h1>A casa começa<br /><em>pelo aroma.</em></h1>
              <p className="hero-text">Aromatizantes premium para transformar a atmosfera, o ritmo e a memória dos seus espaços.</p>
              <div className="hero-actions">
                <button type="button" className="button button-gold" onClick={() => scrollTo("colecao")}>Escolher meu aroma <ArrowDownRight /></button>
                <button type="button" className="text-link text-link-light" onClick={() => scrollTo("aromas")}>Explorar fragrâncias <ArrowRight /></button>
              </div>
              <div className="hero-details">
                <span><Leaf /> Essências selecionadas</span>
                <span><Sparkles /> Feito para sua rotina</span>
              </div>
            </div>
          </div>
          <div className="hero-scroll"><span>Role para descobrir</span><div className="scroll-line" /></div>
        </section>

        <section className="intro-section" id="ritual">
          <div className="container intro-grid">
            <div className="intro-kicker"><span>01</span><div className="kicker-line" /><span>O ritual Zaya</span></div>
            <div className="intro-copy">
              <p className="eyebrow">Presença em cada detalhe</p>
              <h2>Não é só cheiro.<br /><em>É sensação.</em></h2>
              <p>Um bom aroma muda o jeito como um ambiente é percebido. A Zaya cria fragrâncias para marcar chegadas, acalmar noites e deixar a casa com a sua assinatura.</p>
              <button type="button" className="text-link" onClick={() => scrollTo("aromas")}>Encontrar minha assinatura <ArrowRight /></button>
            </div>
            <div className="intro-visual">
              <img src={BOTANICAL_IMAGE} alt="Algodão e folhas de eucalipto em uma composição natural" />
              <div className="visual-caption"><span>Notas que acolhem</span><span>Casa Zaya · 2026</span></div>
            </div>
          </div>
        </section>

        <section className="collection-section" id="colecao">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">A escada de valor Zaya</p><h2>Escolha o seu<br /><em>momento.</em></h2></div>
              <p className="heading-note">Comece pequeno, encontre seu aroma e leve mais daquilo que transforma seus espaços.</p>
            </div>
            <div className="plans-grid">
              {plans.map((plan, index) => (
                <article className={`plan-card plan-card-${plan.accent}`} key={plan.id}>
                  <div className="plan-top"><span>{plan.eyebrow}</span><span>0{index + 1}</span></div>
                  <div className="plan-art"><ProductSilhouette variant={index === 0 ? "small" : index === 1 ? "tall" : "signature"} /></div>
                  <div className="plan-content">
                    <h3>{plan.name}</h3>
                    <div className="plan-volume">{plan.volume}</div>
                    <p>{plan.note}</p>
                    <div className="plan-footer"><div><span className="price-prefix">R$</span><strong>{plan.price}</strong></div>
                      <a href={`${WHATSAPP_BASE}${encodeURIComponent(whatsappMessage(plan.name, index === 1 ? selectedAroma : undefined))}`} target="_blank" rel="noreferrer" className="plan-cta">{plan.cta} <ArrowUpRight /></a>
                    </div>
                  </div>
                  {plan.accent === "featured" && <div className="featured-tag"><Sparkles /> Recomendado para começar</div>}
                </article>
              ))}
            </div>
            <div className="delivery-note"><span className="delivery-icon">✦</span><span><strong>Entrega grátis em Divinópolis</strong> para pedidos Signature · porque o melhor aroma é o que chega até você.</span></div>
          </div>
        </section>

        <section className="aromas-section" id="aromas">
          <div className="container">
            <div className="aromas-intro">
              <div><p className="eyebrow eyebrow-light">02 · O seu aroma</p><h2>Qual história<br /><em>você quer contar?</em></h2></div>
              <div><p>Sete possibilidades para a sua casa. Escolha pelo mood, pela memória ou pela vontade do dia.</p><span className="selected-note">Selecionado agora: <strong>{selectedAroma}</strong></span></div>
            </div>
            <div className="aromas-grid">
              {aromas.map((aroma) => <AromaCard key={aroma.name} aroma={aroma} selected={selectedAroma === aroma.name} onSelect={() => setSelectedAroma(aroma.name)} />)}
            </div>
            <div className="aromas-cta"><p>Já sabe o que combina com você?</p><a href={`${WHATSAPP_BASE}${encodeURIComponent(whatsappMessage("Zaya Intense de 1 litro", selectedAroma))}`} target="_blank" rel="noreferrer" className="button button-cream">Quero {selectedAroma} <ArrowRight /></a></div>
          </div>
        </section>

        <section className="signature-section">
          <div className="container signature-wrap">
            <div className="signature-copy">
              <p className="eyebrow">03 · A combinação Zaya</p>
              <h2>Monte seu<br /><em>2,25 L.</em></h2>
              <p>Dois aromas de 1 litro para viver agora. Um frasco de 250 ml para descobrir depois. Seu ritual, do seu jeito.</p>
              <div className="signature-price"><span>por apenas</span><strong>R$ 109,90</strong></div>
              <a className="button button-dark" href={`${WHATSAPP_BASE}${encodeURIComponent(signatureMessage)}`} target="_blank" rel="noreferrer">Pedir minha combinação <ArrowRight /></a>
            </div>
            <div className="signature-builder">
              <div className="builder-head"><span>Minha combinação</span><span>2 L + 250 ml</span></div>
              {signatureAromas.map((aroma, index) => (
                <div className="builder-row" key={`${aroma}-${index}`}>
                  <div className="builder-index">0{index + 1}</div><div className="builder-bottle"><ProductSilhouette variant={index === 2 ? "small" : "tall"} /></div><div className="builder-name"><span>{index === 2 ? "Brinde" : "Aroma"}</span><strong>{aroma}</strong></div>
                  <div className="builder-controls"><button type="button" aria-label="Aroma anterior" onClick={() => cycleSignature(index, -1)}><Minus /></button><button type="button" aria-label="Próximo aroma" onClick={() => cycleSignature(index, 1)}><Plus /></button></div>
                </div>
              ))}
              <div className="builder-foot"><span><Check /> Entrega grátis em Divinópolis</span><span>feito para repetir</span></div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container faq-grid">
            <div><p className="eyebrow">04 · Antes de pedir</p><h2>Pequenas dúvidas,<br /><em>grandes rituais.</em></h2><p className="faq-support">Ainda em dúvida? <a href={`${WHATSAPP_BASE}${encodeURIComponent("Olá, Zaya! Tenho uma dúvida sobre os aromatizantes.")}`} target="_blank" rel="noreferrer">Fale com a gente <ArrowUpRight /></a></p></div>
            <div className="faq-list">
              {["Qual aroma combina com meu espaço?", "Como funciona a entrega?", "Posso misturar aromas no Signature?", "Como faço a reposição?"] .map((question, index) => (
                <div className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={question}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong>{openFaq === index ? <ChevronUp /> : <ChevronDown />}</button>
                  {openFaq === index && <p>{index === 0 ? "Pense no sentimento que você quer criar: Bamboo e Capim-Limão despertam; Lavanda acalma; Roupa Limpa e Flor de Algodão acolhem; Lavanda Francesa e Figo Negro deixam uma presença marcante." : index === 1 ? "A entrega é combinada pelo WhatsApp. Em Divinópolis, o Signature tem entrega grátis para você receber sua combinação sem complicação." : index === 2 ? "Sim. No Signature você escolhe dois aromas de 1 litro e recebe Flor de Algodão em 250 ml grátis para experimentar uma nova possibilidade." : "Quando o aroma virar hábito, é só chamar a Zaya pelo WhatsApp para repetir seu favorito ou montar uma nova combinação."}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top"><div><img src={LOGO} alt="Zaya Aromas Premium" /><p>Aromas premium para os espaços que<br />contam a sua história.</p></div><div className="footer-links"><button type="button" onClick={() => scrollTo("colecao")}>Coleção</button><button type="button" onClick={() => scrollTo("aromas")}>Aromas</button><a href={`${WHATSAPP_BASE}${encodeURIComponent("Olá, Zaya! Quero fazer um pedido.")}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight /></a></div><div className="footer-city"><span>Feito em</span><strong>Divinópolis · MG</strong><span>© 2026 Zaya Aromas</span></div></div>
        <div className="container footer-bottom"><span>Zaya Aromas Premium</span><span>Seu espaço, sua assinatura.</span></div>
      </footer>
      <a className="floating-whatsapp" href={`${WHATSAPP_BASE}${encodeURIComponent("Olá, Zaya! Quero escolher meu aroma.")}`} target="_blank" rel="noreferrer" aria-label="Falar com a Zaya pelo WhatsApp"><span className="whatsapp-dot" /> Falar com a Zaya</a>
    </div>
  );
}
