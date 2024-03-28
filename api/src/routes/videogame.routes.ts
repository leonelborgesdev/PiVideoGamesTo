import { Router } from "express";
import { createVideogame, getAllVideogames, getVideoGameById } from "../controllers/videogame.controller";

const router= Router()

router.get('/videogames', getAllVideogames)

router.post('/videogames', createVideogame)

router.get('/videogames/:id', getVideoGameById)

export default router;