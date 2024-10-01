const User = require('../models/usersModel');

// Valida os dados do usuário
const validateUserData = (data) => {
    const { name, email } = data;
    if (!name || typeof name !== 'string') return 'Nome inválido';
    if (!email || typeof email !== 'string' || !email.includes('@')) return 'Email inválido';
    return null;
};

// Busca todos os usuários
const getUsers = async (req, res) => {
    try {
        const results = await User.getAllUsers();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cria um novo usuário
const createUser = async (req, res) => {
    const { name, email } = req.body;
    
    const validationError = validateUserData({ name, email });
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
    
    try {
        const result = await User.createUser(name, email);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deleta um usuário pelo ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const result = await User.deleteUser(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(204).send(); // No content status code for successful deletion
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualiza um usuário pelo ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const validationError = validateUserData({ name, email });
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const result = await User.updateUser(id, name, email);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ id, name, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
};
