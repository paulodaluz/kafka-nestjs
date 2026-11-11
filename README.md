# Kafka com NestJS

Exercício com um produtor HTTP e um consumidor NestJS para demonstrar troca de mensagens pelo Apache Kafka. A API recebe um texto, publica no tópico `paulo-user` e o consumidor registra a mensagem no console. O repositório inclui Compose para Kafka e ZooKeeper.

[![NestJS](https://img.shields.io/badge/NestJS-8.0.0-E0234E?logo=nestjs)](https://docs.nestjs.com/) [![KafkaJS](https://img.shields.io/badge/KafkaJS-1.16.0-231F20)](https://kafka.js.org/) [![Licença](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 📋 Table of contents

- [✨ Features](#features)
- [🧪 Technologies](#technologies)
- [🛠️ Environment setup](#environment-setup)
- [🚀 Getting started](#getting-started)
- [🐋 Getting started with Docker](#docker)
- [🔌 API usage](#api-usage)
- [🗂️ Project structure](#project-structure)
- [✅ Testing and quality](#testing-and-quality)
- [🔎 Troubleshooting](#troubleshooting)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

<a id="features"></a>

## ✨ Features

- `POST /producer/v1/send-message` recebe um campo `message` do tipo string.
- Publicação pelo KafkaJS no tópico `paulo-user`.
- Consumo pelo transporte Kafka do NestJS e registro no console.
- Configuração de desenvolvimento com volumes persistentes para Kafka e ZooKeeper.

Não há autenticação HTTP, banco de aplicação ou interface web. O consumidor conecta-se ao broker; ele não abre um servidor HTTP na porta 9092.

<a id="technologies"></a>

## 🧪 Technologies

| Tecnologia | Versão declarada | Uso |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | `16.13.2` indicada no README histórico | Runtime escolhido para reprodução; não há `engines` |
| [NestJS](https://docs.nestjs.com/) | `8.0.0` | API e módulos |
| [NestJS Microservices](https://docs.nestjs.com/microservices/kafka) | `8.4.3` no consumidor | Consumo Kafka |
| [TypeScript](https://www.typescriptlang.org/docs/) | `4.3.5` | Compilação |
| [KafkaJS](https://kafka.js.org/docs/getting-started) | `1.16.0` | Produção de mensagens |
| [Kafka](https://kafka.apache.org/documentation/) | imagem `bitnami/kafka:3.1` | Broker no Compose |
| [ZooKeeper](https://zookeeper.apache.org/doc/current/) | imagem `bitnami/zookeeper:3.8` | Coordenação do broker no Compose |

Não há lockfiles. As tags de imagens descrevem a configuração versionada; disponibilidade e execução dessas imagens não foram verificadas.

<a id="environment-setup"></a>

## 🛠️ Environment setup

Requer Git, Node.js/npm e um broker Kafka acessível em `localhost:9092`. A versão 16.13.2 do Node foi escolhida a partir do README histórico e de NestJS 8/TypeScript 4.3.5; não é uma restrição declarada em `engines`. Atualizações ficam para trabalho separado.

```bash
nvm install 16.13.2
nvm use 16.13.2
git clone https://github.com/paulodaluz/kafka-nestjs.git
cd kafka-nestjs
cd producer
npm install
cd ../consumer
npm install
cd ..
```

A raiz não tem manifesto. Instale os dois componentes separadamente usando npm, conforme os scripts. Sem lockfile, use `npm install`, não `npm ci`. Não há Husky, hooks ou `prepare`.

Broker (`localhost:9092`), client ID (`chat-of-messages`), tópico (`paulo-user`) e porta HTTP (`3000`) estão fixos no código. Não há carregamento de `.env` ou overrides por variáveis de ambiente. A disponibilidade/criação do tópico depende da configuração do broker utilizado.

<a id="getting-started"></a>

## 🚀 Getting started

Com Kafka já disponível, abra dois terminais a partir da raiz:

```bash
# Terminal 1
cd consumer
npm run start:dev
```

```bash
# Terminal 2
cd producer
npm run start:dev
```

O produtor escuta em `http://localhost:3000/producer/v1`; o consumidor fica conectado ao broker e imprime as mensagens. Não existe endpoint de saúde. Encerre ambos com Ctrl+C.

Para executar a saída compilada, em cada componente:

```bash
npm run build
npm run start:prod
```

`prebuild` remove `dist/` antes da compilação. O produtor pode iniciar seu HTTP sem broker, mas a publicação só funciona após conexão ao Kafka.

<a id="docker"></a>

## 🐋 Getting started with Docker

O `docker-compose.yml` fornece apenas a infraestrutura; produtor e consumidor continuam executados no host. Os comandos a seguir resultam da inspeção e **não foram validados por execução nesta tarefa**.

```bash
# Na raiz do repositório
docker compose up -d
docker compose logs -f kafka
```

| Serviço | Imagem | Porta publicada | Volume/configuração |
| --- | --- | --- | --- |
| `zookeeper` | `docker.io/bitnami/zookeeper:3.8` | `2181:2181` | `zookeeper_data:/bitnami`, `ALLOW_ANONYMOUS_LOGIN=yes` |
| `kafka` | `docker.io/bitnami/kafka:3.1` | `9092:9092` | `kafka_data:/bitnami`, conexão `zookeeper:2181`, listener plaintext habilitado |

O Kafka depende do serviço ZooKeeper e usa `hostname: localhost`. Não há contexto de build, Dockerfile ou variáveis substituídas de um `.env`. A configuração é demonstrativa, sem autenticação nos serviços. Verifique a compatibilidade das imagens e o endereço anunciado pelo broker no seu ambiente.

```bash
docker compose stop
```

Esse comando para os containers preservando os volumes. Não houve instalação nem execução de Docker na validação.

<a id="api-usage"></a>

## 🔌 API usage

Depois de subir os componentes e o broker, envie uma mensagem fictícia:

```bash
curl -X POST http://localhost:3000/producer/v1/send-message   -H 'Content-Type: application/json'   -d '{"message":"Mensagem fictícia de validação"}'
```

A rota não exige token. O DTO exige que `message` seja string. A operação conecta o produtor, publica no tópico `paulo-user` e desconecta; a resposta não contém objeto de retorno (status padrão 201 do NestJS). A confirmação funcional exige observar o recebimento no console do consumidor, além da resposta HTTP.

<a id="project-structure"></a>

## 🗂️ Project structure

| Caminho | Responsabilidade |
| --- | --- |
| `producer/src/main.ts` | HTTP na porta 3000 e prefixo `producer/v1` |
| `producer/src/controllers/` | Endpoint de publicação |
| `producer/src/services/` | Cliente KafkaJS, conexão e envio |
| `producer/src/validators/` | DTO de entrada |
| `consumer/src/main.ts` | Microserviço conectado ao broker |
| `consumer/src/controllers/` | Assinatura de `paulo-user` |
| `consumer/src/services/` | Registro da mensagem |
| `docker-compose.yml` | Kafka, ZooKeeper e volumes |

<a id="testing-and-quality"></a>

## ✅ Testing and quality

Em `producer/` ou `consumer/`:

| Comando | Finalidade |
| --- | --- |
| `npm run build` | Compilação TypeScript |
| `npm test -- --runInBand` | Jest; não há arquivos de teste versionados |
| `npm run test:watch` / `npm run test:cov` | Observação / cobertura, quando houver testes |
| `npm run lint` | ESLint com correções automáticas |
| `npm run format` | Prettier com escrita |
| `npm run start:debug` / `npm run test:debug` | Depuração |

`test:e2e` aponta para `test/jest-e2e.json`, ausente nos dois componentes.

Validação com **Node.js 16.13.2 e npm 8.1.2**: instalação concluída nos dois componentes. Ambos os builds retornaram erro em declarações atuais de `@types/babel__traverse`, incompatíveis com TypeScript 4.3.5. Ambos os comandos Jest retornaram “No tests found”. Mesmo com o build sem sucesso, o JavaScript emitido do produtor permitiu iniciar `npm run start:prod` na porta padrão 3000; um POST com `{}` retornou 400 e confirmou a validação HTTP, sem publicar no Kafka. O consumidor falhou ao iniciar com `isNumber is not a function` na integração NestJS Microservices. Todos os processos iniciados foram encerrados. Esse teste parcial não representa um build aprovado nem comprova comunicação Kafka.

A comunicação produtor→broker→consumidor não foi validada porque não havia Kafka instalado e a instalação de infraestrutura não fazia parte do escopo. A captura real do VS Code também ficou pendente pela indisponibilidade do editor atual do usuário.

<a id="troubleshooting"></a>

## 🔎 Troubleshooting

| Situação | Verificação |
| --- | --- |
| Build falha em `@types/babel__traverse` | As declarações transitivas atuais usam sintaxe incompatível com TypeScript 4.3.5; dependências não foram alteradas. |
| Consumidor falha com `isNumber is not a function` | Revisar compatibilidade de `@nestjs/common` 8.0.0 com `@nestjs/microservices` 8.4.3; correção pendente. |
| Conexão recusada em 9092 | Kafka precisa estar disponível em `localhost:9092`; não basta iniciar os processos Node. |
| HTTP responde, mas mensagem não aparece | Confira tópico `paulo-user`, conexão do consumidor e endereço anunciado pelo broker. |
| Porta HTTP ocupada | O produtor usa `3000` fixo; `PORT` não altera a configuração atual. |
| Erro no Compose ou download de imagem | A disponibilidade das tags históricas não foi validada; revise a infraestrutura em tarefa separada. |
| Jest não encontra testes | Existem scripts, mas nenhuma suíte versionada. |

<a id="contributing"></a>

## 🤝 Contributing

Crie uma branch a partir de `main`, mantenha as instruções consistentes com o código e abra um pull request descrevendo a alteração e suas verificações. Não versione credenciais, arquivos de ambiente privados, dependências instaladas ou artefatos de execução. Execute o build nos dois componentes e valide a comunicação em um broker de testes antes de alterar os contratos de mensagens.

<a id="license"></a>

## 📜 License

Este projeto utiliza a [licença MIT](LICENSE), atribuída a Paulo da Luz em 2022. O arquivo e os avisos existentes foram preservados.

---

<p align="center">Made with 💜 by <a href="https://github.com/paulodaluz">Paulo da Luz</a></p>
