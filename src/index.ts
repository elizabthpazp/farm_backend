import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { UserController } from "../controller/user.controller";
import { ProvinciaController } from "../controller/provincia.controller";
import { FincaController } from "../controller/finca.controller";
import { EquiposController } from "../controller/equipos.controller";
import { CultivosController } from "../controller/cultives.controller";
import { AnimalsController } from "../controller/animals.controller";


const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 9707;

AppDataSource.initialize().then(async () => {

    app.use(cors());

    // Configuring body parser middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Configuracion para subir imagenes
    app.use(fileUpload());

    // Importamos las rutas
    // var routes = require('./url/url');
    // const inicio = require('./controllers/apis');
    const user_controller = new UserController(); 
    const provincia_controller = new ProvinciaController(); 
    const finca_controller = new FincaController(); 
    const equipos_controller = new EquiposController(); 
    const cultivos_controller = new CultivosController(); 
    const animals_controller = new AnimalsController(); 


    app.use('/apis', user_controller.router);
    app.use('/apis', provincia_controller.router);
    app.use('/apis', finca_controller.router);
    app.use('/apis', user_controller.router);
    app.use('/apis', equipos_controller.router);
    app.use('/apis', cultivos_controller.router);
    app.use('/apis', animals_controller.router);

    module.exports = app;

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.name = "Testtt" 
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    app.listen(port, () => console.log(`El servidor esta escuchando en el puerto ${port}!`));


}).catch(error => console.log(error))
