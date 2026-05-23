# 💰 API de Controle Financeiro

API REST para gerenciamento de finanças pessoais, desenvolvida com Node.js, Express e MySQL.

## 🚀 Tecnologias

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- dotenv

## 📦 Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando

### Instalação

```bash
# Clone o repositório
git clone https://github.com/DanielFariasdev/api-controle-financeiro.git

# Entre na pasta
cd api-controle-financeiro

# Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env` na raiz com as suas credenciais:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=controle_financeiro
DB_PORT=3306
PORT=3000
```

Crie o banco de dados no MySQL:
```sql
CREATE DATABASE controle_financeiro;
```

### Rodando

```bash
npm run dev
```

## 📋 Endpoints

### Categorias

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /categorias | Lista todas as categorias |
| POST | /categorias | Cria uma categoria |
| DELETE | /categorias/:id | Deleta uma categoria |

### Transações

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /transacoes | Lista todas as transações |
| POST | /transacoes | Cria uma transação |
| PUT | /transacoes/:id | Atualiza uma transação |
| DELETE | /transacoes/:id | Deleta uma transação |
| GET | /transacoes/resumo | Retorna resumo financeiro |

## 📊 Exemplo de uso

### Criar uma categoria
```json
POST /categorias
{
  "nome": "Salário",
  "tipo": "receita"
}
```

### Criar uma transação
```json
POST /transacoes
{
  "descricao": "Salário maio",
  "valor": 3000.00,
  "tipo": "receita",
  "data": "2026-05-23",
  "categoriaId": 1
}
```

### Resumo financeiro
```json
GET /transacoes/resumo

{
  "receitas": "3000.00",
  "despesas": "150.00",
  "saldo": "2850.00"
}
```