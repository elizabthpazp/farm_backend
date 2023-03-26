import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Finca {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    provincia: string

}
