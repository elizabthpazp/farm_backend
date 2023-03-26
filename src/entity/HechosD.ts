import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class HechosD {

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    idFinca: string

    @Column()
    area: string 

    @Column()
    afectaciones: string 

    @Column()
    nombre: string   

    @Column({nullable:true})
    fecha: Date  

}
