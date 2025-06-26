# conectar-api

API RESTful desenvolvida em [NestJS](https://nestjs.com/) para gestão de usuários, autenticação (incluindo OAuth Google), saúde da aplicação e integração com banco de dados PostgreSQL.

---

## Sumário

- [Links do Projeto Conectar](#links-do-projeto-conectar)
- [Rotas Principais](#rotas-principais)
- [Serviços](#serviços)
- [Infraestrutura](#infraestrutura)
- [Bibliotecas Utilizadas e Justificativas](#bibliotecas-utilizadas-e-justificativas)
- [Configurações](#configurações)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Testes](#testes)
- [Swagger](#swagger)
- [Docker](#docker)
- [Licença](#licença)

---

## Links do Projeto Conectar

### Front-end

**Repositório do código fonte:**  
[https://github.com/ErickMarllon/conectar-app](https://github.com/ErickMarllon/conectar-app)

**Aplicação hospedada na Vercel:**

- [https://conectar-app.vercel.app/dashboard](https://conectar-app.vercel.app/dashboard)
- [https://conectar-app-erickmarllons-projects.vercel.app/dashboard](https://conectar-app-erickmarllons-projects.vercel.app/dashboard)
- [https://conectar-app-git-main-erickmarllons-projects.vercel.app/dashboard](https://conectar-app-git-main-erickmarllons-projects.vercel.app/dashboard)
- [https://conectar-kyiijwg4f-erickmarllons-projects.vercel.app/](https://conectar-kyiijwg4f-erickmarllons-projects.vercel.app/)

---

### Back-end

**Repositório do código fonte:**  
[https://github.com/ErickMarllon/conectar-api](https://github.com/ErickMarllon/conectar-api)

**API hospedada na Render:**  
[https://conectar-api-1wos.onrender.com](https://conectar-api-1wos.onrender.com)

**Documentação Swagger da API:**  
[https://conectar-api-1wos.onrender.com/api-docs#](https://conectar-api-1wos.onrender.com/api-docs#)

---

## Rotas Principais

### Autenticação (`/api/auth`)

| Método | Rota               | Descrição                                |
| ------ | ------------------ | ---------------------------------------- |
| POST   | `/signin`          | Login com e-mail e senha                 |
| POST   | `/signup`          | Cadastro de novo usuário                 |
| POST   | `/refresh`         | Gera novo access token via refresh token |
| GET    | `/me`              | Retorna dados do usuário autenticado     |
| GET    | `/google`          | Inicia OAuth com Google                  |
| GET    | `/google/callback` | Callback do OAuth Google                 |
| GET    | `/token/:code`     | Recupera token via código do OAuth       |

### Usuários (`/api/users`)

| Método | Rota        | Descrição                               |
| ------ | ----------- | --------------------------------------- |
| POST   | `/`         | Cria usuário (apenas ADMIN)             |
| GET    | `/`         | Lista usuários (apenas ADMIN, paginado) |
| GET    | `/search`   | Busca usuários (apenas ADMIN)           |
| GET    | `/inactive` | Lista usuários inativos                 |
| GET    | `/:id`      | Busca usuário por ID (restrito)         |
| PATCH  | `/:id`      | Atualiza usuário (restrito)             |
| DELETE | `/:id`      | Remove usuário (apenas ADMIN)           |

### Saúde (`/api/health`)

| Método | Rota | Descrição                         |
| ------ | ---- | --------------------------------- |
| GET    | `/`  | Health check da aplicação e banco |

---

## Serviços

- **AuthenticationService**: Login, cadastro, refresh token, OAuth Google, controle de tentativas, bloqueio, etc.
- **UsersService**: CRUD de usuários, busca, paginação, controle de inativos.
- **HealthService**: Verificação de saúde da aplicação e banco.
- **Guards**: JWT, Roles, OAuth, CSRF, etc.
- **Utils**: Hash de senha (argon2), validação, transformação de dados, etc.

---

## Infraestrutura

- **Banco de Dados**: PostgreSQL, gerenciado via TypeORM, com entidades e migrações versionadas.
- **Autenticação**: JWT (access/refresh/forgot/confirm), OAuth Google, controle de sessões, CSRF.
- **Cache**: CacheManager para sessões temporárias (ex: OAuth).
- **Configuração**: Variáveis de ambiente via dotenv, validadas por classes.
- **Swagger**: Documentação automática em `/api-docs`.
- **Segurança**: Helmet, CORS configurável, validação global, serialização de respostas.
- **Docker**: Ambiente pronto para desenvolvimento e produção, incluindo banco e pgAdmin.

---

## Bibliotecas Utilizadas e Justificativas

- **@nestjs/core, @nestjs/common, @nestjs/swagger, @nestjs/terminus**: Estrutura principal, documentação e health check.
- **@nestjs/typeorm, typeorm, pg**: ORM e driver para PostgreSQL.
- **@nestjs/jwt, @nestjs/passport, passport, passport-jwt, passport-google-oauth20**: Autenticação JWT e OAuth Google.
- **argon2**: Hash seguro de senhas.
- **class-validator, class-transformer**: Validação e transformação de DTOs.
- **dotenv**: Carregamento de variáveis de ambiente.
- **helmet**: Segurança HTTP.
- **express-session**: Sessão para OAuth.
- **cache-manager**: Cache para sessões temporárias.
- **uuid**: Geração de identificadores únicos.
- **axios, @nestjs/axios**: Requisições HTTP.
- **Jest, Supertest**: Testes unitários e e2e.
- **Docker, docker-compose**: Padronização de ambiente.

Essas bibliotecas foram escolhidas por serem padrão de mercado, seguras, bem documentadas e integradas ao ecossistema NestJS.

---

## Configurações

As configurações são feitas via arquivos `.env` e validadas por classes específicas. Exemplos de variáveis:

```env
# Ambiente
NODE_ENV=development
APP_NAME=conectar-api
APP_PORT=3000
API_PREFIX=api
APP_CORS_ORIGIN=http://localhost:3000,http://localhost:5170

# Banco de Dados
DATABASE_URL=postgres://postgres:postgres@localhost:5433/conectar-company

# JWT
JWT_SECRET=secret-key
JWT_TOKEN_EXPIRES_IN=1D
JWT_REFRESH_SECRET=secret_for_refresh
JWT_REFRESH_TOKEN_EXPIRES_IN=7D

# OAuth Google
GOOGLE_ID=...
GOOGLE_SECRET=...
GOOGLE_CALLBACK_URL=...

# Autenticação
AUTH_SALTS=12
AUTH_INACTIVE_DAYS=30
AUTH_MAX_LOGIN_ATTEMPTS=5
AUTH_LOCKOUT_DURATION=900000
```

Veja exemplos completos em [.env](.env) e [.env.docker](.env.docker).

---

## Como clonar e instalar

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/ErickMarllon/conectar-api.git
cd conectar-company/conectar-api
yarn install
```

Se necessário, copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

Depois, siga os passos da seção [Como rodar o projeto](#como-rodar-o-projeto) para iniciar a aplicação.

## Como rodar o projeto

### Local

```bash
yarn install
cp .env.example .env # ou ajuste o .env conforme necessário
yarn start:dev
```

### Docker

```bash
docker compose up --build
```

Acesse a API em [http://localhost:3000](http://localhost:3000).

---

## Testes

- **Unitários:**  
  `yarn test`
- **Cobertura:**  
  `yarn test:cov`
- **E2E:**  
  `yarn test:e2e`

---

## Swagger

A documentação interativa está disponível em:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Docker

O projeto já possui `Dockerfile` e `docker-compose.yml` para rodar a API, banco e pgAdmin facilmente.

---

## Licença

MIT © Erick Marllon
