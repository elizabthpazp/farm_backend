import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Bajas {

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    idAnimal: string

    @Column()
    P: string 

    @Column()
    AC: string 

    @Column()
    EL: string   

    @Column()
    CT: string 

    @Column()
    TC: string

    @Column()
    T: string 

}
