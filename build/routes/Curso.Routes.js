"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const curso_controller_1 = __importDefault(require("../controllers/curso.controller"));
const verifyToken_1 = require("../common/verifyToken");
class CursoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', verifyToken_1.TokenValidation, curso_controller_1.default.createCurso);
        this.router.get('/', verifyToken_1.TokenValidation, curso_controller_1.default.getCursos);
        this.router.get('/:id', verifyToken_1.TokenValidation, curso_controller_1.default.getCursoById);
        this.router.put('/:id', verifyToken_1.TokenValidation, curso_controller_1.default.updateCurso);
        this.router.delete('/:id', verifyToken_1.TokenValidation, curso_controller_1.default.deleteCurso);
    }
}
const cursoRoutes = new CursoRouter();
exports.default = cursoRoutes.router;
