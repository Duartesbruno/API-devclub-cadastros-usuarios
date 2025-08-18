# API de Cadastro de Usuários
Este projeto é uma API REST feita em **Node.js + Express + Prisma** para cadastrar, listar, editar e excluir usuários.  
Criei com o objetivo de praticar integração com banco de dados, organização de código e boas práticas como uso de variáveis de ambiente e CORS.

## Funcionalidades
- **Criar usuário** (`POST /usuarios`): Recebe `{ nome, age, email }` e retorna o usuário criado;

- **Listar usuários** (`GET /usuarios`): Retorna uma lista de todos os usuários;

- **Atualizar usuário** (`PUT /usuarios/:id`): Atualiza um usuário pelo ID com dados fornecidos;

- **Deletar usuário** (`DELETE /usuarios/:id`): Remove um usuário pelo ID.

## Pré-requisitos
- Node.js;
- npm;
- Banco de dados (MongoDB usado no projeto);
- Opcional: Thunder Client (VS Code) ou Postman para testes.

## Configuração
1. Clone o repositório: `git clone <URL_DO_REPOSITORIO>`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` com base no `.env.example`:
- **Atenção**: Certifique-se de preencher `DATABASE_URL` corretamente, ou a conexão com o banco falhará!
- Para desenvolvimento local, configure `DATABASE_URL`.
- Exemplo de `.env` local:
    - `DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`

    - `LOCAL_ORIGIN` **só é necessário colocar se você alterou a porta padrão**

    - `PORT` **só é necessário colocar se você alterou a porta padrão**

4. Para deploy no Render, configure no painel:
- `DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`

- `PRODUCTION_ORIGIN=https://your-production-url.com`

- `PORT` **Não é necessário definir, pois ao usar `process.env.PORT` a porta é atribuída automaticamente pela configuração do servidor**

## Configuração para o arquivo **.env**
- **`DATABASE_URL`**: URL de conexão com o banco de dados (ex.: MongoDB). Necessária para o Prisma se conectar ao banco;

- **`LOCAL_ORIGIN`**: Origem permitida para requisições CORS no ambiente local;

- **`PRODUCTION_ORIGIN`**: Origem permitida para requisições CORS em produção;

- **`NODE_ENV`**: Define o ambiente da aplicação (`development` ou `production`). Opcional localmente (padrão: `development`); o Render define como `production` automaticamente;

- **`PORT`**: Porta do servidor. Opcional localmente (padrão: `3000`); o Render define `PORT` automaticamente em produção (ex.: `10000`).

## Executando Localmente
1. Configure o `.env`;
2. Inicie o servidor: `npm start`;
3. Teste com:
- Abra o front-end em `http://localhost:5173`(ou a porta configurada);
- Thunder Client (ex.: `GET http://localhost:3000/usuarios`) (caso tenha mudado a porta padrão altere);
- Opcionalmente, front-end em produção, se `PRODUCTION_ORIGIN` for definida.

## Deploy no Render
1. Crie um serviço Web no Render (Add new -> Web Service);
2. Configure as variáveis de ambiente `DATABASE_URL`, `PRODUCTION_ORIGIN` (em Environment);
3. Faça o Deploy o projeto.

## Estrutura do Projeto
- `generated/prisma/` — Cliente Prisma gerado automaticamente;
- `src/configs` — Configurações  globais como PrismaClient e CORS;
- `src/controllers/` — Lógica das requisições e manipulação de dados;
- `src/middlewares/` — Middlewares do servidor (validação de campos etc.);
- `src/routes/` — Definição das rotas da API;
- `src/app.js/` — Criação e configuração do Express App (middlewares, rotas e CORS);
- `src/server.ts` — Inicialização do servidor e verificação da porta;
- `.env.example` — Modelo para criação das variáveis de ambiente.
