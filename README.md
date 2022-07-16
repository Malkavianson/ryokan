# NEST API Ryokan

#### API em NEST para fins de aprendizagem

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

Este é o projeto do módulo quatro do curso de Desenvolvimento Full Stack da Blue Edtech.

Para esta aplicação foi desenvolvida uma API que administra dados de um restaurante ficticio

## Scripts disponíveis

Na pasta raíz do projeto podem ser executados os seguintes comandos:

## Clone o repositório:

```
$ gh repo clone Malkavianson/ryokan
```

## Instalando as dependências:

```
$ npm install
```

## Executando o projeto

### Produção

```
npm run start
```

### Desenvolvimento

```
npm run start:dev
```



Para conseguir trabalhar com o banco de dados você deverá criar um arquivo .env e adicionar uma url de conexão com seu Postgres local com a chave DATABASE_URL.

```
DATABASE_URL="postgresql://yourUser:0000000@localhost:PORT/database"
```


Acesse [http://localhost:3333](http://localhost:3333) para visualizá-lo em seu navegador de forma local

---

## Execução


## Funcionalidades

Para acessar a lista de endpoints e funcionalidades da aplicação, acesse nossa documentação do [Swagger](https://ryokan-production.up.railway.app), lá você poderá testar todas as rotas.

Você também pode analisar nosso <a href="./db.pdf" download>Diagrama de Relacionamento de Entidades</a>



> ## comandos úteis:
>
> > - nest g resource {nome} --no-spec
>
> > - npx prisma generate
> > - npx prisma db push
>
> ---

---
