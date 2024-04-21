"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const _URL = "mongodb+srv://julianDB:Js12345@dbiii.z1yfgko.mongodb.net/?retryWrites=true&w=majority&appName=DBIII";
mongoose_1.default.connect(_URL)
    .then(db => console.log('Db Conectada'))
    .catch(err => console.error(err));
