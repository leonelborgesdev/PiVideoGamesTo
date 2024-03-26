import { Router } from "express";
import { getAllVideogames } from "../controllers/videogame.controller";

const router= Router()

router.get('/videogames',getAllVideogames)

export default router;