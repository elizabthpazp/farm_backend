import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cultivos {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    idFinca: string

    @Column()
    tipo: string 

    @Column()
    plan: number 

    @Column()
    real: number   

    @Column({nullable:true})
    fecha: Date 

    @Column()
    areaExistencia: string

    @Column()
    tierraMov: string

    @Column()
    tierraLista: string 

}
