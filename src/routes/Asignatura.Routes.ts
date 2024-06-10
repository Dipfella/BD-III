import { Router } from "express";
import AsignaturaController from "../controllers/asignatura.controller";
import { TokenValidation } from "../common/verifyToken";


class AsignaturaRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/', TokenValidation, AsignaturaController.createAsignatura);
        this.router.get('/', TokenValidation, AsignaturaController.getAsignaturas);
        this.router.get('/:id', TokenValidation, AsignaturaController.getAsignaturasById);
        this.router.get('/idCurso/:id', TokenValidation, AsignaturaController.getAsignaturasByIdCurso);
        this.router.put('/:id', TokenValidation, AsignaturaController.updateAsignatura);
        this.router.delete('/:id', TokenValidation, AsignaturaController.deleteAsignatura);
    }
}

const asignaturaRoutes = new AsignaturaRouter();

export default asignaturaRoutes.router;