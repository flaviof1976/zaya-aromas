import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronUp, Minus, Plus, ShoppingCart, Truck, X } from "lucide-react";

const LOGO = "/manus-storage/Logo01_a87d684e.png";
const HERO_IMAGE = "/manus-storage/zaya-hero-dark_c44a7a72.png";
const BOTANICAL_IMAGE = "/manus-storage/zaya-botanical_c21f8295.jpg";
const WHATSAPP_NUMBER = "5537999929748";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

const aromas = [
  { name: "Bamboo", description: "Fresco, verde, elegante e sofisticado.", color: "#7e9e62", image: "bamboo" },
  { name: "Roupa Limpa", description: "Cheiro de limpeza, conforto e roupa recém-lavada.", color: "#d7d7cf", image: "clean" },
  { name: "Flor de Algodão", description: "Delicado, suave, aconchegante e limpo.", color: "#bca89b", image: "cotton" },
  { name: "Capim-Limão", description: "Cítrico, refrescante e energizante.", color: "#aebd62", image: "lemon" },
  { name: "Lavanda", description: "Suave, relaxante e clássico.", color: "#8b76a8", image: "lavender" },
  { name: "Lavanda Francesa", description: "Floral, elegante e envolvente.", color: "#80669f", image: "lavender-two", premium: true },
  { name: "Figo Negro", description: "Intenso, sofisticado e marcante.", color: "#765a55", image: "fig", premium: true },
];

type CartItem = { id: string; name: string; volume: string; price: number; qty: number };
const money = (value: number) => value.toFixed(2).replace(".", ",");
const messageFor = (items: CartItem[]) => `Olá, Zaya! Quero finalizar meu pedido:\n${items.map((item) => `${item.qty}x ${item.name} — ${item.volume} — R$ ${money(item.price * item.qty)}`).join("\n")}\n\nTotal: R$ ${money(items.reduce((sum, item) => sum + item.price * item.qty, 0))}`;

function AromaProductCard({ aroma, onAdd }: { aroma: (typeof aromas)[number]; onAdd: (volume: string, price: number) => void }) {
  return (
    <article className="dark-aroma-card">
      <div className={`dark-aroma-image aroma-image-${aroma.image}`}><span className="aroma-image-overlay" /></div>
      <div className="dark-aroma-body"><div className="dark-aroma-title"><h3>{aroma.name}</h3>{aroma.premium && <span>Premium</span>}</div><p>{aroma.description}</p><div className="volume-options"><div><span>500 ml</span><strong>R$ 39,90</strong><button type="button" onClick={() => onAdd("500 ml", 39.9)} aria-label={`Adicionar ${aroma.name} 500 ml`}><Plus /></button></div><div><span>1 litro</span><strong>R$ 59,90</strong><button type="button" onClick={() => onAdd("1 litro", 59.9)} aria-label={`Adicionar ${aroma.name} 1 litro`}><Plus /></button></div></div></div>
    </article>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const addToCart = (name: string, volume: string, price: number) => {
    setCart((current) => {
      const id = `${name}-${volume}`;
      const found = current.find((item) => item.id === id);
      if (found) return current.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { id, name, volume, price, qty: 1 }];
    });
    setCartOpen(true);
  };
  const changeQty = (id: string, delta: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const checkoutHref = `${WHATSAPP_BASE}${encodeURIComponent(cart.length ? messageFor(cart) : "Olá, Zaya! Quero conhecer os aromas e fazer um pedido.")}`;
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  return (
    <div className="zaya-page dark-store">
      <header className="dark-header"><div className="dark-header-inner"><button type="button" className="dark-wordmark" onClick={() => scrollTo("inicio")} aria-label="Voltar ao início"><span>ZAYA</span><small>AROMAS PREMIUM</small></button><nav className={`dark-nav ${mobileOpen ? "dark-nav-open" : ""}`}><button type="button" onClick={() => scrollTo("aromas")}>Aromas</button><button type="button" onClick={() => scrollTo("promocoes")}>Promoções</button><button type="button" onClick={() => scrollTo("duvidas")}>Dúvidas</button><span className="header-delivery"><Truck /> Entrega grátis<br />em Divinópolis</span><a className="dark-whatsapp-button" href={checkoutHref} target="_blank" rel="noreferrer">WhatsApp <ArrowRight /></a></nav><button type="button" className="dark-mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">{mobileOpen ? <X /> : <span>☰</span>}</button></div></header>

      <main>
        <section className="dark-hero" id="inicio"><div className="dark-hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} /><div className="dark-hero-shade" /><div className="dark-hero-content container"><div className="dark-hero-copy"><p className="dark-eyebrow">Aromas premium · preço popular</p><h1>Aromas premium.<br /><em>Preço popular.</em></h1><p>Fragrâncias sofisticadas para sua casa, com preços que cabem no bolso.</p><button type="button" className="gold-text-link" onClick={() => scrollTo("aromas")}>Escolha seu aroma <ArrowRight /></button><div className="dark-hero-benefits"><span>◈ <b>Aromas exclusivos</b></span><span>◇ <b>Qualidade premium</b></span><span><Truck /> <b>Entrega grátis<br />em Divinópolis</b></span></div></div></div></section>

        <section className="dark-shop" id="aromas"><div className="container dark-shop-layout"><div className="dark-shop-main"><div className="dark-section-head"><div><p className="dark-eyebrow">Escolha seu aroma</p><h2>Escolha seu aroma</h2></div><p>Selecione a quantidade e adicione ao seu pedido.</p></div><div className="dark-aroma-grid">{aromas.map((aroma) => <AromaProductCard key={aroma.name} aroma={aroma} onAdd={(volume, price) => addToCart(aroma.name, volume, price)} />)}</div><div className="signature-offer" id="promocoes"><div className="offer-pill">Oferta especial</div><div><p className="dark-eyebrow">Promoção 3</p><h3>Zaya Signature</h3><strong>2 litros + 250 ml grátis</strong><p>Monte seu kit com 2 aromas de 1 litro e ganhe 250 ml de um terceiro aroma favorito.</p><button type="button" onClick={() => { addToCart("Bamboo + Roupa Limpa + Flor de Algodão", "2 L + 250 ml grátis", 109.9); }}>Adicionar ao pedido <ArrowRight /></button></div><img src={BOTANICAL_IMAGE} alt="Composição botânica da Zaya" /></div></div><aside className={`dark-cart ${cartOpen ? "dark-cart-open" : ""}`}><div className="cart-head"><span><ShoppingCart /> Seu pedido</span><b>{cartCount}</b><button type="button" className="cart-close" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho"><X /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingCart /><p>Seu carrinho está vazio.</p><span>Escolha seus aromas ao lado<br />e adicione ao pedido.</span></div> : <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div><strong>{item.name}</strong><span>{item.volume} · R$ {money(item.price)}</span></div><div className="cart-qty"><button type="button" onClick={() => changeQty(item.id, -1)}><Minus /></button><span>{item.qty}</span><button type="button" onClick={() => changeQty(item.id, 1)}><Plus /></button></div></div>)}</div>}<div className="cart-total"><div><span>Subtotal</span><span>R$ {money(total)}</span></div><div><span>Entrega</span><span className="free">Grátis</span></div><div className="total-line"><strong>Total</strong><strong>R$ {money(total)}</strong></div></div><a className="checkout-button" href={checkoutHref} target="_blank" rel="noreferrer">Finalizar pelo WhatsApp <ArrowRight /></a></aside></div></section>

        <section className="dark-how"><div className="container"><p className="dark-eyebrow">Compra simples</p><div className="how-grid"><div><strong>01</strong><span>Escolha<br />seu aroma</span></div><div><strong>02</strong><span>Escolha<br />a quantidade</span></div><div><strong>03</strong><span>Adicione<br />ao pedido</span></div><div><strong>04</strong><span>Finalize<br />no WhatsApp</span></div></div></div></section>

        <section className="dark-faq" id="duvidas"><div className="container faq-grid"><div><p className="dark-eyebrow">Dúvidas rápidas</p><h2>Ficou alguma<br /><em>dúvida?</em></h2><a className="dark-faq-link" href={`${WHATSAPP_BASE}${encodeURIComponent("Olá, Zaya! Tenho uma dúvida antes de comprar.")}`} target="_blank" rel="noreferrer">Fale com a Zaya <ArrowRight /></a></div><div className="faq-list">{["Qual aroma escolher?", "Como funciona a entrega?", "O que vem na Promoção 3?"].map((question, index) => <div className={`faq-item dark-faq-item ${openFaq === index ? "faq-open" : ""}`} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong>{openFaq === index ? <ChevronUp /> : <ChevronDown />}</button>{openFaq === index && <p>{index === 0 ? "Bamboo, Capim-Limão e Lavanda são ótimos para começar. Roupa Limpa e Flor de Algodão são suaves e acolhedores. Lavanda Francesa e Figo Negro são mais marcantes." : index === 1 ? "A entrega é combinada pelo WhatsApp. Para Divinópolis, a Promoção 3 tem entrega grátis." : "Você escolhe 1 litro de Bamboo, 1 litro de Roupa Limpa e ganha 250 ml de Flor de Algodão."}</p>}</div>)}</div></div></section>
      </main>

      <footer className="dark-footer"><div className="container dark-footer-grid"><div><img src={LOGO} alt="Zaya Aromas Premium" /><p>Aromas premium para sua casa.</p></div><div><span>Atendimento</span><a href={checkoutHref} target="_blank" rel="noreferrer">WhatsApp (37) 9 9992-9748</a><span>Entrega em Divinópolis · MG</span></div><div><span>Compra rápida</span><button type="button" onClick={() => scrollTo("aromas")}>Escolher aromas <ArrowRight /></button><button type="button" onClick={() => scrollTo("promocoes")}>Ver promoções <ArrowRight /></button></div></div><div className="container dark-footer-bottom"><span>© 2026 Zaya Aromas Premium</span><span>Mais aroma para os seus dias.</span></div></footer>
      <button type="button" className="mobile-cart-fab" onClick={() => setCartOpen(true)}><ShoppingCart /> Seu pedido <b>{cartCount}</b></button>
    </div>
  );
}
