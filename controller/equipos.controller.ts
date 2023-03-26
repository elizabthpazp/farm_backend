import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { EquiposYmedios } from '../src/entity/EquiposYmedios'; 
    
 
export class EquiposController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getEquipos = async (req: Request, res: Response) => {
        const idFinca = req.query.idFinca; 
            return res.status(200).send(await AppDataSource.manager.find(EquiposYmedios, {where: { idFinca: idFinca }} ));
 
    }

    public addEquipos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const nombre = req.body.name;
            const idFinca = req.body.idFinca; 
            const parque = req.body.parque;
            const fecha = req.body.fecha; 
            const activos = req.body.activos;
            const incidencias = req.body.incidencias;
             

         
            if (await (await AppDataSource.manager.find(EquiposYmedios, { where: { name: nombre} })).length == 0) {
   
                        const user = new EquiposYmedios(); 
                        user.name = nombre; 
                        user.idFinca = idFinca; 
                        user.fecha = fecha;  
                        user.parque = parque;  
                        user.activos = activos;   
                        user.incidencias = incidencias;

                        await AppDataSource.manager.save(EquiposYmedios, user);
                        return res.status(200).send({ message: 'Equipo agregado correctamente' });
   
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' });
 
    }

    public deleteEquipos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(EquiposYmedios, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(EquiposYmedios, delet) });
 
    }

    public updateEquipos = async (req: Request, res: Response) => {
 
        const body = req.body; 
        const nombre = body.name; 
        const idFinca = req.body.idFinca; 
        const parque = req.body.parque; 
        const fecha = req.body.fecha;
        const activos = req.body.activos;
        const incidencias = req.body.incidencias;

        const existente = await (await AppDataSource.manager.find(EquiposYmedios, { where: { id: req.params.id } })).pop();

        await AppDataSource.manager.update(EquiposYmedios, req.params.id, { 
            name: nombre!=null && nombre!='' ? nombre : existente.name, 
            parque: parque!=null && parque!='' ? parque : existente.parque , 
            activos: activos!=null && activos!='' ? activos : existente.activos ,   
            incidencias: incidencias!=null && incidencias!='' ? incidencias : existente.incidencias , 
            fecha: fecha!=null && fecha!='' ? fecha : existente.fecha ,    
        }); 
            return res.status(200).send({ message: 'usuario actualizado correctamente' });
 
    }
 

    public routes() {
        this.router.get('/equipos', this.getEquipos);
        this.router.delete('/equipos/:id', this.deleteEquipos);
        this.router.post('/equipos', this.addEquipos);
        this.router.put('/equipos/:id', this.updateEquipos); 
    }
}
