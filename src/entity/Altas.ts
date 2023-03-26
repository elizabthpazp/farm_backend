import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Altas {

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    idAnimal: string

    @Column()
    S: string 

    @Column()
    AC: string 

    @Column()
    MT: string   

    @Column()
    VTA: string 

    @Column()
    TC: string

    @Column()
    EF: string 

}
