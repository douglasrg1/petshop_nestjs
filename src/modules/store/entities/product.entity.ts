import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 80})
    title: string;
    @Column('text')
    description: string;
}