import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 
import { User } from '../src/entity/User'; 
    

// const bcrypt = require("bcrypt");

export class UserController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    } 

    public getUsuario = async (req: Request, res: Response) => {
      const nombre = req.query.name;  
      const password = req.query.password;
        // const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        // if (valid.length > 0) {
            return res.status(200).send(await AppDataSource.manager.find(User, { where: { name: nombre, password : password} }));
       // }
     //   return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public addUsuario = async (req: Request, res: Response) => {
    //    const token = req.query.token;

     //   const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
     //   if (valid.length > 0) {
            console.log(req.body);
 
            const nombre = req.body.name; 
            const rol = req.body.rol;
            const idFinca = req.body.idFinca; 
            const password = req.body.password;
         
            if (await (await AppDataSource.manager.find(User, { where: { name: nombre} })).length == 0) {
              //  bcrypt.hash(password, 10, async (err, encrypted) => {
                 //   if (err) {
                //        return res.status(500).send({ message: 'En estos momentos no se puede por favor intentelo mas tarde' });
                 //   } else {
                        const user = new User(); 
                        user.name = nombre; 
                        user.rol = rol; 
                        user.idFinca = idFinca;  
                        user.password = password;
                        await AppDataSource.manager.save(User, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
                //    }
           //     });
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' });
    //    } else
   //         return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public deleteUsuario = async (req: Request, res: Response) => {
  //      const token = req.query.token;
   //     const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
   //     if (valid.length > 0) {
            const delet = await AppDataSource.manager.find(User, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(User, delet) });
    //    }
   //     return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public updateUsuario = async (req: Request, res: Response) => {
     //   const token = req.query.token;

        const body = req.body; 
        const nombre = body.name; 
        const rol = req.body.rol;  
        const password = req.body.password;
      //  const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
      //  if (valid.length > 0) {

      const existente = await (await AppDataSource.manager.find(User, { where: { id: req.params.id } })).pop();

      await AppDataSource.manager.update(User, req.params.id, { 
          name: nombre!=null && nombre!='' ? nombre : existente.name, 
          rol: rol!=null && rol!='' ? rol : existente.rol ,      
      }); 
            return res.status(200).send({ message: 'usuario actualizado correctamente' });
    //    }
      //  return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }
 

    public routes() {
        this.router.get('/usuario', this.getUsuario);
        this.router.delete('/usuario/:id', this.deleteUsuario);
        this.router.post('/usuario', this.addUsuario);
        this.router.put('/usuario/:id', this.updateUsuario); 
    }
}
