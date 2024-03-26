import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { videogame } from "./entities/videogame";
import { genre } from "./entities/genre";
dotenv.config()

const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;

export const Appdatasource=new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    username: process.env.NAMEUSER,
    password: process.env.PASSWORD,
    port: port,
    database: process.env.DATABASE,
    entities: [videogame, genre],
    logging: false,
    synchronize: true
})