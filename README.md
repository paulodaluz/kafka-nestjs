# kafka-nestjs
Two Simple Micro Services in NestJS Communicating Over Kafka.

## 🚧 Objetivo do Projeto
Este repositório foi desenvolvido com o objetivo de aprender, botar em prática e também compartilhar conceitos/conhecimento envolvendo o Kafka e NestJS.

## 🧪 Tecnologias
As principais tecnologias utilizadas foram:
- [NodeJS](https://nodejs.org/en/)
- [NestJS](https://docs.nestjs.com/)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Kafka](https://kafka.apache.org/)


## 🛠️ Configurando o ambiente
 - Use a versão 16.13.2 do nodeJS
 - Clone o repositório
 - Instale as dependências com `npm install` ou `yarn install`


## 🚀 Getting started
Para startar o projeto você pode digitar o comando `npm run start:dev` ou `yarn start:dev` no diretório do projeto(do producer e do consumer).

Após isso ele irá startar o projeto na porta 3000(no caso do producer) e o consumer irá monitorar a porta 9092 no seu localhost.

Para efetuar a comunicação entre o producer e o consumer você deverá importar o seguinte curl no Postman:
 
``` bash
curl --location --request POST 'localhost:3000/producer/v1/send-message' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "Está mensagem deve aparecer no consumer"
}'
```

Após executar o curl acima, você irá notar no console do consumer, que será exibida a mensagem acima enviada ao producer.

## 📜 Licença
Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/paulodaluz/kafka-nestjs/blob/main/LICENSE) para mais detalhes.

---

<p align="center">Made with 💜 by Paulo da Luz</p>
