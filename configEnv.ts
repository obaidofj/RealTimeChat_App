// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env'
});  