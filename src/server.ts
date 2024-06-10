import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

import AsignaturaRoutes from "./routes/Asignatura.Routes";
import CursoRoutes from "./routes/Curso.Routes";
import AuthRouter from "./routes/Auth.Routes";
class Server {
  public app: express.Application;

  constructor() {
    this.app = express(); // mismo nombre de la clase
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", process.env.PORT ?? 4300);
    //Middlewares
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.get("/api", (req, res) => res.send("Hola Mundo"));
    this.app.use('/api/asignatura', AsignaturaRoutes)
    this.app.use('/api/curso', CursoRoutes)
    this.app.use('/api/auth', AuthRouter)
  }

  public Start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("server funcionando..." + this.app.get("port"));
    });
  }
}

export { Server };
