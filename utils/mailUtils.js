// Definição do CSS
const emailCSS =`
.header {
  background-color: #f2f2f2;
  padding: 10px;
}

.header-logo {
  text-align: center;
}
.header-logo h1{
  padding-top: 20px;
}

.header-logo-container {
  justify-items: center;
  transform: translate(-50%, -50%);
}

.header-logo img {
  max-width: 50px;
  height: auto;
}

/* Estilos do conteúdo */
.content {
  padding: 20px;
}

h1 {
  color: #333333;
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
}

.button:hover {
  background-color: #45a049;
  text-decoration: none;
}

/* Estilos do footer */
.footer {
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
}

.footer-social {
  margin-top: 10px;
}

.footer-social img {
  max-width: 50px;
  height: auto;
}

.footer-social a {
  display: inline-block;
  margin-right: 10px;
  color: #333333;
  text-decoration: none;
}

.footer-copyright {
  margin-top: 20px;
  color: #666666;
  font-size: 12px;
}
`;

// Conteúdo do Header
const headerContent = `
<div class="header">
<div class="header-logo">
  <h1 class="header-logo-container">
    <img src="https://i.imgur.com/OtmjztY.png" alt="JogosUni">
  </h1>
</div>
</div>
`;

// Conteúdo do Footer
const footerContent =`
<div class="footer">
<p>Siga-nos nas redes sociais:</p>
<div class="footer-social">
  <a href="https://www.facebook.com/seu-perfil" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
  </a>
  <a href="https://www.instagram.com/seu-perfil" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
  </a>
  <a href="https://www.twitter.com/seu-perfil" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/889/889147.png" alt="Twitter">
  </a>
</div>
<p class="footer-copyright">
  UniProduçôes&copy; Todos os direitos reservados
</p>
</div>
`;

module.exports = { emailCSS, headerContent, footerContent };
