const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

// Configuração do serviço de e-mail
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const remetente = `"JogosUni" ${config.email.user}`;

// Função para enviar e-mails
const enviarEmail = async (destinatario, assunto, conteudo) => {
  try {
    const info = await transporter.sendMail({
      from: remetente,
      to: destinatario,
      subject: assunto,
      html: conteudo,
    });
    console.log('E-mail enviado: ', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail: ', error);
  }
};

module.exports = {
  enviarEmail,
};
