const userController = require('../controllers/userController.js');
const db = require('../models');
const { Op } = require('sequelize');
const Role = db.Role;


exports.getAllRoles = async (req, res) => {

    try{
        const _id = req.user.id;
        const roleUser = await this.getRole({_id})

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({message: 'Você não tem permissão para criar novos usuários.'});
        }
        const roles = await Role.findAll()
        res.status(200).json(roles)
    }
    catch (err) {
        res.status(500).json({message:err.message})
    }
} 
