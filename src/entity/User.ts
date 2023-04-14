import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    idFinca: string

    @Column()
    name: string
  
    @Column()
    rol: string

    @Column()
    password: string

}
