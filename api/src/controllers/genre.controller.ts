import { Request, Response } from "express";
import { genre } from "../entities/genre";
import { getAllGenresApi } from "../services/genre.service";


export const getAllGenres= async (req: Request, res: Response)=>{
    try {
        const allGenres= await genre.find();
        console.log(allGenres.length);
        if (allGenres.length === 0) {            
            const apikeyVideogame = process.env.apikeyVidogame ? process.env.apikeyVidogame.toString() : "";
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
        
    }
}