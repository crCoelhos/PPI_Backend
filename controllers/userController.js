const bcrypt = require('bcrypt');
const db = require('../models');
const Role = db.Role;
const User = db.User;
const Expertise = db.Expertise;

async function createUser(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão para criar usuários.' });
    }

    const { name, cpf, email, password, contact, birthdate, hireDate, roleId, is_active, photo, document, sex, expertiseId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, cpf, email, password: hashedPassword, contact, birthdate, hireDate, roleId, is_active, photo, document, sex, expertiseId });



    res.status(201).json(user.email);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    if (req.user.role !== 'ADMIN') {
      let role = req.user.role

      console.log("role: ", role)


      return res.status(403).json({ message: 'Você não tem permissão de busca de usuários: ' });
    }

    const users = await User.findAll({

      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        },
        // {
        //   model: Expertise,
        //   as: 'expertises',
        //   attributes: ['name'],
        //   through: { attributes: [] }
        // }
      ],
      attributes: {
        exclude: ['password'],
      }
    });
    // console.log("jorge ", users)

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUserById(req, res) {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão de busca de usuário.' });
    }

    const { id } = req.params;
    if (!id) {
      res.json({ message: "Você não passou o id no parâmetro" })
    }
    const user = await User.findOne({
      where: { id: id },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        },
        // {
        //   model: Expertise,
        //   as: 'expertises',
        //   attributes: ['name'],
        //   through: { attributes: [] }
        // }
      ],
      attributes: {
        exclude: ['roleId', 'password'],
      }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function updateUserById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.json({ message: "Você não passou o id no parâmetro" })
    }

    const userUpdate = await User.findByPk(id)
    if (!userUpdate) {
      res.json({ message: 'Usuário não encontrado' })
    }
    const user = req.body;

    await User.update(user, {
      where: { id: id }
    });
    return res.status(200).json({ message: "Usuário atualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteUserById(req, res) {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão para deletar usuário.' });
    }

    const id = req.params.id;
    if (!id) {
      res.json({ message: "Você não passou o id no parâmetro" })
    }
    const user = await User.findByPk(id)
    if (user) {
      await user.destroy()
      res.status(204).json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
