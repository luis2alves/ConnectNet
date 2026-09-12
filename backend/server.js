const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o Banco de Dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'connectnet'
});

db.connect((err) => {
    if (err) {
        console.error('Falha ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL ConnectNet com sucesso!');
});

// Rota de teste inicial
app.get('/', (req, res) => {
    res.json({ mensagem: "API ConnectNet funcionando perfeitamente!" });
});


// ROTA DE LOGIN
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    
    const sql = 'SELECT * FROM cliente WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro no servidor ao tentar logar' });
        
        if (results.length === 0) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos!' });
        }
        
        res.json({ 
            mensagem: 'Login realizado com sucesso!', 
            usuario: results[0].nome 
        });
    });
});


// ROTAS PARA CLIENTES (CRUD COMPLETO)

app.get('/clientes', (req, res) => {
    const sql = 'SELECT id, nome, email, telefone, endereco, data_cadastro, status, plano_id FROM cliente'; // Omitido a senha por segurança na listagem geral
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar clientes no banco' });
        res.json(results);
    });
});

app.post('/clientes', (req, res) => {
    const { nome, email, senha, telefone, endereco, status, plano_id } = req.body;
    const data_cadastro = new Date().toISOString().split('T')[0]; 
    
    // Senha padrão caso venha vazia
    const senhaCliente = senha || '123456';
    
    const sql = 'INSERT INTO cliente (nome, email, senha, telefone, endereco, data_cadastro, status, plano_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [nome, email, senhaCliente, telefone, endereco, data_cadastro, status, plano_id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!', id: result.insertId });
    });
});

app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, telefone, endereco, status, plano_id } = req.body;
    
    let sql, params;
    
    // Se o admin mandou uma nova senha ao editar, atualiza ela também. Se não, mantém a senha atual.
    if (senha && senha.trim() !== '') {
        sql = 'UPDATE cliente SET nome = ?, email = ?, senha = ?, telefone = ?, endereco = ?, status = ?, plano_id = ? WHERE id = ?';
        params = [nome, email, senha, telefone, endereco, status, plano_id, id];
    } else {
        sql = 'UPDATE cliente SET nome = ?, email = ?, telefone = ?, endereco = ?, status = ?, plano_id = ? WHERE id = ?';
        params = [nome, email, telefone, endereco, status, plano_id, id];
    }
    
    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
        res.json({ mensagem: 'Cliente atualizado com sucesso!' });
    });
});

app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM cliente WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
        res.json({ mensagem: 'Cliente deletado com sucesso!' });
    });
});


// ROTAS PARA PLANOS (CRUD COMPLETO)

app.get('/planos', (req, res) => {
    const sql = 'SELECT * FROM plano';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar planos no banco' });
        res.json(results);
    });
});

app.post('/planos', (req, res) => {
    const { nome, velocidade, preco, descricao } = req.body;
    const sql = 'INSERT INTO plano (nome, velocidade, preco, descricao) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [nome, velocidade, preco, descricao], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Plano cadastrado com sucesso!', id: result.insertId });
    });
});

app.put('/planos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, velocidade, preco, descricao } = req.body;
    const sql = 'UPDATE plano SET nome = ?, velocidade = ?, preco = ?, descricao = ? WHERE id = ?';
    
    db.query(sql, [nome, velocidade, preco, descricao, id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Plano não encontrado!' });
        res.json({ mensagem: 'Plano atualizado com sucesso!' });
    });
});

app.delete('/planos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM plano WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Plano não encontrado!' });
        res.json({ mensagem: 'Plano deletado com sucesso!' });
    });
});


// ROTAS PARA CHAMADOS

app.get('/chamados', (req, res) => {
    const sql = 'SELECT * FROM chamado';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar chamados no banco' });
        res.json(results);
    });
});

app.post('/chamados', (req, res) => {
    const { cliente_id, descricao, status, prioridade } = req.body;
    const data_abertura = new Date().toISOString().split('T')[0];
    const sql = 'INSERT INTO chamado (cliente_id, descricao, data_abertura, status, prioridade) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [cliente_id, descricao, data_abertura, status, prioridade], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Chamado aberto com sucesso!', id: result.insertId });
    });
});

app.put('/chamados/:id', (req, res) => {
    const { id } = req.params;
    const { cliente_id, descricao, status, prioridade } = req.body;
    const sql = 'UPDATE chamado SET cliente_id = ?, descricao = ?, status = ?, prioridade = ? WHERE id = ?';
    
    db.query(sql, [cliente_id, descricao, status, prioridade, id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Chamado não encontrado!' });
        res.json({ mensagem: 'Chamado atualizado com sucesso!' });
    });
});

app.delete('/chamados/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM chamado WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Chamado não encontrado!' });
        res.json({ mensagem: 'Chamado deletado com sucesso!' });
    });
});


// ROTAS PARA FATURAS 

app.get('/faturas', (req, res) => {
    const sql = 'SELECT * FROM fatura';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar faturas no banco' });
        res.json(results);
    });
});

app.post('/faturas', (req, res) => {
    const { cliente_id, valor, data_vencimento, status } = req.body;
    const data_emissao = new Date().toISOString().split('T')[0];
    const sql = 'INSERT INTO fatura (cliente_id, valor, data_emissao, data_vencimento, status) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [cliente_id, valor, data_emissao, data_vencimento, status], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Fatura gerada com sucesso!', id: result.insertId });
    });
});

app.put('/faturas/:id', (req, res) => {
    const { id } = req.params;
    const { cliente_id, valor, data_vencimento, status } = req.body;
    const sql = 'UPDATE fatura SET cliente_id = ?, valor = ?, data_vencimento = ?, status = ? WHERE id = ?';
    
    db.query(sql, [cliente_id, valor, data_vencimento, status, id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Fatura não encontrada!' });
        res.json({ mensagem: 'Fatura atualizada com sucesso!' });
    });
});

app.delete('/faturas/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM fatura WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Fatura não encontrada!' });
        res.json({ mensagem: 'Fatura deletada com sucesso!' });
    });
});


// INICIALIZAÇÃO DO SERVIDOR

app.listen(3000, () => {
    console.log('Servidor ConnectNet rodando na porta 3000');
});