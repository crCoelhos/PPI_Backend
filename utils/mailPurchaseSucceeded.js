// Outro arquivo JavaScript
const { emailCSS, headerContent, footerContent}= require('./mailUtils.js')

// Usar as constantes em seu código
const emailHTML = `
<html>
  <head>
    <style>
      ${emailCSS}
    </style>
  </head>
  <body>
    ${headerContent}
    <!-- Conteúdo do email -->
    ${emailContent}
    <!-- Fim do conteúdo do email -->
    ${footerContent}
  </body>
</html>
`;
