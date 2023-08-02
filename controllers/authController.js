const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const { Op } = require('sequelize');
const db = require('../models');
const User = db.User;
const Role = db.Role;

// async function signup(req, res) {
//   try {
//     // nome, email, senha, telefone, cpf, data de nascimento
//     const {
//       name,
//       email,
//       password,
//       contact,
//       cpf,
//       birthdate,
//       sex,
//       roleId,
//       hireDate,
//       photo,
//       document,
//       expertiseId,
//       is_active,
//     } = req.body;

//     const [existingEmail, existingContact, existingCpf] = await Promise.all([
//       User.findOne({ where: { email: email } }),
//       User.findOne({ where: { contact: contact } }),
//       User.findOne({ where: { cpf: cpf } }),
//     ]);

//     if (existingEmail) {
//       return res.status(409).json({ message: 'E-mail já está em uso' });
//     }

//     if (existingContact) {
//       return res.status(409).json({ message: 'Contato já está em uso' });
//     }

//     if (existingCpf) {
//       return res.status(409).json({ message: 'CPF já está em uso' });
//     }

//     // Criacao do usuario com a senha criptografada
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       contact,
//       cpf,
//       birthdate,
//       sex,
//       roleId,
//       hireDate,
//       photo,
//       document,
//       expertiseId,
//       is_active,
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'Conta criada com sucesso' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erro ao criar a conta' });
//   }
// }


async function login(req, res) {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: login },
          { cpf: login }
        ]
      },
      include: [{
        model: Role,
        as: 'role',
        attributes: ['name'] // Adicione os atributos que deseja retornar do Role
      }]
    });
    if (!user) {
      return res.status(400).json({ error: 'Usuário ou senha inválida' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Usuário ou senha inválida' });
    }

    // Extrair o nome e o Role do usuário
    const { name, role, email } = user;

    // Crie e retorne um token de acesso
    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: '6h' });
    res.json({ name, email, role: role.name, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

async function passwordReset(req, res) {

}

module.exports = {
  login,
  // signup
};
