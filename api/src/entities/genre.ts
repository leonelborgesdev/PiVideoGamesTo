import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { videogame } from "./videogame";

@Entity()
export class genre extends BaseEntity{

    @PrimaryColumn()
    id: string

    @Column()
    nombre: string
    
    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @ManyToMany(() => videogame, (videogame) => videogame.genres)
    videogames: videogame[]
}