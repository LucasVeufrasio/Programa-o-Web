## Projeto Web de Criptografia

## Estrutura Geral do Projeto  
O sistema será uma aplicação web para criptografia de arquivos, com:  

- **CRUD**: Gerenciamento de usuários e chaves criptográficas.  
- **Transação**: Criptografia e descriptografia de arquivos.  
- **Arquitetura**: Modular.  
- **Controle de Acesso**: Login com autenticação via token JWT.  
- **Repositório**: Git e Notion para versionamento e documentação.  

---

## Definição das Tecnologias  

### **Backend (Servidor)**  
- **Linguagem**: TypeScript (**Node.js** com **NestJS**)  
- **Banco de Dados**: PostgreSQL  
- **Autenticação**: JWT (JSON Web Token)  
- **Criptografia**: Bibliotecas do Node.js (`crypto`, `bcrypt`, `jsonwebtoken`)  

---

## Estrutura das Funcionalidades  

### **CRUD - Gerenciamento de Usuários e Chaves**  
- Criar, editar, listar e excluir usuários.  
- Armazenar e gerenciar chaves criptográficas associadas a cada usuário.  

### **Transação - Criptografia e Descriptografia**  
- Upload de arquivos.  
- Download do arquivo processado.  

---

## Requisitos Funcionais  

### **Autenticação e Controle de Acesso**  
- Cadastro de usuários com nome, e-mail e senha.  
- Login de usuários com autenticação via JWT.  
- Validação de permissões para funcionalidades específicas.  

### **Gerenciamento de Usuários e Chaves**  
- Criar, editar, listar e excluir usuários.  
- Associar uma chave criptográfica a cada usuário.  
- Armazenamento seguro das chaves criptográficas.  

### **Criptografia e Descriptografia de Arquivos**  
- Upload de arquivos para criptografia.  
- Download do arquivo criptografado.  
- Descriptografia de arquivos previamente criptografados.  

---

## Requisitos Não Funcionais  

### **Arquitetura e Escalabilidade**  
- Arquitetura baseada em microserviços para escalabilidade.  

### **Segurança**  
- Apenas usuários autenticados podem acessar arquivos criptografados.  

### **Usabilidade**  
- Interface intuitiva e amigável, facilitando o uso por diferentes níveis de usuários.  

### **Confiabilidade**  
- Sistema estável e resiliente, garantindo alta disponibilidade.  

### **Portabilidade**  
- Compatível com múltiplas plataformas e dispositivos.  

### **Conformidade Legal**  
- Conformidade com LGPD (Lei Geral de Proteção de Dados - Brasil).  

---

## Desenvolvedores  

- **Lucas Vinicius Eufrasio**  
- **Sandro Machinski**  

## Plano de Trabalho  

[Jira - CatolicaSC Team](https://catolicasc-team.atlassian.net/jira/software/projects/LS/boards/2?atlOrigin=eyJpIjoiY2Y4YjhkNGFlOTQxNGI0OTg2ZmQ5NTg4ZjYxNzhmOWEiLCJwIjoiaiJ9)  
