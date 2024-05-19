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
class AsignaturaController {
    static createAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
            const allAsignaturas = yield asignatura_model_1.default.find();
            ;
            res.json({
                status: 200,
                asignaturas: allAsignaturas
            });
        });
    }
    static getAsignaturasById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const asignatura = yield asignatura_model_1.default.findById(id);
            res.json({
                status: 200,
                asignaturas: asignatura
            });
        });
    }
    static updateAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield asignatura_model_1.default.findByIdAndUpdate(id, req.body);
            res.json({
                status: 200,
                message: 'Asignatura actualizada'
            });
        });
    }
    static deleteAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
