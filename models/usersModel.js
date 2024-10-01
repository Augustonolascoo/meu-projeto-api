const db = require('../config/db');

// Cria um novo usuário
const createUser = (name, email) => {
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        db.query(sql, [name, email], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Busca todos os usuários
const getAllUsers = () => {
    const sql = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Deleta um usuário pelo ID
const deleteUser = (id) => {
    const sql = 'DELETE FROM users WHERE indusers = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Atualiza um usuário pelo ID
const updateUser = (id, name, email) => {
    const sql = 'UPDATE users SET name = ?, email = ? WHERE indusers = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [name, email, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
};
