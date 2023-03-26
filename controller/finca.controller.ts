import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Finca } from '../src/entity/Finca'; 
     
export class FincaController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getFinca = async (req: Request, res: Response) => {
  
            return res.status(200).send(await AppDataSource.manager.find(Finca)); 
    }

    public addFinca = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const nombre = req.body.name;  
            const provincia = req.body.provincia; 
         
            if (await (await AppDataSource.manager.find(Finca, { where: { name: nombre} })).length == 0) {
 
                        const user = new Finca(); 
                        user.name = nombre;   
                        user.provincia = provincia;   
                        await AppDataSource.manager.save(Finca, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
          
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteFinca = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(Finca, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Finca, delet) });
  
    }

    public updateFinca = async (req: Request, res: Response) => { 

        const body = req.body; 
        const nombre = body.name; 
        const provincia = body.provincia; 

        const existente = await (await AppDataSource.manager.find(Finca, { where: { id: req.params.id } })).pop();

        await AppDataSource.manager.update(Finca, req.params.id, { 
            name: nombre!=null && nombre!='' ? nombre : existente.name, 
            provincia: provincia!=null && provincia!='' ? provincia : existente.provincia ,      
        });
  
            return res.status(200).send({ message: 'Finca actualizado correctamente' });
 
    }
 
    public routes() {
        this.router.get('/finca', this.getFinca);
        this.router.delete('/finca/:id', this.deleteFinca);
        this.router.post('/finca', this.addFinca);
        this.router.put('/finca/:id', this.updateFinca); 
    }
}
