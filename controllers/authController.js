const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const { Op } = require('sequelize');
const db = require('../models');
const User = db.User;
const Role = db.Role;




async function login(req, res) {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { cpf: login }
        ]
      },
    });
    if (!user) {
      return res.status(400).json({ error: 'Usuário ou senha inválida' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Usuário ou senha inválida' });
    }

    // Extrair o nome e o Role do usuário
    const { name } = user;
    const { email } = user;

    // Crie e retorne um token de acesso
    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: '6h' });
    res.json({ name, token, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

// async function passwordReset(req, res) {

// }

module.exports = {
  login,
  // signup
};
