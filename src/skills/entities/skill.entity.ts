import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Skills' })
export class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
