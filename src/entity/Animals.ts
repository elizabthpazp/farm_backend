import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Finca } from "./Finca"

@Entity()
export class Animals {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(type => Finca, {nullable:true})
    @JoinColumn() 
    idFinca: string

    @Column()
    especie: string

    @Column()
    category: string

    @Column({nullable:true})
    fecha: Date 

}
