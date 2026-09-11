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
  { name: "Mamãe e Bebê", description: "Suave, acolhedor e delicadamente confortável.", color: "#d8c2b2", image: "mamae-bebe" },
];

type CartItem = { id: string; name: string; volume: string; price: number; qty: number };
const money = (value: number) => value.toFixed(2).replace(".", ",");
const messageFor = (items: CartItem[]) => `Olá, Zaya! Quero finalizar meu pedido:\n${items.map((item) => `${item.qty}x ${item.name} — ${item.volume} — R$ ${money(item.price * item.qty)}`).join("\n")}\n\nTotal: R$ ${money(items.reduce((sum, item) => sum + item.price * item.qty, 0))}`;

function AromaProductCard({ aroma, onAdd }: { aroma: (typeof aromas)[number]; onAdd: (items: { volume: string; price: number; qty: number }[]) => void }) {
  const [quantities, setQuantities] = useState({ small: 0, large: 0 });
  const updateQuantity = (key: "small" | "large", delta: number) => setQuantities((current) => ({ ...current, [key]: Math.max(0, current[key] + delta) }));
  const addSelected = () => {
    const items = [
      ...(quantities.small > 0 ? [{ volume: "500 ml", price: 39.9, qty: quantities.small }] : []),
      ...(quantities.large > 0 ? [{ volume: "1 litro", price: 59.9, qty: quantities.large }] : []),
    ];
    if (items.length) {
      onAdd(items);
      setQuantities({ small: 0, large: 0 });
    }
  };
  return (
    <article className="dark-aroma-card">
      <div className={`dark-aroma-image aroma-image-${aroma.image}`}><span className="aroma-image-overlay" /></div>
      <div className="dark-aroma-body"><div className="dark-aroma-title"><h3>{aroma.name}</h3>{aroma.premium && <span>Premium</span>}</div><p>{aroma.description}</p><div className="volume-options"><div><span>500 ml</span><strong>R$ 39,90</strong><div className="quantity-control"><button type="button" onClick={() => updateQuantity("small", -1)} aria-label={`Diminuir ${aroma.name} 500 ml`}><Minus /></button><b>{quantities.small}</b><button type="button" onClick={() => updateQuantity("small", 1)} aria-label={`Aumentar ${aroma.name} 500 ml`}><Plus /></button></div></div><div><span>1 litro</span><strong>R$ 59,90</strong><div className="quantity-control"><button type="button" onClick={() => updateQuantity("large", -1)} aria-label={`Diminuir ${aroma.name} 1 litro`}><Minus /></button><b>{quantities.large}</b><button type="button" onClick={() => updateQuantity("large", 1)} aria-label={`Aumentar ${aroma.name} 1 litro`}><Plus /></button></div></div></div><button type="button" className="add-aroma-button" onClick={addSelected} disabled={!quantities.small && !quantities.large}>Adicionar ao carrinho <ShoppingCart /></button></div>
    </article>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [toast, setToast] = useState("");

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const hasFreeDelivery = total >= 50;
  const addToCart = (name: string, volume: string, price: number, quantity = 1) => {
    setCart((current) => {
      const id = `${name}-${volume}`;
      const found = current.find((item) => item.id === id);
      if (found) return current.map((item) => item.id === id ? { ...item, qty: item.qty + quantity } : item);
      return [...current, { id, name, volume, price, qty: quantity }];
    });
    setToast("Produto adicionado ao carrinho");
    window.setTimeout(() => setToast(""), 3000);
  };
  const addAromaItems = (name: string, items: { volume: string; price: number; qty: number }[]) => items.forEach((item) => addToCart(name, item.volume, item.price, item.qty));
  const changeQty = (id: string, delta: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const checkoutHref = `${WHATSAPP_BASE}${encodeURIComponent(cart.length ? messageFor(cart) : "Olá, Zaya! Quero conhecer os aromas e fazer um pedido.")}`;
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  return (
    <div className="zaya-page dark-store">
      <header className="dark-header"><div className="dark-header-inner"><button type="button" className="dark-wordmark" onClick={() => scrollTo("inicio")} aria-label="Voltar ao início"><span>ZAYA</span><small>AROMAS PREMIUM</small></button><nav className={`dark-nav ${mobileOpen ? "dark-nav-open" : ""}`}><button type="button" onClick={() => scrollTo("aromas")}>Aromas</button><button type="button" onClick={() => scrollTo("promocoes")}>Promoções</button><button type="button" onClick={() => scrollTo("duvidas")}>Dúvidas</button><span className="header-delivery"><Truck /> Entrega grátis<br />em Divinópolis</span><a className="dark-whatsapp-button" href={checkoutHref} target="_blank" rel="noreferrer">WhatsApp <ArrowRight /></a></nav><button type="button" className="dark-mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">{mobileOpen ? <X /> : <span>☰</span>}</button></div></header>

      <main>
        <section className="dark-hero" id="inicio"><div className="dark-hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} /><div className="dark-hero-shade" /><div className="dark-hero-content container"><div className="dark-hero-copy"><p className="dark-eyebrow">Aromas premium · preço popular</p><h1>Aromas premium.<br /><span>Preço popular.</span></h1><p>Fragrâncias sofisticadas para sua casa, com preços que cabem no bolso.</p><button type="button" className="gold-text-link" onClick={() => scrollTo("aromas")}>Escolha seu aroma <ArrowRight /></button><div className="dark-hero-benefits"><span>◈ <b>Aromas exclusivos</b></span><span>◇ <b>Qualidade premium</b></span><span><Truck /> <b>Entrega grátis acima de<br />R$ 50 em Divinópolis</b></span></div></div></div></section>

        <section className="dark-shop" id="aromas"><div className="container dark-shop-layout"><div className="dark-shop-main"><div className="dark-section-head"><div><p className="dark-eyebrow">Escolha e economize</p><h2>Quanto mais você leva,<br /><em>menos você paga.</em></h2></div><p>Escolha uma oferta, selecione seu aroma e adicione ao pedido.</p></div><div className="offer-cards" id="promocoes"><article><span>Oferta 1</span><strong>500 ml</strong><b>R$ 39,90</b><small>Para experimentar</small><button type="button" onClick={() => scrollTo("aromas-list")}>Escolher aroma <ArrowRight /></button></article><article className="offer-card-highlight"><span>Oferta 2 · Mais escolhida</span><strong>1 litro</strong><b>R$ 59,90</b><small>Mais volume pelo seu dinheiro</small><button type="button" onClick={() => scrollTo("aromas-list")}>Escolher aroma <ArrowRight /></button></article><article className="offer-card-signature"><span>Oferta 3</span><strong>2 L + 250 ml grátis</strong><b>R$ 109,90</b><small>Monte sua combinação</small><button type="button" onClick={() => addToCart("Bamboo + Roupa Limpa + Flor de Algodão", "2 L + 250 ml grátis", 109.9)}>Adicionar oferta <ArrowRight /></button></article></div><div id="aromas-list" className="aromas-list-label"><p className="dark-eyebrow">Agora escolha seu aroma</p></div><div className="dark-aroma-grid">{aromas.map((aroma) => <AromaProductCard key={aroma.name} aroma={aroma} onAdd={(items) => addAromaItems(aroma.name, items)} />)}</div><div className="delivery-message"><Truck /> Entrega grátis para pedidos acima de <strong>R$ 50,00</strong> em Divinópolis.</div></div><aside className={`dark-cart ${cartOpen ? "dark-cart-open" : ""}`}><div className="cart-head"><span><ShoppingCart /> Seu pedido</span><b>{cartCount}</b><button type="button" className="cart-close" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho"><X /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingCart /><p>Seu carrinho está vazio.</p><span>Escolha uma oferta e um aroma<br />para adicionar ao pedido.</span></div> : <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div><strong>{item.name}</strong><span>{item.volume} · R$ {money(item.price)}</span></div><div className="cart-qty"><button type="button" onClick={() => changeQty(item.id, -1)}><Minus /></button><span>{item.qty}</span><button type="button" onClick={() => changeQty(item.id, 1)}><Plus /></button></div></div>)}</div>}<div className="cart-total"><div><span>Subtotal</span><span>R$ {money(total)}</span></div><div><span>Entrega</span><span className={hasFreeDelivery ? "free" : "delivery-threshold"}>{hasFreeDelivery ? "Grátis" : "Grátis acima de R$ 50"}</span></div><div className="total-line"><strong>Total</strong><strong>R$ {money(total)}</strong></div></div><a className="checkout-button" href={checkoutHref} target="_blank" rel="noreferrer">Finalizar pelo WhatsApp <ArrowRight /></a></aside></div></section>

        <section className="dark-how"><div className="container"><p className="dark-eyebrow">Compra simples</p><div className="how-grid"><div><strong>01</strong><span>Escolha<br />seu aroma</span></div><div><strong>02</strong><span>Escolha<br />a quantidade</span></div><div><strong>03</strong><span>Adicione<br />ao pedido</span></div><div><strong>04</strong><span>Finalize<br />no WhatsApp</span></div></div></div></section>

        <section className="dark-faq" id="duvidas"><div className="container faq-grid"><div><p className="dark-eyebrow">Dúvidas rápidas</p><h2>Ficou alguma<br /><em>dúvida?</em></h2><a className="dark-faq-link" href={`${WHATSAPP_BASE}${encodeURIComponent("Olá, Zaya! Tenho uma dúvida antes de comprar.")}`} target="_blank" rel="noreferrer">Fale com a Zaya <ArrowRight /></a></div><div className="faq-list">{["Qual aroma escolher?", "Como funciona a entrega?", "O que vem na Oferta 3?"].map((question, index) => <div className={`faq-item dark-faq-item ${openFaq === index ? "faq-open" : ""}`} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong>{openFaq === index ? <ChevronUp /> : <ChevronDown />}</button>{openFaq === index && <p>{index === 0 ? "Bamboo, Capim-Limão e Lavanda são ótimos para começar. Roupa Limpa, Flor de Algodão e Mamãe e Bebê são suaves e acolhedores. Lavanda Francesa e Figo Negro são mais marcantes." : index === 1 ? "A entrega é combinada pelo WhatsApp. Em Divinópolis, pedidos acima de R$ 50,00 têm entrega grátis." : "Você escolhe 2 aromas de 1 litro e recebe mais 250 ml grátis para experimentar um terceiro aroma."}</p>}</div>)}</div></div></section>
      </main>

      <footer className="dark-footer"><div className="container dark-footer-grid"><div><img src={LOGO} alt="Zaya Aromas Premium" /><p>Aromas premium para sua casa.</p></div><div><span>Atendimento</span><a href={checkoutHref} target="_blank" rel="noreferrer">WhatsApp (37) 9 9992-9748</a><span>Entrega em Divinópolis · MG</span></div><div><span>Compra rápida</span><button type="button" onClick={() => scrollTo("aromas")}>Escolher aromas <ArrowRight /></button><button type="button" onClick={() => scrollTo("promocoes")}>Ver promoções <ArrowRight /></button></div></div><div className="container dark-footer-bottom"><span>© 2026 Zaya Aromas Premium</span><span>Mais aroma para os seus dias.</span></div></footer>
      {toast && <div className="cart-toast" role="status"><Check /> {toast}</div>}
      <button type="button" className="mobile-cart-fab" onClick={() => setCartOpen(true)}><ShoppingCart /> Seu pedido <b>{cartCount}</b></button>
    </div>
  );
}
