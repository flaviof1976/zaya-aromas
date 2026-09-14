import { useEffect } from "react";

export default function CookiePolicy() {
  useEffect(() => {
    document.title = "Política de Cookies | Zaya Aromas Premium";
    const robots = document.querySelector('meta[name="robots"]');
    robots?.setAttribute("content", "noindex, follow");
  }, []);

  return (
    <main className="container" style={{ padding: "60px 20px", maxWidth: 900, margin: "0 auto" }}>
      <h1>Política de Cookies</h1>
      <p><strong>Última atualização:</strong> 14 de setembro de 2026</p>
      <h2>1. O que são cookies?</h2>
      <p>Cookies são pequenos arquivos ou identificadores armazenados no dispositivo do visitante que podem permitir o funcionamento de recursos do site e a coleta de informações sobre sua utilização.</p>
      <h2>2. Cookies utilizados pela Zaya</h2>
      <p>O site da Zaya Aromas Premium utiliza atualmente tecnologias de análise do Google Analytics 4, que somente são ativadas após o visitante aceitar os cookies de análise no banner de consentimento.</p>
      <h2>3. Cookies de análise</h2>
      <p>Quando autorizados, os cookies e tecnologias do Google Analytics 4 são utilizados para entender como o site é utilizado, medir acessos, avaliar desempenho e melhorar a experiência do usuário.</p>
      <p>Esses recursos podem utilizar identificadores e informações técnicas relacionadas à navegação, como páginas acessadas, dispositivo e origem do acesso.</p>
      <h2>4. Cookies necessários</h2>
      <p>A Zaya pode utilizar armazenamento técnico necessário para registrar a preferência do visitante em relação ao consentimento de cookies. Esse armazenamento é usado para lembrar a escolha realizada e não é utilizado para publicidade.</p>
      <h2>5. Consentimento</h2>
      <p>O visitante pode aceitar ou recusar os cookies de análise. A recusa não impede a navegação ou a realização de pedidos pelo site.</p>
      <p>A qualquer momento, o visitante pode alterar sua preferência por meio do controle de preferências de cookies disponibilizado no site.</p>
      <h2>6. Terceiros</h2>
      <p>O Google Analytics é um serviço de terceiros. O tratamento realizado pelo Google está sujeito também às políticas e condições do próprio Google.</p>
      <h2>7. Retenção e controle</h2>
      <p>As informações coletadas por ferramentas de análise são tratadas de acordo com as configurações do serviço e com as finalidades informadas. A Zaya busca limitar o tratamento ao necessário para as finalidades descritas nesta política.</p>
      <h2>8. Relação com a Política de Privacidade</h2>
      <p>Esta Política de Cookies complementa a <a href="/politica-de-privacidade">Política de Privacidade</a> da Zaya Aromas Premium.</p>
      <h2>9. Alterações</h2>
      <p>Esta política poderá ser atualizada caso sejam adicionadas, removidas ou modificadas tecnologias de rastreamento, ferramentas de análise ou outras funcionalidades que utilizem cookies ou tecnologias semelhantes.</p>
      <h2>10. Contato</h2>
      <p>Para dúvidas sobre cookies e privacidade, entre em contato pelo e-mail <strong>zayaaromaspremium@gmail.com</strong> ou pelo WhatsApp <strong>(37) 9 9992-9748</strong>.</p>
    </main>
  );
}
