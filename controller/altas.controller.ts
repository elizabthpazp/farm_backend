import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { Altas } from '../src/entity/Altas'; 
import { Cultivos } from '../src/entity/Cultivos';
     
export class AltasController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getCultivos = async (req: Request, res: Response) => { 

               return res.status(200).send(await AppDataSource.manager.find(Altas));
       
    }

    public addCultivos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const id = req.body.id; 
            const S = req.body.S;
            const idAnimal = req.body.idAnimal;
            const AC = req.body.AC;
            const MT = req.body.MT; 
            const VTA = req.body.VTA; 
            const TC = req.body.TC;  
            const EF = req.body.EF;  
        
            if (await (await AppDataSource.manager.find(Altas, { where: { id: id} })).length == 0) {
 
                        const user = new Altas(); 
                        user.id = id;  
                        user.idAnimal = idAnimal;  
                        user.S = S;    
                        user.AC = AC;    
                        user.MT = MT;     
                        user.VTA = VTA;   
                        user.TC = TC;   
                        user.EF = EF;   

                        await AppDataSource.manager.save(Altas, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
      
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteCultivos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(Altas, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Altas, delet) }); 
    }

    public updateCultivos= async (req: Request, res: Response) => { 

        const body = req.body; 
        const id = body.id; 
        const S = req.body.S;
        const idAnimal = req.body.idAnimal;
        const AC = req.body.AC;
        const MT = req.body.MT; 
        const VTA = req.body.VTA; 
        const TC = req.body.TC;  
        const EF = req.body.EF;    

            const existente = await (await AppDataSource.manager.find(Altas, { where: { id: req.params.id } })).pop();

            await AppDataSource.manager.update(Altas, req.params.id, {     
                S :  S!=null && S!='' ? S : existente.S ,  
                AC : AC!=null && AC!='' ? AC : existente.AC ,   
                MT : MT!=null && MT!='' ? MT : existente.MT  ,  
                VTA: VTA!=null && VTA!='' ? VTA : existente.VTA , 
                TC : TC!=null && TC!='' ? TC : existente.TC ,  
                EF: EF!=null && EF!='' ?EF : existente.EF
            });

            return res.status(200).send({ message: 'usuario actualizado correctamente' }); 
    }

     
    public routes() {
        this.router.get('/altas', this.getCultivos);
        this.router.delete('/altas/:id', this.deleteCultivos);
        this.router.post('/altas', this.addCultivos);
        this.router.put('/altas/:id', this.updateCultivos); 
    }
}
