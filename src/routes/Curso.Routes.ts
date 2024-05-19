import { Router } from "express";
import CursoController from "../controllers/curso.controller";

class CursoRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/', CursoController.createCurso);
        this.router.get('/', CursoController.getCursos);
        this.router.get('/:id', CursoController.getCursoById);
        this.router.put('/:id', CursoController.updateCurso);
        this.router.delete('/:id', CursoController.deleteCurso);
    }
}

const cursoRoutes = new CursoRouter();

export default cursoRoutes.router;