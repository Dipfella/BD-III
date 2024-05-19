"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchemaCurso = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    cantEstudiantes: { type: Number, required: true },
    facultad: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('cursoModel', SchemaCurso);
