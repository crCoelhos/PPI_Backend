const bcrypt = require('bcrypt');
const db = require('../models');
const Role = db.Role;
const User = db.User;
const crypto = require('crypto');
const Expertise = db.Expertise;




function generateResetToken() {
  const token = crypto.randomBytes(32).toString('hex');
  return token;
}


function createLogger(level) {
  return message => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} [${level.toUpperCase()}]: ${message}`);
  };
}

const infoLogger = createLogger('info');
const errorLogger = createLogger('error');

async function createUser(req, res) {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const { name, cpf, email, password, contact, birthdate, hireDate, roleId, is_active, photo, document, sex, expertiseId } = req.body;

    infoLogger(`Recebido req.body: \n ${JSON.stringify(req.body)} \n`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      cpf,
      email,
      password: hashedPassword,
      contact,
      birthdate,
      hireDate,
      roleId,
      is_active,
      photo,
      document,
      sex,
      expertiseId
    });

    infoLogger(`Usuário criado: ${user.email}`);
    res.status(201).json({ message: 'Usuário criado com sucesso', email: user.email });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const duplicateField = err.errors[0].path;
      errorLogger(`Erro de validação: ${duplicateField} já está em uso`);
      return res.status(400).json({ message: `${duplicateField} já está em uso` });
    }
    errorLogger(`Erro durante a criação do usuário: ${err.message}`);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function getAllUsers(req, res) {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        },
      ],
      attributes: {
        exclude: ['password'],
      }
    });

    res.status(200).json(users);
  } catch (err) {
    errorLogger(`Erro durante a busca de usuários: ${err.message}`);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function getUserById(req, res) {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID não fornecido' });
    }

    const user = await User.findOne({
      where: { id: id },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      ],
      attributes: {
        exclude: ['roleId', 'password'],
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (err) {
    errorLogger(`Erro durante a busca do usuário: ${err.message}`);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function getUserData(req, res) {
  try {
    const userId = req.user.id; // Obtém o ID do usuário autenticado

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      ],
      attributes: {
        exclude: ['roleId', 'password'],
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (err) {
    errorLogger(`Erro durante a busca do usuário: ${err.message}`);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}



async function updateUserById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'ID não fornecido' });
    }

    const userUpdate = await User.findByPk(id);
    if (!userUpdate) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = req.body;

    infoLogger(`Recebido req.body: ${JSON.stringify(req.body)}`);

    await User.update(user, {
      where: { id: id }
    });

    infoLogger(`Usuário atualizado: ${id}`);
    return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    errorLogger(`Erro durante a atualização do usuário: ${err.message}`);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function deleteUserById(req, res) {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'ID não fornecido' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();
    infoLogger(`Usuário excluído: ${id}`);
    res.status(204).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    errorLogger(`Erro durante a exclusão do usuário: ${err.message}`);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}



async function requestPasswordReset(req, res) {
  try {
    const { cpf, email, birthdate } = req.body;

    const user = await User.findOne({ where: { cpf, email } });

    if (!user || user.birthdate !== birthdate) {
      return res.status(401).json({ message: 'CPF, e-mail ou data de nascimento incorretos' });
    }

    const resetToken = generateResetToken();

    user.resetToken = resetToken;
    await user.save();

    res.status(200).json({ resetToken });
    console.log(resetToken)
  } catch (err) {
    console.error(`Erro durante o processo de solicitação de recuperação de senha: ${err.message}`);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}


async function confirmPasswordReset(req, res) {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({ where: { resetToken: token } });

    if (!user) {
      return res.status(401).json({ message: 'Token de recuperação de senha inválido' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (err) {
    console.error(`Erro durante a redefinição de senha: ${err.message}`);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserData,
  updateUserById,
  deleteUserById,
  requestPasswordReset,
  confirmPasswordReset
};
