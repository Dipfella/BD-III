import { Request, Response } from "express";
import asignaturaModel from "../models/asignatura.model";
import cursosModel from "../models/cursos.model";
import { mongoose } from "../config/mongodb";

class AsignaturaController {

    static async createAsignatura(req: Request, res: Response):Promise<void> {
        try {
            const { nombre, profesor, jornada, cursos } = req.body;
            
            // Buscar todos los cursos existentes en la base de datos
            const cursosExistentes = await cursosModel.find({}, '_id');
            const cursosExistentesIds = cursosExistentes.map((curso: { _id: { toString: () => any; }; }) => curso._id.toString());
            // Verificar si todos los cursos existen
            const cursosNoEncontrados: string[] = [];
            for (const cursoId of cursos) {
                if (!cursosExistentesIds.includes(cursoId)) {
                    cursosNoEncontrados.push(cursoId);
                }
            }
    
            if (cursosNoEncontrados.length > 0) {
                res.status(404).json({ error: `Los siguientes cursos no se encontraron: ${cursosNoEncontrados.join(', ')}` });
                return;
            }
            
            // Crear la nueva asignatura con los cursos asociados
            const nuevaAsignatura = new asignaturaModel({
                nombre,
                profesor,
                jornada,
                cursos
            });
            
            // Guardar la nueva asignatura en la base de datos
            await nuevaAsignatura.save();
            
            // Respuesta exitosa
            res.status(201).json({
                status: res.status,
                message: 'Asignatura creada exitosamente'
            });
        } catch (error) {
            console.error('Error al crear la asignatura:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async getAsignaturas(req: Request, res: Response):Promise<void> {
        const asignaturas = await asignaturaModel.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "cursomodels",
                        localField: "cursos",
                        foreignField: "_id",
                        as: "cursosAsignatura"
                    }
                },
                {
                    $unwind: "$cursosAsignatura"
                }
            ]
        )
        console.log(asignaturas);
        res.json({
            status: 200,
            asignaturas: asignaturas
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

    static async getAsignaturasByIdCurso(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        try {
            const asignaturas = await asignaturaModel.aggregate([
                {
                    $match: { "cursos": mongoose.Types.ObjectId(id) }
                }
            ]);
    
            if (asignaturas.length === 0) {
                res.status(404).json({ status: 404, message: "No se encontraron asignaturas para el curso especificado." });
                return;
            }
    
            res.json({ status: 200, asignaturas: asignaturas });
        } catch (error) {
            console.error("Error al buscar asignaturas por ID de curso:", error);
            res.status(500).json({ status: 500, message: "Error interno del servidor." });
        }
    }
    

    static async updateAsignatura(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre, profesor, jornada, cursos } = req.body;
    
            // Verificar si la asignatura existe
            const asignaturaExistente = await asignaturaModel.findById(id);
            if (!asignaturaExistente) {
                res.status(404).json({ error: 'La asignatura no se encontró' });
                return;
            }
    
            // Verificar si algunos de los cursos proporcionados no existen
            const cursosExistentes = await cursosModel.find({}, '_id');
            const cursosExistentesIds = cursosExistentes.map((curso: { _id: { toString: () => any; }; }) => curso._id.toString());
            const cursosNoEncontrados: string[] = [];
            for (const cursoId of cursos) {
                if (!cursosExistentesIds.includes(cursoId)) {
                    cursosNoEncontrados.push(cursoId);
                }
            }
            if (cursosNoEncontrados.length > 0) {
                res.status(404).json({ error: `Los siguientes cursos no se encontraron: ${cursosNoEncontrados.join(', ')}` });
                return;
            }
    
            // Actualizar la asignatura
            await asignaturaModel.findByIdAndUpdate(id, {
                nombre,
                profesor,
                jornada,
                cursos
            });
    
            // Respuesta exitosa
            res.status(200).json({
                status: res.status,
                message: 'Asignatura actualizada exitosamente'
            });
        } catch (error) {
            console.error('Error al actualizar la asignatura:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    

    static async deleteAsignatura(req: Request, res: Response):Promise<void> {
        const {id} = req.params;
        await asignaturaModel.findByIdAndRemove(id, req.body)
        res.json({
            status: 200,
            message: 'Asignatura Eliminada'
        });
    }
}

export default AsignaturaController;