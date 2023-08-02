const { enviarEmail } = require('../services/emailService');
const { emailCSS, headerContent, footerContent } = require('./mailUtils');

const enviarEmailRecuperacaoSenha = (destinatario, nomeUsuario, linkReset) => {
  const assunto = 'Recuperação de Senha';
  const conteudo =`
    <html>
      <head>
        <style>
          ${emailCSS}
        </style>
      </head>
      <body>
        ${headerContent}

        <div class="content">
          <h1>Recuperação de Senha</h1>
          <p>Olá, ${nomeUsuario}!</p>
          <p>Recebemos uma solicitação para redefinir sua senha.</p>
          <p>Para redefinir sua senha, clique no botão abaixo: <strong> O link é válido pelas próximas 2 Horas</strong></p>
          <a class="button" style="color: #FFFFFF; text-decoration: none" href="${linkReset}/">
            <span style="color: #FFFFFF; text-decoration: none">
              <font color="#FFFFFF">Redefinir Senha</font>
            </span>
          </a>
          <p>Se o botão não funcionar para você, copie o link: ${linkReset}</p>
          <p>Se você não solicitou uma redefinição de senha, ignore este e-mail.</p>
          <p>Atenciosamente,</p>
          <p>UniProduçôes</p>
        </div>  
        ${footerContent}
      </body>
    </html>
  `;

  enviarEmail(destinatario, assunto, conteudo);
};

module.exports = {
   enviarEmailRecuperacaoSenha,
 };
//enviarEmailRecuperacaoSenha('ppaalo.henriquecosta@gmail.com', 'Paulo Henrique', 'https://exemplo.com/resetar-senha');