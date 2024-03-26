import "reflect-metadata"
import app from "./app"
import { Appdatasource } from "./db";

async function main() {
    try {        
        const port=process.env.PORTSERVER || 3000;
        await Appdatasource.initialize()
        app.listen(port)
        console.log('server on port ', port)
    } catch (error) {
        console.log(error)
    }
}

main()