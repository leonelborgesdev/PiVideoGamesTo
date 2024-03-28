import { Router } from "express";
import { createVideogame, getAllVideogames } from "../controllers/videogame.controller";

const router= Router()

router.get('/videogames', getAllVideogames)

router.post('/videogames', createVideogame)

export default router;