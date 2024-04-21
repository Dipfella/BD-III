import { Request, Response } from "express";
import asignaturaModel from "../models/asignatura.model";

class AsignaturaController {

    static async createAsignatura(req: Request, res: Response):Promise<void> {
        const { nombre, profesor, jornada, cursos } = req.body;
        const newAsignatura = new asignaturaModel({nombre, profesor, jornada, cursos});
        await newAsignatura.save();
        res.json({
            status: res.status,
            message: 'Asignatura Creada'
        });
    }

    static async getAsignaturas(req: Request, res: Response):Promise<void> {
        const allAsignaturas = await asignaturaModel.find();;
        res.json({
            status: 200,
            asignaturas: allAsignaturas
        });
    }

    static async getAsignaturasById(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
        const asignatura = await asignaturaModel.findById(id);
        res.json({
            status: 200,
            asignaturas: asignatura
        });
    }

    static async updateAsignatura(req: Request, res: Response):Promise<void> {
        const {id} = req.params;
        const asignatura = await asignaturaModel.findByIdAndUpdate(id, req.body)
        res.json({
            status: 200,
            asignatura: asignatura
        });
    }

    static async deleteAsignatura(req: Request, res: Response):Promise<void> {
        const {id} = req.params;
        const asignatura = await asignaturaModel.findByIdAndRemove(id, req.body)
        res.json({
            status: 200,
            asignatura: asignatura
        });
    }
}

export default AsignaturaController;