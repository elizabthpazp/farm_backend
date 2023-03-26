import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Bajas } from '../src/entity/Bajas'; 
     
export class BajasController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getCultivos = async (req: Request, res: Response) => { 
               return res.status(200).send(await AppDataSource.manager.find(Bajas));
       
    }

    public addCultivos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const id = req.body.id; 
            const P = req.body.P;
            const idAnimal = req.body.idAnimal;
            const AC = req.body.AC;
            const EL = req.body.EL; 
            const CT = req.body.CT; 
            const TC = req.body.TC;  
            const T = req.body.T;  
        
            if (await (await AppDataSource.manager.find(Bajas, { where: { id: id} })).length == 0) {
 
                        const user = new Bajas(); 
                        user.id = id;  
                        user.idAnimal = idAnimal;  
                        user.P = P;    
                        user.AC = AC;    
                        user.T = T;     
                        user.CT = CT;   
                        user.TC = TC;   
                        user.EL = EL;   

                        await AppDataSource.manager.save(Bajas, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
      
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteCultivos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(Bajas, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Bajas, delet) }); 
    }

    public updateCultivos= async (req: Request, res: Response) => { 

        const body = req.body; 
        const id = body.id; 
        const P = req.body.P;
        const idAnimal = req.body.idAnimal;
        const AC = req.body.AC;
        const EL = req.body.EL; 
        const CT = req.body.CT; 
        const TC = req.body.TC;  
        const T = req.body.T;  

        const existente = await (await AppDataSource.manager.find(Bajas, { where: { id: req.params.id } })).pop();

        await AppDataSource.manager.update(Bajas, req.params.id, {     
            P :  P!=null && P!='' ? P : existente.P ,  
            AC : AC!=null && AC!='' ? AC : existente.AC ,   
            T : T!=null && T!='' ? T : existente.T  ,  
            TC: TC!=null && TC!='' ? TC : existente.TC , 
            CT : CT!=null && CT!='' ? CT : existente.CT ,  
            EL: EL!=null && EL!='' ?EL : existente.EL
        });
  
            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }

     
    public routes() {
        this.router.get('/bajas', this.getCultivos);
        this.router.delete('/bajas/:id', this.deleteCultivos);
        this.router.post('/bajas', this.addCultivos);
        this.router.put('/bajas/:id', this.updateCultivos); 
    }
}
