import { Request, Response } from "express";
import cursoModel from "../models/cursos.model";
import usuarioModel from "../models/usuario.model";
class CursoController {

    static async createCurso(req: Request, res: Response): Promise<void> {
        const usuario = await usuarioModel.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
        const { nombre, cantEstudiantes, facultad } = req.body;
        const newCurso = new cursoModel({ nombre, cantEstudiantes, facultad });
        await newCurso.save();
        res.json({
            status: res.status,
            message: 'Curso Creado'
        });
    }

    static async getCursos(req: Request, res: Response): Promise<void> {
        const usuario = await usuarioModel.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
        const allCursos = await cursoModel.find();;
        res.json({
            status: 200,
            asignaturas: allCursos
        });
    }

    static async getCursoById(req: Request, res: Response): Promise<void> {
        const usuario = await usuarioModel.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
        const { id } = req.params;
        const curso = await cursoModel.findById(id);
        res.json({
            status: 200,
            asignaturas: curso
        });
    }

    static async updateCurso(req: Request, res: Response): Promise<void> {
        const usuario = await usuarioModel.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
        const { id } = req.params;
        await cursoModel.findByIdAndUpdate(id, req.body)
        res.json({
            status: 200,
            message: 'Curso actualizado'
        });
    }

    static async deleteCurso(req: Request, res: Response): Promise<void> {
        const usuario = await usuarioModel.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
        const { id } = req.params;
        await cursoModel.findByIdAndRemove(id, req.body)
        res.json({
            status: 200,
            message: 'Curso Eliminado'
        });
    }
}

export default CursoController;