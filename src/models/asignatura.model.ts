import { Schema, model } from "mongoose";

const SchemaAsignatura = new Schema({
    nombre: { type: String, required: true },
    profesor: { type: String, required: true },
    jornada: { type: String, required: true },
    cursos: [{
        nombre: {type: String, required: true},
        cant_Estudiantes: {type: Number, required: true}
    }]
});


export default model('asignaturaModel', SchemaAsignatura)