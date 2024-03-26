import { Request, Response } from "express";
import { genre } from "../entities/genre";
import { getAllGenresApi } from "../services/genre.service";


export const getAllGenres= async (req: Request, res: Response)=>{
    try {
        const allGenres= await genre.find();
        if (allGenres.length === 0) {            
            const apikeyVideogame = process.env.apikeyVideogame ? process.env.apikeyVideogame.toString() : "";
            const AllGenresApi= await getAllGenresApi(apikeyVideogame);            
            return res.status(200).json({
                ok : true,
                genres : AllGenresApi
            })
        }
        return res.status(200).json({
            ok : true,
            genres : allGenres
        })
    } catch (error) {        
        if (error instanceof Error) {
            console.log(error)
            return res.status(500).json({message: error.message})
        }
    }
}