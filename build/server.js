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
const Curso_Routes_1 = __importDefault(require("./routes/Curso.Routes"));
const Auth_Routes_1 = __importDefault(require("./routes/Auth.Routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // mismo nombre de la clase
        this.config();
        this.routes();
    }
    config() {
        var _a;
        this.app.set("port", (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4300);
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
        this.app.use('/api/curso', Curso_Routes_1.default);
        this.app.use('/api/auth', Auth_Routes_1.default);
    }
    Start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server funcionando..." + this.app.get("port"));
        });
    }
}
exports.Server = Server;
