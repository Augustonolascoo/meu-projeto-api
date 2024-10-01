const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha', // Substitua com a sua senha
    database: 'seu_banco_de_dados' // Substitua com o nome do seu banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Middleware para parsing de JSON e URL encoded
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir arquivos estáticos

// Endpoint para obter todos os usuários
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).send('Erro ao buscar usuários.');
        }
        res.json(results);
    });
});

// Endpoint para deletar usuário
app.delete('/deletar_usuario/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar o usuário:', err);
            return res.status(500).send('Erro ao deletar o usuário.');
        }
        if (results.affectedRows > 0) {
            res.sendStatus(200);
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
