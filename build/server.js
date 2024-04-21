"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const Asignatura_Routes_1 = __importDefault(require("./routes/Asignatura.Routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // mismo nombre de la clase
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 4300);
        //Middlewares
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.get("/api", (req, res) => res.send("Hola Mundo"));
        this.app.use('/api/asignatura', Asignatura_Routes_1.default);
        //todas las operaciones basicas
    }
    Start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server funcionando..." + this.app.get("port"));
        });
    }
}
exports.Server = Server;
