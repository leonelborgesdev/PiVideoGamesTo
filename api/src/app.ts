import express from "express";
import morgan from "morgan";
import cors from "cors";
import videoGameRouter from "./routes/videogame.routes";

const app=express();

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(videoGameRouter)


export default app;