import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm"

@Entity()
export class ResultadosEconomicos {

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    idFinca: string

    @Column()
    total: string 

    @Column()
    plan: string 

    @Column()
    real: string   

    @Column()
    incidencias: string   

    @Column({nullable:true})
    fecha: Date  
}
