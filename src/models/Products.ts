import { Schema } from "mongoose";

const SchemaProduct = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    fechaVencimiento: { type: Date, required: true },
    cantidad: { type: Number, required: true },
})