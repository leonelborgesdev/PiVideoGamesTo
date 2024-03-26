import { Request, Response } from "express";
import { videogame } from "../entities/videogame";
import { getVideoGamesApi } from "../services/videogame.service";
import dotenv from "dotenv";
dotenv.config()

export const getAllVideogames =async ( req : Request, res : Response )=>{
    try {
        const allVideogames=await videogame.find({relations: {
            genres: true,
        }});
        if (allVideogames.length === 0) {
            const apikeyVideogame = process.env.apikeyVideogame ? process.env.apikeyVideogame.toString() : "";
            const videogamesApi= await getVideoGamesApi(apikeyVideogame)
            return res.status(200).json(videogamesApi)
        }
        return res.status(200).json({
            ok: true,
            videogames: allVideogames
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            return res.status(500).json({message: error.message})
        }
    }
}