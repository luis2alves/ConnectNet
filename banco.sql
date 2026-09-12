CREATE DATABASE connectnet;
USE connectnet;

CREATE TABLE plano (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    velocidade VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    descricao TEXT
);

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL, -- Campo de senha
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    data_cadastro DATE,
    status VARCHAR(20),
    plano_id INT,
    FOREIGN KEY (plano_id) REFERENCES plano (id)
);

CREATE TABLE fatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_emissao DATE,
    data_vencimento DATE,
    status VARCHAR(20),
    FOREIGN KEY (cliente_id) REFERENCES cliente (id)
);

CREATE TABLE chamado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    descricao TEXT NOT NULL,
    data_abertura DATE,
    status VARCHAR(30),
    prioridade VARCHAR(20),
    FOREIGN KEY (cliente_id) REFERENCES cliente (id)
);

-- Inserindo dados iniciais para testes
INSERT INTO plano (nome, velocidade, preco, descricao) 
VALUES ('Plano Fibra 100M', '100 Mbps', 89.90, 'Internet fibra ótica residencial');

-- Incluído o campo 'senha' no insert do cliente de teste (senha: 123456)
INSERT INTO cliente (nome, email, senha, telefone, endereco, data_cadastro, status, plano_id) 
VALUES ('Cliente Teste', 'teste@email.com', '123456', '86999998888', 'Rua Exemplo, 123', CURDATE(), 'ATIVO', 1);



