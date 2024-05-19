"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchemaAsignatura = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    profesor: { type: String, required: true },
    jornada: { type: String, required: true },
    cursos: [{ ref: "cursoModel", type: mongoose_1.Schema.Types.ObjectId, required: true }]
});
exports.default = (0, mongoose_1.model)('asignaturaModel', SchemaAsignatura);
