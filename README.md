<p align="center">
  <a href="#" target="blank"><img src="https://files.klob.id/public/mco01/kf6lywgs/ITMI.png" width="120" alt="ITMI Logo" /></a>
</p>

## Description

Boilerplate NestJS Microservices with Kafka with DDD Pattern.

## Installation

```bash
$ npm install
```

## Requirement

- Docker Apps - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

# Configure DB Connection
open file (src/utils/global.utils) 
- set like your current configuration local machine

# Configure Kafka Connection
open file (microservice.config.util.ts)
- change kafka client name like name of the service
- change client id like name of the service
- change brokers host like your current machine host kafka
- change consumer group id like name of the service

## Running the app

```bash


# development
$ npm run start

# watch mode (developer)
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).