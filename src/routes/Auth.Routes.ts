import { Router } from "express";
import AutenticacionController from "../controllers/auth.controller";

class AuthRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/signUp', AutenticacionController.signUp);
        this.router.post('/signIn', AutenticacionController.signIn);
    }
}

const authRoutes = new AuthRouter();

export default authRoutes.router;