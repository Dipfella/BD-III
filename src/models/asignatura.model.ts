import { Schema, model } from "mongoose";

const SchemaAsignatura = new Schema({
    nombre: { type: String, required: true },
    profesor: { type: String, required: true },
    jornada: { type: String, required: true },
    cursos: [{ ref: "cursoModel", type: Schema.Types.ObjectId, required: true }]
});


export default model('asignaturaModel', SchemaAsignatura)