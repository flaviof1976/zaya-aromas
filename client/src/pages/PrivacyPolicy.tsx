import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Política de Privacidade | Zaya Aromas Premium";
    const robots = document.querySelector('meta[name="robots"]');
    robots?.setAttribute("content", "noindex, follow");
  }, []);

  return (
    <main className="container" style={{ padding: "60px 20px", maxWidth: 900, margin: "0 auto" }}>
      <h1>Política de Privacidade</h1>
      <p><strong>Última atualização:</strong> 14 de setembro de 2026</p>
      <h2>1. Controlador</h2>
      <p>A Zaya Aromas Premium, de titularidade de Flávio Ferreira, inscrita no CNPJ sob nº 08.204.152/0001-18, é responsável pelo tratamento dos dados pessoais realizado por meio deste site.</p>
      <p>Endereço: Rua José Pio da Fonseca, 521, Orion, Divinópolis - MG.</p>
      <p>E-mail: zayaaromaspremium@gmail.com<br />WhatsApp: (37) 9 9992-9748</p>
      <h2>2. Dados tratados</h2>
      <p>Podemos tratar informações fornecidas voluntariamente pelo usuário durante o contato com a Zaya, além de informações técnicas de navegação, como páginas acessadas, dispositivo e dados relacionados à utilização do site.</p>
      <h2>3. Google Analytics</h2>
      <p>Utilizamos o Google Analytics 4 para compreender como os visitantes utilizam o site, avaliar seu desempenho e melhorar a experiência de navegação. O Google Analytics somente é ativado quando o visitante aceita os cookies de análise por meio do banner de consentimento.</p>
      <p>Quando autorizado, o serviço pode utilizar cookies e tecnologias semelhantes para registrar informações relacionadas à utilização do site.</p>
      <h2>4. WhatsApp</h2>
      <p>O site disponibiliza links para contato e finalização de pedidos pelo WhatsApp. Ao utilizar esse recurso, o usuário será direcionado ao serviço do WhatsApp, que possui seus próprios termos e políticas de privacidade.</p>
      <h2>5. Finalidades</h2>
      <p>Os dados podem ser utilizados para atendimento ao cliente, processamento e acompanhamento de pedidos, comunicação com o usuário, segurança, melhoria do site, análise de utilização quando autorizada e cumprimento de obrigações legais.</p>
      <h2>6. Compartilhamento</h2>
      <p>Os dados poderão ser compartilhados com prestadores de serviços e plataformas utilizadas na operação do site quando isso for necessário para as finalidades descritas nesta política ou para cumprimento de obrigação legal.</p>
      <h2>7. Segurança</h2>
      <p>A Zaya adota medidas técnicas e administrativas razoáveis para proteger os dados pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida.</p>
      <h2>8. Direitos do titular</h2>
      <p>Nos termos da legislação aplicável, especialmente da Lei Geral de Proteção de Dados Pessoais (LGPD), o titular poderá solicitar, conforme aplicável, confirmação da existência de tratamento, acesso, correção, atualização, eliminação e outras providências previstas em lei.</p>
      <p>As solicitações podem ser encaminhadas para:<br /><strong>zayaaromaspremium@gmail.com</strong></p>
      <h2>9. Cookies</h2>
      <p>As informações sobre cookies, tecnologias de análise, consentimento e alteração de preferências estão disponíveis na <a href="/politica-de-cookies">Política de Cookies</a>.</p>
      <h2>10. Alterações desta política</h2>
      <p>Esta política poderá ser atualizada para refletir alterações na operação da Zaya, nos serviços utilizados ou na legislação aplicável.</p>
      <h2>11. Contato</h2>
      <p>Para dúvidas sobre privacidade ou tratamento de dados pessoais, entre em contato pelo e-mail zayaaromaspremium@gmail.com ou pelo WhatsApp (37) 9 9992-9748.</p>
    </main>
  );
}
