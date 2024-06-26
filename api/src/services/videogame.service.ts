import axios from "axios";
import { videogameApiInterface, videogameInterfaceModel } from "../types/videoGamesType";
import { videogame } from "../entities/videogame";
import { genrestInterface } from "../types/genresTypes";
import { genre } from "../entities/genre";


export const getVideoGamesApi= async ( api : string) =>{
    if (api != "") {
    const result= await axios(`https://api.rawg.io/api/games?key=${api}`);
        if (result) {
            const data= result.data.results;
            let listVideogame : Array<videogameInterfaceModel> = new Array<videogameInterfaceModel>();
            data.map((videogameObj : videogameApiInterface)=>{
                let platformsApi="";
                videogameObj.platforms.map((platform:{
                    platform: {id: string, name: string},
                    name: string
                }, index: number)=>{
                    if(videogameObj.platforms.length-1 === index){
                        platformsApi=platformsApi+`${platform.platform.name}.`
                    }else{
                        platformsApi=platformsApi+platform.platform.name+", "
                    }
                })
                const videoGameReturn= {
                    id: videogameObj.id.toString(),
                    name: videogameObj.name,
                    background_image : videogameObj.background_image,                
                    rating : videogameObj.rating,                
                    released : videogameObj.released,
                    platforms : platformsApi,
                    genres : videogameObj.genres.map((genre : genrestInterface)=>{
                        return {
                            id : genre.id,
                            name : genre.name
                        }
                    })
                }
                listVideogame.push(videoGameReturn);
            })
            for (let i = 2; i <= 5; i++) {
                await getVideoGamesApiPage(`https://api.rawg.io/api/games?key=${api}&page=${i}`,listVideogame);              
            }
            const saveVideogames = await createListVideoGames(listVideogame)
            if (saveVideogames.ok) {
                return { ok : true , listVideogame};
            }else{
                return { ok : false , listVideogame : [], message : saveVideogames.message};
            }
        }
    }
    return { ok : false , listVideogame : [], message : "error consulte con su administrador"};
}

export const getVideoGamesApiPage = async (api: string, listVideogame:any)=>{
    const ApiPage= await axios(api);
    console.log(listVideogame.length)
    if (ApiPage) {
        const data= ApiPage.data.results;
        data.map((videogameObj : videogameApiInterface)=>{
            let platformsApi="";
            videogameObj.platforms.map((platform:{
                platform: {id: string, name: string},
                name: string
            }, index: number)=>{
                if(videogameObj.platforms.length-1 === index){
                    platformsApi=platformsApi+`${platform.platform.name}.`
                }else{
                    platformsApi=platformsApi+platform.platform.name+", "
                }
            })
            const videogameReturn= {
                id: videogameObj.id.toString(),
                name: videogameObj.name,
                background_image : videogameObj.background_image,                
                rating : videogameObj.rating,                
                released : videogameObj.released,
                platforms : platformsApi,
                genres : videogameObj.genres.map((genre : genrestInterface)=>{
                    return {
                        id : genre.id,
                        name : genre.name
                    }
                })
            }
            listVideogame.push(videogameReturn);
        })
    }
}
export const createListVideoGames= async( listVideogame : Array < videogameInterfaceModel > )=>{
    const genresCount= await genre.count();
    console.log(genresCount)
    if (genresCount !=0) {
        listVideogame.map(
            async (videogameObj : videogameInterfaceModel ) => {
                await saveVideoGameObj(videogameObj);
            }
        )
        return {ok: true , message: "todo bien"};
    }else{
        return {ok : false , message: "No se encontro ningun genero en la base de datos"};
    }
}
export const saveVideoGameObj = async ( videogameObj : videogameInterfaceModel)=>{
    let genreslist : Array<genre>= new Array<genre>();
    videogameObj.genres.map((genreObj : genrestInterface)=>{
        const genreEntityObj = new genre()
        genreEntityObj.id= genreObj.id
        genreEntityObj.nombre= genreObj.name
        genreslist.push(genreEntityObj)
    })
    const ObjectVideoGame=new videogame();                                
    ObjectVideoGame.id= videogameObj.id.toString()
    ObjectVideoGame.nombre= videogameObj.name
    ObjectVideoGame.image = videogameObj.background_image
    ObjectVideoGame.rating = videogameObj.rating
    ObjectVideoGame.fecha_lanzamiento = videogameObj.released
    ObjectVideoGame.plataformas = videogameObj.platforms
    ObjectVideoGame.descripcion = ""
    ObjectVideoGame.genres = genreslist
    await ObjectVideoGame.save()
}