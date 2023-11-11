# FacingOff Real Time Chat Application

Welcome to FacingOff Chat App, a real-time messaging application that utilizes AWS S3 for file storage, AWS SES for password resets, and Socket.IO for real-time communication. The chat app can handle multi-picture and file uploads simultaneously. Additionally, it features an integration with ChatGPT for get responses inside the chat and save them as the chat messeges.
also there is files to build docker image with two containers one for database and one for the express app server , and action file to deploy the image to AWS EC2 instance as CICD methodology. 

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

This project is a [Node.js](https://nodejs.org/) application built with [Express](https://expressjs.com/), [TypeORM](https://typeorm.io/), and [Socket.IO](https://socket.io/). It serves as a backend for the application.

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
  
### Summary of all endpoints :   
### Auth Routes

#### `POST /register`
- Description: Register a new user.

#### `POST /login`
- Description: Log in a user.

#### `POST /logout`
- Description: Log out a user.

#### `POST /reset-password`
- Description: Request a password reset.

#### `POST /reset-password/:token`
- Description: Reset password with token.

#### `POST /request-password-reset`
- Description: Request password reset via email link.

#### `POST /verify`
- Description: Verify user credentials.

### Message Routes

#### `POST /send`
- Description: Send a message.

#### `POST /send-s3-save`
- Description: Send a message with S3 file save.

#### `GET /get`
- Description: Get messages.

#### `GET /sent`
- Description: Get sent messages.

#### `GET /received`
- Description: Get received messages.

#### `GET /search`
- Description: Search for messages.

#### `GET /say`
- Description: Get ChatGPT responses.

### Block/Mute Routes

#### `POST /mute`
- Description: Mute a user.

#### `POST /block`
- Description: Block a user.

#### `POST /unmute`
- Description: Unmute a user.

#### `POST /unblock`
- Description: Unblock a user.

#### `GET /initiated-mute-block`
- Description: Get initiated mute/block connections.

#### `GET /received-mute-block`
- Description: Get received mute/block connections.

### Connection Routes

#### `POST /send`
- Description: Send a connection request.

#### `POST /accept`
- Description: Accept a connection request.

#### `POST /reject`
- Description: Reject a connection request.

#### `POST /remove`
- Description: Remove a connection.

#### `GET /user-connections`
- Description: Get user connections.

#### `GET /search-connections`
- Description: Search for connections.

### Notification Routes

#### `POST /notify`
- Description: Send a notification.

#### `GET /get-notifications`
- Description: Get notifications.

### Chat Routes

#### `POST /create`
- Description: Create a chat room.

#### `GET /info`
- Description: Get chat room information.

### Order Routes

#### `POST /create`
- Description: Create an order.

#### `GET /info`
- Description: Get order information.

### Payment Routes

#### `POST /create`
- Description: Create a payment to be completed to allow sending link for product and make order and payment for it.

#### `GET /get-user-payment`
- Description: Get user payments.

### Product Routes

#### `POST /create`
- Description: Create a product.

#### `GET /all-products`
- Description: Get all products.

#### `GET /get-product`
- Description: Get product information.

### Files Routes

#### `GET /get-file`
- Description: Get a file.

#### `GET /get-s3-file`
- Description: Get an S3 file.

### User Routes

#### `POST /create-profile`
- Description: Create a user profile.

#### `GET /profile-by-id`
- Description: Get profile by ID.

#### `GET /profile-by-name`
- Description: Get profile by name.

#### `GET /search-users`
- Description: Search for users.



Refer to the source code or API documentation for detailed information on each endpoint.  
Here is the link for the documentaion :
#### [Full Routes Documentation Link](https://documenter.getpostman.com/view/11905199/2s9YRE1WjF)

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