const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Caminhos para os arquivos JSON na pasta server
const adminsFile = path.join(__dirname, 'admins.json');
const usersFile = path.join(__dirname, 'users.json');
const jogadoresFile = path.join(__dirname, 'jogadores.json');

router.get('/cadastro.html', async (req, res) => {
    const adminNome = req.headers['x-admin-nome'];
    if (!adminNome) {
        return res.redirect('/visualizar.html');
    }
    try {
        const admins = JSON.parse(await fs.readFile(adminsFile));
        const admin = admins.find(a => a.nome === adminNome);
        if (!admin) {
            return res.redirect('/visualizar.html');
        }
        res.sendFile(path.join(__dirname, '../public/cadastro.html'));
    } catch (error) {
        console.error('Erro ao verificar admin:', error);
        res.status(500).send('Erro interno');
    }
});

router.get('/api/jogadores', async (req, res) => {
    try {
        const jogadores = JSON.parse(await fs.readFile(jogadoresFile));
        res.json(jogadores);
    } catch (error) {
        console.error('Erro ao ler jogadores:', error);
        res.status(500).json({ error: 'Erro ao carregar jogadores' });
    }
});

router.get('/jogadores-europeus', async (req, res) => {
    try {
        const jogadores = JSON.parse(await fs.readFile(jogadoresFile));
        res.json(jogadores);
    } catch (error) {
        console.error('Erro ao ler jogadores europeus:', error);
        res.status(500).json({ error: 'Erro ao carregar jogadores' });
    }
});

router.post('/cadastrar-jogador', async (req, res) => {
    try {
        const novoJogador = { id: uuidv4(), ...req.body };
        const jogadores = JSON.parse(await fs.readFile(jogadoresFile));
        jogadores.push(novoJogador);
        await fs.writeFile(jogadoresFile, JSON.stringify(jogadores, null, 2));
        res.json({ message: 'Jogador cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar jogador:', error);
        res.status(500).json({ error: 'Erro ao cadastrar jogador' });
    }
});

router.patch('/atualizar-jogador/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const jogadores = JSON.parse(await fs.readFile(jogadoresFile));
        const index = jogadores.findIndex(j => j.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Jogador não encontrado' });
        }
        jogadores[index] = { ...jogadores[index], ...req.body };
        await fs.writeFile(jogadoresFile, JSON.stringify(jogadores, null, 2));
        res.json({ message: 'Jogador atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        res.status(500).json({ error: 'Erro ao atualizar jogador' });
    }
});

router.delete('/deletar-jogador/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const jogadores = JSON.parse(await fs.readFile(jogadoresFile));
        const index = jogadores.findIndex(j => j.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Jogador não encontrado' });
        }
        jogadores.splice(index, 1);
        await fs.writeFile(jogadoresFile, JSON.stringify(jogadores, null, 2));
        res.json({ message: 'Jogador deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar jogador:', error);
        res.status(500).json({ error: 'Erro ao deletar jogador' });
    }
});

router.post('/login', async (req, res) => {
    const { email, nome, tipo, senha } = req.body;
    const filePath = tipo === 'Administrador' ? adminsFile : usersFile;
    console.log('Tentando login:', { email, nome, tipo, filePath });

    try {
        const users = JSON.parse(await fs.readFile(filePath));
        console.log('Arquivo lido:', users);
        const user = users.find(u => u.email === email && u.nome === nome && u.senha === senha);
        console.log('Usuário encontrado:', user);

        if (user) {
            res.json({ message: 'Login bem-sucedido', redirect: tipo === 'Administrador' ? '/cadastro.html' : '/visualizar.html' });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao processar login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.post('/cadastrar-usuario', async (req, res) => {
    try {
        const { email, nome, senha } = req.body;
        let users = [];

        try {
            users = JSON.parse(await fs.readFile(usersFile));
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(usersFile, JSON.stringify([]));
            } else {
                throw error;
            }
        }

        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const novoUsuario = { email, nome, senha };
        users.push(novoUsuario);
        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
        res.json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

module.exports = router;