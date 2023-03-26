import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Animals } from '../src/entity/Animals'; 
    
 
export class AnimalsController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getAnimals = async (req: Request, res: Response) => {
        const idFinca = req.query.idFinca;
           
            return res.status(200).send(await AppDataSource.manager.find(Animals, {where: { idFinca: idFinca }} )); 
    }

    public addAnimals = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const nombre = req.body.name;  
            const especie = req.body.especie;
            const category = req.body.category;
            const fecha = req.body.fecha; 
            const idFinca = req.body.idFinca; 
         
            if (await (await AppDataSource.manager.find(Animals, { where: { name: nombre} })).length == 0) {
             
                        const user = new Animals(); 
                        user.name = nombre;    
                        user.especie = especie;     
                        user.category = category;   
                        user.fecha = fecha;   
                        user.idFinca = idFinca;  

                        await AppDataSource.manager.save(Animals, user);
                        return res.status(200).send({ message: 'animal agregado correctamente' });
          
            } else
                return res.status(400).send({ message: 'El animal ya esta siendo usado' });
 
    }

    public deleteAnimals = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(Animals, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Animals, delet) });
 
    }

    public updateAnimals = async (req: Request, res: Response) => { 

        const body = req.body; 
        const nombre = body.name;  
        const especie = req.body.especie;
        const category = req.body.category;
        const fecha = req.body.fecha;  

        const existente = await (await AppDataSource.manager.find(Animals, { where: { id: req.params.id } })).pop();

            await AppDataSource.manager.update(Animals, req.params.id, { 
                name: nombre!=null && nombre!='' ? nombre : existente.name, 
                especie: especie!=null && especie!='' ? especie : existente.especie , 
                category: category!=null && category!='' ? category : existente.category ,   
                fecha: fecha!=null && fecha!='' ? fecha : existente.fecha ,     
            });
            return res.status(200).send({ message: 'animal actualizado correctamente' }); 
    }
 
    public routes() {
        this.router.get('/animals', this.getAnimals);
        this.router.delete('/animals/:id', this.deleteAnimals);
        this.router.post('/animals', this.addAnimals);
        this.router.put('/animals/:id', this.updateAnimals); 
    }
}
