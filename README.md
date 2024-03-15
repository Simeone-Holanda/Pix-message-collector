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
2 - Rename the .env.example file to .env and configure it

3 - To execute the project in development mode, follow these steps:

<pre>
  npm run dev
</pre>

## 🛠️Features
* Start a connection with a stream to receive messages.
* Stop an active stream connection.
* Obtain up to a maximum of 10 messages with the Accept header set to multipart/json per request.
* Obtain a message with the Accept header set to application/json per request.
* Application of the Long Polling concept using a maximum of 8 seconds to obtain messages.
* Limit of up to a maximum of 6 connections.
* Treatment to ensure that messages are not sent on more than one different channel.

<hr>
<div align="center">
  <small>Developed by Simeone Aquino de Holanda - Mar/2024
</small>
</div>