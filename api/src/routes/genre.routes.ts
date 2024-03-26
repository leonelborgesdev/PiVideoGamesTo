import { Router } from "express";
import { getAllGenres } from "../controllers/genre.controller";

const router = Router();

router.get('/genres', getAllGenres);

export default router;