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
class AsignaturaController {
    constructor() {
    }
    static createAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, profesor, jornada } = req.body;
            let cursos = [];
            cursos = req.body.cursos;
            const newAsignatura = new asignatura_model_1.default({ nombre, profesor, jornada, cursos });
            yield newAsignatura.save();
            res.json({
                status: res.status,
                message: 'Asignatura Creada'
            });
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
            const asignatura = yield asignatura_model_1.default.findByIdAndUpdate(id, req.body);
            res.json({
                status: 200,
                asignatura: asignatura
            });
        });
    }
    static deleteAsignatura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const asignatura = yield asignatura_model_1.default.findByIdAndRemove(id, req.body);
            res.json({
                status: 200,
                asignatura: asignatura
            });
        });
    }
}
exports.default = AsignaturaController;
