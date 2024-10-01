// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para buscar todos os usuários
router.get('/users', userController.getUsers);

// Rota para criar um novo usuário
router.post('/users', userController.createUser);

// Rota para deletar um usuário pelo ID
router.delete('/users/:id', userController.deleteUser);

// Rota para atualizar um usuário pelo ID
router.put('/users/:id', userController.updateUser);

module.exports = router;
