Este é um projeto para aprendizagem desenvolvido por mim [Ruan Portella](https://github.com/Ruan-Portella).

Desenvolvi uma aplicação full Stack para você cadastrar suas candidaturas.
## Ferramentas :wrench:

- Next.js
- Bootstrap
- TypeScript
- JavaScript
- JSON Web Tokens
- Bcrypt
- Docker
## Recursos :sparkles:

- Criação de usuário e login
- Criação de candidaturas
- Deleção de candidaturas
- Edição de candidaturas

## Metodologias e Design Patterns :pencil2:

- Arquitetura em camadas
- Princípios de SOLID
## Como executar a aplicação :computer:

Para executar a aplicação, você precisará ter instalada em sua máquina as seguintes ferramentas:

- Node.js ou Docker
- MySQL 

<details>
<summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>

## 👉 Com Docker


### 1 - Clone o repositório e entre na pasta da aplicação

```sh
git clone git@github.com:Ruan-Portella/MyJobs.git && cd MyJobs
```

### 2 - Configure as variáveis de ambiente

`
 Altere o .env.example para .env na pasta client, server e preencha as variáveis de ambiente com as informações do seu banco de dados.
`

### 3 - Suba o container do banco de dados

```sh
docker-compose up -d
```

### 4 - Acesse o container de backend


```sh
docker exec -it server_container bash
```
### 5 - Gere a tabela do banco de dados

```sh
npm run prestart
```

### 6 - Acesse a aplicação

`
Pronto! Agora é só acessar o localhost:3000 e se divertir!
`
## 👉 Sem Docker

### 1 - Clone o repositório e entre na pasta da aplicação

```sh
git clone git@github.com:Ruan-Portella/MyJobs.git && cd MyJobs
```

### 2 - Configure as variáveis de ambiente

`
 Altere o .env.example para .env na pasta client, server e preencha as variáveis de ambiente com as informações do seu banco de dados.
`
### 3 - Instale as dependências

```sh
cd client && npm install && cd ../server && npm install && cd ..
```
### 4 - Suba a aplicação

```sh
cd client && npm run dev & cd ../server && npm run dev & cd ..
```
### 5 - Gere a tabela do banco de dados

```sh
cd server && npm run prestart
```
### 6 - Acesse a aplicação

`
Pronto! Agora é só acessar o localhost:3000 e se divertir!
`