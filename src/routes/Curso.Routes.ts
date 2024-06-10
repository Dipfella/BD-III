import { Router } from "express";
import CursoController from "../controllers/curso.controller";
import { TokenValidation } from "../common/verifyToken";
class CursoRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/', TokenValidation, CursoController.createCurso);
        this.router.get('/', TokenValidation, CursoController.getCursos);
        this.router.get('/:id', TokenValidation, CursoController.getCursoById);
        this.router.put('/:id', TokenValidation, CursoController.updateCurso);
        this.router.delete('/:id', TokenValidation, CursoController.deleteCurso);
    }
}

const cursoRoutes = new CursoRouter();

export default cursoRoutes.router;