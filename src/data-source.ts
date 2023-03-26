import "reflect-metadata"
import { DataSource } from "typeorm"
import { Animals } from "./entity/Animals"
import { Cultivos } from "./entity/Cultivos"
import { EquiposYmedios } from "./entity/EquiposYmedios"
import { Finca } from "./entity/Finca"
import { Provincia } from "./entity/Provincia"
import { User } from "./entity/User"
import { ResultadosEconomicos } from "./entity/ResultadosEconomicos"
import { HechosD } from "./entity/HechosD"
import { DatosEconomicos } from "./entity/DatosEconomicos"
import { Bajas } from "./entity/Bajas"
import { Altas } from "./entity/Altas"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "finca",
    synchronize: true,
    logging: false,
    entities: [User, Animals, Cultivos, EquiposYmedios, Finca ],
    migrations: [],
    subscribers: [],
})
