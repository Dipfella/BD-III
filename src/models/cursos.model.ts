import { Schema, model } from "mongoose";

const SchemaCurso = new Schema({
    nombre: { type: String, required: true },
    cantEstudiantes: { type: Number, required: true },
    facultad: { type: String, required: true },
});


export default model('cursoModel', SchemaCurso)