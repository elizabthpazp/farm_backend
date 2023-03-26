import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class EquiposYmedios {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    idFinca: string  

    @Column()
    parque: string

    @Column({nullable:true})
    fecha: Date 

    @Column()
    activos: number

    @Column()
    incidencias: number

}
