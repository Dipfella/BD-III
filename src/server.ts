import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors'


class Server {
    public app: express.Application;

    constructor() {
        this.app = express(); // mismo nombre de la clase
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT || 4300);
        //Middlewares
        this.app.use(morgan("dev"));
        this.app.use(helmet())
        this.app.use(compression());
        this.app.use(cors());
    }

    routes () {
        this.app.get("/api",(req,res) => res.send('Hola Mundo'));
    }

    public Start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server funcionando...' + this.app.get('port'))
        });
    }
}

export { Server };