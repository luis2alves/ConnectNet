# ConnectNet - Sistema de Gerenciamento de Provedor de Internet

O ConnectNet é uma plataforma web de gerenciamento desenvolvida sob medida para suprir as demandas operacionais de Provedores de Serviços de Internet (ISPs) de pequeno e médio porte[cite: 1]. Este projeto visa substituir processos manuais e descentralizados baseados em planilhas locais por um ecossistema integrado, automatizado e seguro[cite: 1].

## Funcionalidades (MVP)

O sistema possui uma arquitetura modular com os seguintes recursos:
* **Painel Administrativo Dinâmico (SPA):** Interface de página única com proteção de rota e gerenciamento de sessão via `localStorage`[cite: 1].
* **Gestão de Clientes:** Permite cadastrar, editar, listar e excluir assinantes, além de vincular clientes aos planos contratados[cite: 1].
* **Gestão de Planos:** Administração flexível do catálogo de pacotes de internet, controlando velocidades e taxas mensais[cite: 1].
* **Gestão de Faturas:** Controle financeiro para acompanhamento monetário e emissão de cobranças[cite: 1].
* **Central de Chamados:** Abertura e controle de tickets de suporte técnico organizados por níveis de prioridade (Baixa, Média, Alta)[cite: 1].
* **Segurança e Autenticação:** Validação rigorosa de credenciais no banco de dados, armazenamento de senhas com hash criptográfico e controle estruturado de acesso[cite: 1].

## Tecnologias e Arquitetura

O sistema adota uma arquitetura Cliente-Servidor totalmente desacoplada[cite: 1].

* **Frontend (Interface Web):** Desenvolvido em HTML5, CSS3 e JavaScript nativo (Vanilla JS) no padrão Single Page Application (SPA)[cite: 1]. A comunicação com o servidor é feita de forma assíncrona consumindo a API RESTful via `fetch` API[cite: 1].
* **Backend (API RESTful):** Construído com Node.js e a biblioteca Express, operando na porta 3000[cite: 1].
* **Banco de Dados:** MySQL (schema `connectnet`), utilizando o driver `mysql2` para operações assíncronas[cite: 1].
* **Gestão de Ferramentas:** Controle de versão com Git/GitHub e gestão ágil de sprints utilizando a metodologia Kanban no Trello[cite: 1].

## Perfis de Acesso (Stakeholders)
* **Clientes:** Acesso restrito para consultar planos, visualizar faturas e acompanhar tickets de suporte[cite: 1].
* **Administradores:** Acesso total às funções gerenciais do sistema[cite: 1].
* **Suporte Técnico:** Responsáveis por atualizar status de ocorrências e definir prioridades[cite: 1].

* ## Sobre o Projeto (About)

O **ConnectNet** é o resultado de um projeto acadêmico desenvolvido em 2026 para o curso de Tecnologia em Sistemas para Internet da Universidade Estadual do Piauí – UESPI (EAD - UAPPI), Polo Jerumenha[cite: 1]. 

O objetivo central desta plataforma é projetar, implementar e validar um sistema web unificado para erradicar falhas de faturamento e atrasos no atendimento técnico comuns em provedores de internet[cite: 1]. Ao migrar de anotações em papel e planilhas soltas para um banco de dados relacional e uma API dedicada, o projeto entrega uma fundação tecnológica altamente escalonável, projetada para receber futuras expansões corporativas, como integrações de pagamentos automatizadas e gráficos interativos[cite: 1].

**Equipe de Desenvolvimento:**
* Adrielly Ferraz de Oliveira Brito[cite: 1]
* Caroline Borges Albuquerque[cite: 1]
* Lusia Alves da Silva Sousa Neta[cite: 1]
