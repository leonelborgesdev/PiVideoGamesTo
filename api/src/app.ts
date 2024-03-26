import express from "express";
import morgan from "morgan";
import cors from "cors";
import videoGameRouter from "./routes/videogame.routes";
import genreRouter from "./routes/genre.routes";

const app=express();

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(videoGameRouter)
app.use(genreRouter)

export default app;