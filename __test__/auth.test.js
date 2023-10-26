//(example file: user.test.js)

import "../dist/config.js";
import express from "express";
import request from "supertest";
import userRouter from './routes/auth.routes.js'
import connection from './db/connection.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use(express.urlencoded({ extended: false }));


beforeAll(async () => {
  await connection.initialize().then(() => {
        console.log('DB connected');
    }).catch(err => {
        console.log("DB connection failed", err);
    });
});

afterAll(async () => {
  await connection.destroy();
});

describe("Login process", () => {
  it("should login with valid credentials", async () => {
    const user = {
      email: "user2@email.com",
      password: "123456",
    };

    const response = await  request(app).post("/users/login").send(user);

    expect(response.status).toBe(200);
  });
});