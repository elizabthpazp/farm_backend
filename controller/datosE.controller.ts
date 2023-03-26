import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { DatosEconomicos } from '../src/entity/DatosEconomicos'; 
     
export class DatosEconomicosController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getCultivos = async (req: Request, res: Response) => {
        const idFinca = req.query.idFinca; 
               return res.status(200).send(await AppDataSource.manager.find(DatosEconomicos, {where: { idFinca: idFinca }} ));
       
    }

    public addCultivos = async (req: Request, res: Response) => {
 
            console.log(req.body);
 
            const id = req.body.id; 
            const salario = req.body.salario;
            const idFinca = req.body.idFinca;
            const promedio = req.body.promedio;
            const productividad = req.body.productividad; 
            const fecha = req.body.fecha;  
        
            if (await (await AppDataSource.manager.find(DatosEconomicos, { where: { id: id} })).length == 0) {
 
                        const user = new DatosEconomicos(); 
                        user.id = id;  
                        user.fecha = fecha;  
                        user.salario = salario;    
                        user.promedio = promedio;    
                        user.idFinca = idFinca;     
                        user.productividad = productividad;      

                        await AppDataSource.manager.save(DatosEconomicos, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
      
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' }); 
    }

    public deleteCultivos = async (req: Request, res: Response) => {
 
            const delet = await AppDataSource.manager.find(DatosEconomicos, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(DatosEconomicos, delet) }); 
    }

    public updateCultivos= async (req: Request, res: Response) => { 

        const body = req.body;  
        const salario = req.body.salario; 
        const promedio = req.body.promedio;
        const productividad = req.body.productividad; 
        const fecha = req.body.fecha;  

        const existente = await (await AppDataSource.manager.find(DatosEconomicos, { where: { id: req.params.id } })).pop();

        await AppDataSource.manager.update(DatosEconomicos, req.params.id, { 
            salario: salario!=null && salario!='' ? salario : existente.salario, 
            promedio: promedio!=null && promedio!='' ? promedio : existente.promedio , 
            productividad: productividad!=null && productividad!='' ? productividad : existente.productividad ,   
            fecha: fecha!=null && fecha!='' ? fecha : existente.fecha ,    
        }); 
            return res.status(200).send({ message: 'DatosEconomicos actualizado correctamente' }); 
    }

     
    public routes() {
        this.router.get('/DatosEconomicos', this.getCultivos);
        this.router.delete('/DatosEconomicos/:id', this.deleteCultivos);
        this.router.post('/DatosEconomicos', this.addCultivos);
        this.router.put('/DatosEconomicos/:id', this.updateCultivos); 
    }
}
