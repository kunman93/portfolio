# Portfolio

A portfolio project which was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

# Run app inside a docker container

## Requirements

### Docker

Docker is an open platform for developing, shipping, and running applications. The instructions to install Docker is provided [here](https://docs.docker.com/get-docker/).

### Docker Compose

Docker Compose is a tool for defining and running multi-container applications. The instructions to install Docker Compose is provided [here](https://docs.docker.com/compose/install/).

### Instructions

In the root directory of the project, open a terminal and run the following command:
```
docker compose up --detach
```

Open a web browser and go to [http://localhost:3000](http://localhost:3000) to access the running game application.

# Some important commands during development

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

- Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `npm run test-ci` to execute the unit tests via [Karma](https://karma-runner.github.io) in headless mode.

## Running end-to-end tests

- Run `npm run e2e-test` to execute the end-to-end tests via [Cypress](https://www.cypress.io/). 
- Run `npm run e2e-test-ci` to execute all end-to-end tests via [Cypress](https://www.cypress.io/) in headless mode. 
