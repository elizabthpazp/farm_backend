import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { HechosD } from '../src/entity/HechosD'; 
     
export class HechosDController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getCultivos = async (req: Request, res: Response) => {
        const idFinca = req.query.idFinca; 
               return res.status(200).send(await AppDataSource.manager.find(HechosD, {where: { idFinca: idFinca }} ));
       
    }

    public addCultivos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const id = req.body.id; 
            const area = req.body.area; 
            const afectaciones = req.body.afectaciones;
            const nombre = req.body.nombre; 
            const idFinca = req.body.idFinca; 
            const fecha = req.body.fecha;  
        
            if (await (await AppDataSource.manager.find(HechosD, { where: { id: id} })).length == 0) {
 
                        const user = new HechosD(); 
                        user.id = id;  
                        user.fecha = fecha;  
                        user.nombre = nombre;  
                        user.idFinca = idFinca;  
                        user.afectaciones = afectaciones;     
                        user.area = area;      

                        await AppDataSource.manager.save(HechosD, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
      
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteCultivos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(HechosD, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(HechosD, delet) }); 
    }

    public updateCultivos= async (req: Request, res: Response) => { 

        const body = req.body;  
        const area = req.body.area; 
        const afectaciones = req.body.afectaciones;
        const nombre = req.body.nombre; 
        const fecha = req.body.fecha;  

        const existente = await (await AppDataSource.manager.find(HechosD, { where: { id: req.params.id } })).pop();

        await AppDataSource.manager.update(HechosD, req.params.id, { 
            nombre: nombre!=null && nombre!='' ? nombre : existente.nombre, 
            area: area!=null && area!='' ? area : existente.area , 
            afectaciones: afectaciones!=null && afectaciones!='' ? afectaciones : existente.afectaciones ,    
            fecha: fecha!=null && fecha!='' ? fecha : existente.fecha ,       
        });
  
            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }

     
    public routes() {
        this.router.get('/hechos', this.getCultivos);
        this.router.delete('/hechos/:id', this.deleteCultivos);
        this.router.post('/hechos', this.addCultivos);
        this.router.put('/hechos/:id', this.updateCultivos); 
    }
}
