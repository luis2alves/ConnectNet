# ConnectNet - Sistema de Gerenciamento de Provedor de Internet

O **ConnectNet** é uma plataforma web de gerenciamento desenvolvida sob medida para suprir as demandas operacionais de Provedores de Serviços de Internet (ISPs) de pequeno e médio porte. Este projeto visa substituir processos manuais e descentralizados baseados em planilhas locais por um ecossistema integrado, automatizado e seguro.

---

## Funcionalidades (MVP)

* **Painel Administrativo Dinâmico (SPA):** Interface de página única com verificação de rota, cabeçalho dinâmico e controle de sessão via `localStorage`.
* **Gestão de Clientes:** Permite cadastrar, editar, listar e excluir assinantes, além de vincular cada cliente a um plano de banda larga.
* **Gestão de Planos:** Administração flexível do catálogo de pacotes de internet, permitindo cadastrar velocidades e valores mensais.
* **Gestão de Faturas:** Controle financeiro completo para emissão e acompanhamento monetário de cobranças formatadas em Reais (R$).
* **Central de Chamados:** Abertura e acompanhamento de tickets de suporte técnico com níveis de prioridade (Baixa, Média, Alta).
* **Segurança e Autenticação:** Validação de credenciais no banco de dados, armazenamento seguro de senhas e restrição de acesso a áreas administrativas.

---

## Arquitetura e Tecnologias

O sistema adota uma arquitetura Cliente-Servidor totalmente desacoplada:

* **Frontend:** HTML5, CSS3 e JavaScript nativo (Vanilla JS) organizados como Single Page Application (SPA), consumindo a API RESTful de forma assíncrona via `fetch` API.
* **Backend:** API RESTful desenvolvida em Node.js com o framework Express, operando na porta 3000.
* **Banco de Dados:** MySQL (schema `connectnet`), utilizando o driver `mysql2` com suporte a operações assíncronas.
* **Gestão e Versionamento:** Controle de versão centralizado no GitHub e organização das etapas de desenvolvimento via Kanban no Trello.

---

## Estrutura do Projeto

```text
ConnectNet/
├── backend/          # API Node.js / Express (server.js, package.json)
├── .gitignore        # Arquivos e pastas ignorados pelo Git
├── banco.sql         # Script DDL de criação do schema e dados iniciais (seeds)
├── index.html        # Painel principal do sistema (Dashboard SPA)
├── login.html        # Tela de acesso e autenticação
├── package.json      # Configurações globais do projeto
└── README.md         # Documentação oficial do repositório
```

---

## Stakeholders e Permissões

* **Clientes:** Acesso para consultar planos contratados, visualizar faturas e abrir/acompanhar tickets de suporte.
* **Administradores:** Acesso total para gerenciamento de clientes, planos, faturas e administração da fila de chamados.
* **Suporte Técnico:** Acesso para atualização do status das ocorrências e definição de prioridades.

---

## Como Executar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 18 ou superior)
* **MySQL Server** (via MySQL Workbench, phpMyAdmin ou XAMPP)
* **Git**

---

### 1. Clonar o Repositório

```bash
git clone [https://github.com/luis2alves/ConnectNet.git](https://github.com/luis2alves/ConnectNet.git)
cd ConnectNet
```

### 2. Configurar o Banco de Dados (MySQL)

1. Abra o seu gerenciador de banco de dados MySQL.
2. Importe e execute o arquivo `banco.sql` localizado na raiz do projeto.
3. O script criará o banco de dados `connectnet`, as tabelas relacionais (`plano`, `cliente`, `fatura`, `chamado`) e os dados de testes iniciais.

### 3. Configurar e Iniciar o Backend

1. No terminal, acesse a pasta do backend:

   ```bash
   cd backend
   ```
2. Instale as dependências do Node.js:

   ```bash
   npm install
   ```
3. Inicie o servidor da API:

   ```bash
   node server.js
   ```

   > **Status:** O servidor estará ativo e rodando na porta 3000 (`http://localhost:3000`).

### 4. Executar o Frontend

1. Retorne à pasta raiz do projeto.
2. Abra o arquivo `login.html` diretamente no seu navegador de preferência.
3. *Dica:* Se utilizar o **VS Code**, clique com o botão direito sobre o arquivo `login.html` e selecione **"Open with Live Server"**.

---

## Sobre o Projeto (About)

O **ConnectNet** foi desenvolvido em 2026 para o curso de Tecnologia em Sistemas para Internet da **Universidade Estadual do Piauí – UESPI (EAD - UAPPI)**, Polo Jerumenha.

O objetivo central da aplicação é substituir processos manuais e planilhas descentralizadas por um ecossistema integrado e seguro, erradicando falhas de faturamento e otimizando o suporte técnico em provedores de banda larga.

**Discentes / Desenvolvedoras:**

* Adrielly Ferraz de Oliveira Brito
* Caroline Borges Albuquerque
* Lusia Alves da Silva Sousa Neta
