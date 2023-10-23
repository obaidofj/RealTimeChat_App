var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { plainToClass } from "class-transformer";
import express from "express";
import { Inject, Service } from "typedi";
import { DataSource } from "typeorm";
import { User } from "./User.js";
let UsersController = class UsersController {
    constructor(db) {
        this.db = db;
        this.router = express.Router();
        this.repository = this.db.getRepository(User);
        this.router.get("/", this.findAll.bind(this));
        this.router.post("/", this.createUser.bind(this));
    }
    async findAll(req, res) {
        const users = await this.repository.find();
        res.json(users);
    }
    async createUser(req, res) {
        const newUser = plainToClass(User, req.body);
        const result = await this.repository.save(newUser);
        res.json(result);
    }
};
UsersController = __decorate([
    Service(),
    __param(0, Inject("DATASOURCE")),
    __metadata("design:paramtypes", [DataSource])
], UsersController);
export default UsersController;
//# sourceMappingURL=controller.js.map