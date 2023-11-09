# FacingOff Real Time Chat Application

Welcome to FacingOff Chat App, a real-time messaging application that utilizes AWS S3 for file storage, AWS SES for password resets, and Socket.IO for real-time communication. The chat app can handle multi-picture and file uploads simultaneously. Additionally, it features an integration with ChatGPT for get responses inside the chat and save them as the chat messeges .

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [WebSocket](#websocket)
- [FrontEnd](#a-FrontEnd-for-the-App)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

This project is a [Node.js](https://nodejs.org/) application built with [Express](https://expressjs.com/), [TypeORM](https://typeorm.io/), and [Socket.IO](https://socket.io/). It serves as a backend for your application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm or yarn installed
- Docker (optional, for running a database in a container)

## Installation

1. Clone the repository:

   ```
   cd yourfolder
   git clone https://github.com/obaidofj/RealTimeChat_App.git .
   ```

2. Install dependencies:  
run this in the same root folder in your terminal :  
```npm install ```
  
3. Set up environment variables:

Create a .env file in the root directory and configure the necessary environment variables. You can use .env.example as a template.

4. Starting the App/server:  
by runing this in terminal:
```npm run dev```
and by that also The migration to set up the database is run by itself on first time.


## Usage
Your server should now be running. You can test it by making requests to the defined endpoints.

## Endpoints
/auth: Authentication-related endpoints  
/user: User-related endpoints  
/chat: Chat group-related endpoints  
/messege: Message-related endpoints  
/blockmute: Block and mute user-related endpoints  
/notify: Notification-related endpoints  
/order: Order-related endpoints  
/payment: Payment-related endpoints  
/product: Product-related endpoints  
/connection: Connection and friendship-related endpoints  
  
Refer to the source code or API documentation for detailed information on each endpoint.  
Here is the link for the documentaion :
#### [Documentation Link](https://documenter.getpostman.com/view/11905199/2s9YRE1WjF)

## Authentication
The authentication middleware is applied globally, requiring valid authentication for most endpoints. Ensure you include the correct authentication token in your requests.

## WebSocket
WebSocket functionality is provided through Socket.IO. WebSocket events are handled by socketHandler.js. Refer to the source code or documentation for WebSocket-related functionality.

## A FrontEnd for the App
[FrontEnd Reapo Link](https://github.com/obaidofj/Socket_Simple_FrontBack)

## Contributing
Contributions are welcome! Please follow the: [contribution guidelines.](./CONTRIBUTING.md)

## License
This project is licensed under the MIT License.