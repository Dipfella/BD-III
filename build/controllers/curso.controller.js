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
const cursos_model_1 = __importDefault(require("../models/cursos.model"));
class CursoController {
    static createCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, cantEstudiantes, facultad } = req.body;
            const newCurso = new cursos_model_1.default({ nombre, cantEstudiantes, facultad });
            yield newCurso.save();
            res.json({
                status: res.status,
                message: 'Curso Creado'
            });
        });
    }
    static getCursos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allCursos = yield cursos_model_1.default.find();
            ;
            res.json({
                status: 200,
                asignaturas: allCursos
            });
        });
    }
    static getCursoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const curso = yield cursos_model_1.default.findById(id);
            res.json({
                status: 200,
                asignaturas: curso
            });
        });
    }
    static updateCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield cursos_model_1.default.findByIdAndUpdate(id, req.body);
            res.json({
                status: 200,
                message: 'Curso actualizado'
            });
        });
    }
    static deleteCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield cursos_model_1.default.findByIdAndRemove(id, req.body);
            res.json({
                status: 200,
                message: 'Curso Eliminado'
            });
        });
    }
}
exports.default = CursoController;
