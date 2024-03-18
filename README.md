# Pix-message-collector
## 📝 Description
* The pix message collector is based on the implementation of the Central Bank's SPI (Instant Payment System) Communication Interface to provide support for Pix.

## 💻 Technologies
* Node 
* Typescript
* Express
* Eslint
* Prettier

## ⚙️ Installation

This application is built to operate on [Node.js](https://nodejs.org/en) version 18.16 and utilizes NPM as its package manager.

1 - Clone the repository and install dependencies:
<pre>
  git clone https://github.com/Simeone-Holanda/Pix-message-collector.git
  cd Pix-message-collector
  npm install
</pre>
2 - Rename the .env.example file to .env and configure it <br><br>
3 - Development database configuration
<pre>
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
</pre>
4 - Test database configuration
<pre>
  npx sequelize-cli db:create --env test
  npx sequelize-cli db:migrate --env test
</pre>
5 - To execute the project in development mode, follow these steps:
<pre>
  npm run dev
</pre>
6 – Para executar o todos os testes de integração:
<pre>
  npm run test
</pre>

## 🛠️Features
* Start a connection with a stream to receive messages.
* Stop an active stream connection.
* Obtain up to a maximum of 10 messages with the Accept header set to multipart/json per request.
* Obtain a message with the Accept header set to application/json per request.
* Application of the Long Polling concept using a maximum of 8 seconds to obtain messages.
* Limit of up to a maximum of 6 connections.
* Treatment to ensure that messages are not sent on more than one different channel.

## 🔍Comments
* To make it simpler, I am removing the database whenever we start the application, given the limit of interactions that can be created, this way we also do not overload the database with messages that have already been sent in other executions.

## Development Flow

### 1 - Initial Planning:
   * Defined requirements and criteria.
   * Sketched basic architecture.

### 2 - API Development with Memory Database:
   * Created basic API with in-memory database.
   * Implemented essential functionalities.

### 3 - Architectural Refactoring:
   * Simplified and improved architecture.
   * Ensured compliance with established criteria.

### 4 - Implementation of the Long Polling Strategy:
   * Introduced Long Polling in the API for real-time updates.
   * Integrated Long Polling to required endpoints.

### 5 - Integration Tests:
   * Created and implemented tests to verify API functionality.
   * Ensured adequate coverage of scenarios.

### 6 - Database Implementation for Development and Test Environments:
   * Configured and integrated database for development and test environments.
   * Checked integration in suitable environments. 
<hr>
<div align="center">
  <small>Developed by Simeone Aquino de Holanda - Mar/2024
</small>
</div>