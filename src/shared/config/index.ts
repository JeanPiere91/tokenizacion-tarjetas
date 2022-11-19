import * as dotenv from "dotenv"
dotenv.config()

const PG_HOST:string = process.env.PG_HOST!
const PG_PORT: number = Number(process.env.PG_PORT!) 
const PG_DATABASE: string = process.env.PG_DATABASE!
const PG_USER: string = process.env.PG_USER!
const PG_PASSWORD: string = process.env.PG_PASSWORD!
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY!
const JWT_EXPIRES_TOKEN: string = process.env.JWT_EXPIRES_TOKEN!


export {
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
    PG_USER,
    PG_PASSWORD,
    JWT_SECRET_KEY,
    JWT_EXPIRES_TOKEN
}