# Projeto Web de Criptografia

## Estrutura Geral do Projeto

O sistema é uma aplicação web para criptografia de arquivos, com:

- **CRUD** de usuários
- **Autenticação JWT**
- **Upload de arquivos**
- **Visualização via página web**
- **Arquitetura modular (NestJS)**
- **Banco de dados PostgreSQL**
- **Testes via Postman**

---

## Tecnologias Aplicadas

- **NestJS** com **TypeScript**
- **TypeORM** com **PostgreSQL**
- **JWT** para autenticação
- **Bcrypt** para hashing de senhas
- **Multer** para upload de arquivos
- **HTML** para interface web simples
- **Postman** para testes de endpoints

---

## Funcionalidades Implementadas (Requisitos Funcionais)

### 🔐 Autenticação e Controle de Acesso

- [x] Cadastro de usuário (nome, e-mail, senha)
- [x] Hash de senha com Bcrypt
- [x] Login com autenticação JWT
- [x] Proteção de rotas com token (ex: `/users`)

### 👤 Gerenciamento de Usuários

- [x] Criar usuário
- [x] Listar usuários
- [x] Buscar usuário por ID
- [x] Atualizar usuário
- [x] Deletar usuário

### 📁 Upload e Visualização de Arquivos

- [x] Envio de arquivos via Postman (form-data)
- [x] Armazenamento físico local em `uploads/`
- [x] Endpoint para listar arquivos (`GET /upload/list`)
- [x] Página HTML com links para download (`/upload/view`)

---

## Interface Web Simples

- [x] Página `/upload/view` para exibir lista de arquivos enviados
- [x] Links funcionais para baixar arquivos diretamente

---

## Requisitos Não Funcionais Atendidos

- ✅ Segurança com senhas hash e autenticação JWT
- ✅ Modularidade (arquitetura limpa com módulos e controllers)
- ✅ Conformidade com boas práticas de backend

---

## Desenvolvedores

- **Lucas Vinicius Eufrasio**
- **Sandro Machinski**

## Repositório e Documentação

- [Jira - CatolicaSC Team](https://catolicasc-team.atlassian.net/jira/software/projects/LS/boards/2?atlOrigin=eyJpIjoiY2Y4YjhkNGFlOTQxNGI0OTg2ZmQ5NTg4ZjYxNzhmOWEiLCJwIjoiaiJ9)
- https://www.notion.so/1a47aeebb2ba80b6adb4ec38995c5be3?v=1a47aeebb2ba8047a5a5000caaec1ae3&pvs=4
---

