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

### 1 - Clone o repositório e entre na pasta da aplicação

```sh
git clone git@github.com:Ruan-Portella/MyJobs.git && cd MyJobs
```

### 2 - Configure as variáveis de ambiente

Altere o arquivo .env.example para .env na pasta client, server e preencha as variáveis de ambiente com as informações do seu banco de dados.
### 3 - Suba o container do banco de dados

Observação: caso prefira se conectar com uma instância local na sua máquina, rode o comando `npm install` nas pastas MyJobs/server, MyJobs/client e pule esta etapa.

```sh
docker-compose up -d
```

### 4 - Acesse o container de backend

Observação: caso prefira se conectar com uma instância local na sua máquina, pule esta etapa.

```sh
docker exec -it server_container bash
```
### 5 - Gere a tabela do banco de dados

Observação: caso prefira se conectar com uma instância local na sua máquina, rode o comando abaixo na pasta MyJobs/server e na pasta MyJobs/client rode o comando `npm run dev`.

```sh
npm run prestart
```


