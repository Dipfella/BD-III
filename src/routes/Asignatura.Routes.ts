import { Router } from "express";
import AsignaturaController from "../controllers/asignatura.controller";

class AsignaturaRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/', AsignaturaController.createAsignatura);
        this.router.get('/', AsignaturaController.getAsignaturas);
        this.router.get('/:id', AsignaturaController.getAsignaturasById);
        this.router.put('/:id', AsignaturaController.updateAsignatura);
        this.router.delete('/:id', AsignaturaController.deleteAsignatura);
    }
}

const asignaturaRoutes = new AsignaturaRouter();

export default asignaturaRoutes.router;