"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asignatura_model_1 = __importDefault(require("../models/asignatura.model"));
const cursos_model_1 = __importDefault(require("../models/cursos.model"));
const mongodb_1 = require("../config/mongodb");
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
class AsignaturaController {
    static createAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield usuario_model_1.default.findById(req.userId);
                if (!usuario) {
                    res.status(404).json('Usuario no encontrado');
                    return;
                }
                const { nombre, profesor, jornada, cursos } = req.body;
                // Buscar todos los cursos existentes en la base de datos
                const cursosExistentes = yield cursos_model_1.default.find({}, '_id');
                const cursosExistentesIds = cursosExistentes.map((curso) => curso._id.toString());
                // Verificar si todos los cursos existen
                const cursosNoEncontrados = [];
                for (const cursoId of cursos) {
                    if (!cursosExistentesIds.includes(cursoId)) {
                        cursosNoEncontrados.push(cursoId);
                    }
                }
                if (cursosNoEncontrados.length > 0) {
                    res.status(404).json({ error: `Los siguientes cursos no se encontraron: ${cursosNoEncontrados.join(', ')}` });
                    return;
                }
                // Crear la nueva asignatura con los cursos asociados
                const nuevaAsignatura = new asignatura_model_1.default({
                    nombre,
                    profesor,
                    jornada,
                    cursos
                });
                // Guardar la nueva asignatura en la base de datos
                yield nuevaAsignatura.save();
                // Respuesta exitosa
                res.status(201).json({
                    status: res.status,
                    message: 'Asignatura creada exitosamente'
                });
            }
            catch (error) {
                console.error('Error al crear la asignatura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    static getAsignaturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_model_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const asignaturas = yield asignatura_model_1.default.aggregate([
                {
                    $lookup: {
                        from: "cursomodels",
                        localField: "cursos",
                        foreignField: "_id",
                        as: "cursosAsignatura"
                    }
                },
                {
                    $unwind: "$cursosAsignatura"
                }
            ]);
            console.log(asignaturas);
            res.json({
                status: 200,
                asignaturas: asignaturas
            });
        });
    }
    static getAsignaturasById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_model_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            const asignatura = yield asignatura_model_1.default.findById(id);
            res.json({
                status: 200,
                asignaturas: asignatura
            });
        });
    }
    static getAsignaturasByIdCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_model_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            try {
                const asignaturas = yield asignatura_model_1.default.aggregate([
                    {
                        $match: { "cursos": mongodb_1.mongoose.Types.ObjectId(id) }
                    }
                ]);
                if (asignaturas.length === 0) {
                    res.status(404).json({ status: 404, message: "No se encontraron asignaturas para el curso especificado." });
                    return;
                }
                res.json({ status: 200, asignaturas: asignaturas });
            }
            catch (error) {
                console.error("Error al buscar asignaturas por ID de curso:", error);
                res.status(500).json({ status: 500, message: "Error interno del servidor." });
            }
        });
    }
    static updateAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield usuario_model_1.default.findById(req.userId);
                if (!usuario) {
                    res.status(404).json('Usuario no encontrado');
                    return;
                }
                const { id } = req.params;
                const { nombre, profesor, jornada, cursos } = req.body;
                // Verificar si la asignatura existe
                const asignaturaExistente = yield asignatura_model_1.default.findById(id);
                if (!asignaturaExistente) {
                    res.status(404).json({ error: 'La asignatura no se encontró' });
                    return;
                }
                // Verificar si algunos de los cursos proporcionados no existen
                const cursosExistentes = yield cursos_model_1.default.find({}, '_id');
                const cursosExistentesIds = cursosExistentes.map((curso) => curso._id.toString());
                const cursosNoEncontrados = [];
                for (const cursoId of cursos) {
                    if (!cursosExistentesIds.includes(cursoId)) {
                        cursosNoEncontrados.push(cursoId);
                    }
                }
                if (cursosNoEncontrados.length > 0) {
                    res.status(404).json({ error: `Los siguientes cursos no se encontraron: ${cursosNoEncontrados.join(', ')}` });
                    return;
                }
                // Actualizar la asignatura
                yield asignatura_model_1.default.findByIdAndUpdate(id, {
                    nombre,
                    profesor,
                    jornada,
                    cursos
                });
                // Respuesta exitosa
                res.status(200).json({
                    status: res.status,
                    message: 'Asignatura actualizada exitosamente'
                });
            }
            catch (error) {
                console.error('Error al actualizar la asignatura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    static deleteAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_model_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            yield asignatura_model_1.default.findByIdAndRemove(id, req.body);
            res.json({
                status: 200,
                message: 'Asignatura Eliminada'
            });
        });
    }
}
exports.default = AsignaturaController;
