"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
require("./config/mongodb");
const server = new server_1.Server();
server.Start();
