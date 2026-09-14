import { useEffect } from "react";

export default function Returns() {
  useEffect(() => {
    document.title = "Trocas e Devoluções | Zaya Aromas Premium";
    const robots = document.querySelector('meta[name="robots"]');
    robots?.setAttribute("content", "noindex, follow");
  }, []);

  return (
    <main className="container" style={{ padding: "60px 20px", maxWidth: 900, margin: "0 auto" }}>
      <h1>Trocas, Devoluções e Direito de Arrependimento</h1>
      <p><strong>Última atualização:</strong> 14 de setembro de 2026</p>
      <h2>1. Direito de arrependimento</h2>
      <p>Nas compras realizadas fora do estabelecimento comercial, o consumidor poderá desistir da compra no prazo legal de 7 dias, contado conforme a legislação aplicável, sem necessidade de apresentar justificativa.</p>
      <h2>2. Como solicitar</h2>
      <p>Para exercer o direito de arrependimento ou solicitar uma devolução, entre em contato com a Zaya pelo WhatsApp (37) 9 9992-9748 ou pelo e-mail zayaaromaspremium@gmail.com, informando o pedido e a solicitação desejada.</p>
      <h2>3. Devolução do produto</h2>
      <p>Após o contato, a Zaya orientará o consumidor sobre a forma de devolução do produto. Quando aplicável, o produto deverá ser disponibilizado para devolução de acordo com as instruções fornecidas pela empresa.</p>
      <h2>4. Reembolso</h2>
      <p>Em caso de exercício válido do direito de arrependimento, os valores pagos serão restituídos na forma e nos prazos previstos na legislação aplicável, observadas as condições da modalidade de pagamento utilizada.</p>
      <h2>5. Produto com defeito ou problema</h2>
      <p>Produtos que apresentem defeito ou problema devem ser comunicados à Zaya assim que identificados. A empresa analisará a ocorrência e adotará as providências previstas na legislação de proteção ao consumidor e na garantia legal.</p>
      <h2>6. Trocas</h2>
      <p>Solicitações de troca serão avaliadas conforme o motivo apresentado, as condições do produto e a legislação aplicável. O atendimento será realizado pelos canais oficiais da Zaya.</p>
      <h2>7. Atendimento</h2>
      <p>E-mail: zayaaromaspremium@gmail.com<br />WhatsApp: (37) 9 9992-9748</p>
      <p>Esta política complementa os <a href="/termos-de-uso">Termos de Uso e Condições de Compra</a> e a <a href="/politica-de-privacidade">Política de Privacidade</a>.</p>
    </main>
  );
}
