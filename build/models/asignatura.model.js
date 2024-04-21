"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchemaAsignatura = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    profesor: { type: String, required: true },
    jornada: { type: String, required: true },
    cursos: [{
            nombre: { type: String, required: true },
            cant_Estudiantes: { type: Number, required: true }
        }]
});
exports.default = (0, mongoose_1.model)('asignaturaModel', SchemaAsignatura);
