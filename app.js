const cors = require('cors');
const express = require('express');
require('dotenv').config();

const db = require('./models');
const routes = require('./routes')
const app = express();

app.use(cors());
app.use(express.json());


app.use(routes);

const port = process.env.PORT || 3000;

// somente iniciar os servicos ser conectar ao banco
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Falha ao conectar ao banco de dados:', error);
  });