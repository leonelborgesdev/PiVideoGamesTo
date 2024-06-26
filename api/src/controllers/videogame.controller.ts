import { Request, Response } from "express";
import { videogame } from "../entities/videogame";
import { genre } from "../entities/genre";
import { getVideoGamesApi } from "../services/videogame.service";
import dotenv from "dotenv";
import { genrestInterface } from "../types/genresTypes";
dotenv.config()

export const getAllVideogames =async ( req : Request, res : Response )=>{
    try {
        const allVideogames=await videogame.find({relations: {
            genres: true,
        }});
        if (allVideogames.length === 0) {
            const apikeyVideogame = process.env.apikeyVideogame ? process.env.apikeyVideogame.toString() : "";
            const videogamesApi= await getVideoGamesApi(apikeyVideogame)
            if (videogamesApi.ok) {
                return res.status(200).json({
                    ok: true,
                    videogames: videogamesApi.listVideogame
                })
            }else{
                return res.status(400).json({
                    ok: false,
                    message : videogamesApi.message
                })
            }
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

export const getVideoGameById = async ( req : Request, res : Response ) =>{
    try {
        const { id }= req.params;
        const videoGameByid= await videogame.findOne({
             where : [ { id } ],
             relations: {
                genres: true,
                }
            })
        return res.status(200).json({ ok : true, videoGameByid})
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            return res.status(500).json({message: error.message})
        }        
    }
}

export const createVideogame = async( req : Request, res: Response )=>{
    try {
        const { id, name, descripcion , background_image, rating, released, platforms, genres }=req.body
        let genreslist : Array<genre>= new Array<genre>();
        await genres.map(async ( genreReq : string )=>{
            const genreEnt = await genre.findOneBy({ nombre : genreReq})
            if (genreEnt) {
                const genreEntityObj = new genre()
                genreEntityObj.id= genreEnt?.id ? genreEnt.id : ""
                genreEntityObj.nombre= genreEnt?.nombre ? genreEnt.nombre : ""
                genreslist.push(genreEntityObj);
            }else{
                return res.status(400).json({ ok : false, message : `El genero ${genreReq} no existe en la base de datos`})
            }
        })
        const validateName= await videogame.findOneBy({ nombre : name})
        if (validateName) {
            return res.status(200).json({ ok : false, message : `El video juego ${name} ya existe`})
        }else{
            const ObjectVideoGame=new videogame();                                
            ObjectVideoGame.id= id.toString()
            ObjectVideoGame.nombre= name
            ObjectVideoGame.image = background_image
            ObjectVideoGame.rating = rating
            ObjectVideoGame.fecha_lanzamiento = released
            ObjectVideoGame.plataformas = platforms
            ObjectVideoGame.descripcion = descripcion
            ObjectVideoGame.genres = genreslist
            const videogameAdd = await ObjectVideoGame.save()
            return res.status(200).json({ok: true, videogameAdd})
        }
    } catch (error) {        
        if (error instanceof Error) {
            console.log(error)
            return res.status(500).json({message: error.message})
        }
    }
}