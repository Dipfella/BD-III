"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asignatura_controller_1 = __importDefault(require("../controllers/asignatura.controller"));
class AsignaturaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', asignatura_controller_1.default.createAsignatura);
        this.router.get('/', asignatura_controller_1.default.getAsignaturas);
        this.router.get('/:id', asignatura_controller_1.default.getAsignaturasById);
        this.router.get('/idCurso/:id', asignatura_controller_1.default.getAsignaturasByIdCurso);
        this.router.put('/:id', asignatura_controller_1.default.updateAsignatura);
        this.router.delete('/:id', asignatura_controller_1.default.deleteAsignatura);
    }
}
const asignaturaRoutes = new AsignaturaRouter();
exports.default = asignaturaRoutes.router;
