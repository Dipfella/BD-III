"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchemaProduct = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    fechaVencimiento: { type: Date, required: true },
    cantidad: { type: Number, required: true },
});
