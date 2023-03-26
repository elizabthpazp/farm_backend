import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Cultivos } from '../src/entity/Cultivos'; 
     
export class CultivosController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getCultivos = async (req: Request, res: Response) => { 
        const idFinca = req.query.idFinca;
           return res.status(200).send(await AppDataSource.manager.find(Cultivos, {where: { idFinca: idFinca }}));
       
    }

    public addCultivos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const idFinca = req.body.idFinca; 
            const nombre = req.body.name; 
            const finca = req.body.finca;
            const plan = req.body.plan;
            const tipo = req.body.tipo;
            const fecha = req.body.fecha; 
            const centroElaboracion = req.body.centroElaboracion; 
            const real = req.body.real;  
            const areaExistencia = req.body.areaExistencia;
            const tierraMov = req.body.tierraMov;
            const tierraLista = req.body.tierraLista;  
        
            if (await (await AppDataSource.manager.find(Cultivos, { where: { name: nombre} })).length == 0) {
 
                        const user = new Cultivos(); 
                        user.name = nombre;  
                        user.fecha = fecha;
                        user.idFinca = idFinca;    
                        user.tipo = tipo;    
                        user.real = real;  
                        user.plan = plan;     
                        user.areaExistencia = areaExistencia;   
                        user.tierraLista = tierraLista;   
                        user.tierraMov = tierraMov;   

                        await AppDataSource.manager.save(Cultivos, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
      
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteCultivos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(Cultivos, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Cultivos, delet) }); 
    }

    public updateCultivos= async (req: Request, res: Response) => { 

        const body = req.body; 
        const nombre = body.name; 
        const finca = req.body.finca;
        const plan = req.body.plan;
        const tipo = req.body.tipo;
        const fecha = req.body.fecha;  
        const real = req.body.real;  
        const areaExistencia = req.body.areaExistencia;
        const tierraMov = req.body.tierraMov;
        const tierraLista = req.body.tierraLista;  
 
        const existente = await (await AppDataSource.manager.find(Cultivos, { where: { id: req.params.id } })).pop();

        await AppDataSource.manager.update(Cultivos, req.params.id, { 
            name: nombre!=null && nombre!='' ? nombre : existente.name, 
            tipo: tipo!=null && tipo!='' ? tipo : existente.tipo , 
            real: real!=null && real!='' ? real : existente.real ,   
            plan: plan!=null && plan!='' ? plan : existente.plan ,   
            fecha: fecha!=null && fecha!='' ? fecha : existente.fecha ,   
            areaExistencia: areaExistencia!=null && areaExistencia!='' ? areaExistencia : existente.areaExistencia ,   
            tierraLista: tierraLista!=null && tierraLista!='' ? tierraLista : existente.tierraLista ,   
            tierraMov: tierraMov!=null && tierraMov!='' ? tierraMov : existente.tierraMov ,     
        });
 
            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }

     
    public routes() {
        this.router.get('/cultivos', this.getCultivos);
        this.router.delete('/cultivos/:id', this.deleteCultivos);
        this.router.post('/cultivos', this.addCultivos);
        this.router.put('/cultivos/:id', this.updateCultivos); 
    }
}
