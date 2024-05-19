"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const curso_controller_1 = __importDefault(require("../controllers/curso.controller"));
class CursoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', curso_controller_1.default.createCurso);
        this.router.get('/', curso_controller_1.default.getCursos);
        this.router.get('/:id', curso_controller_1.default.getCursoById);
        this.router.put('/:id', curso_controller_1.default.updateCurso);
        this.router.delete('/:id', curso_controller_1.default.deleteCurso);
    }
}
const cursoRoutes = new CursoRouter();
exports.default = cursoRoutes.router;
