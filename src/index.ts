import { Server } from './server';
import "./config/mongodb";

const server = new Server();
server.Start();