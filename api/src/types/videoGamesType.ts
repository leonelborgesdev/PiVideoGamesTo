import { genrestInterface } from "./genresTypes"

export interface videogameApiInterface{    
    id: string
    name : string
    background_image : string
    rating : number
    released : string
    platforms : []
    genres : Array<genrestInterface>
}

export interface videogameInterfaceModel{
    id: string            
    name : string            
    background_image : string            
    rating : number            
    released : string            
    platforms : string
    genres : Array<genrestInterface>
}