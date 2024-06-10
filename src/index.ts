import { Server } from './server';
import "./config/mongodb";
import dotenv from "dotenv";
dotenv.config();

const server = new Server();
server.Start();