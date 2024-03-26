import axios from "axios"
import { genrestInterface } from "../types/genresTypes";
import { genre } from "../entities/genre";


export const getAllGenresApi=async( api : string )=>{
    const result= await axios(`https://api.rawg.io/api/genres?key=${api}`);
    if (result) {
        const data= result.data.results;
        const listGenres = data.map((genre: genrestInterface)=>{
            return {
                id : genre.id,
                name : genre.name
            }
        })
        listGenres.map( async( genreObj : genrestInterface ) => {
            const genreEntityObj = new genre();
            genreEntityObj.id = genreObj.id;
            genreEntityObj.nombre = genreObj.name;
            await genreEntityObj.save()
        })
        return listGenres;
    }
    return []
}