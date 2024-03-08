import express from 'express'
import cors from 'cors'
import "dotenv/config"
import routes from "./routes"
import mongoConnect from "./config/mongoConnect"
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/ErrorMidd'

const PORT = process.env.PORT || 3001

// INITIALIZE THE APP
const app = express()

// CONFIGURATION
app.use(cors({
    origin: "*",
    credentials: true,  // config to cors - available for everyone but using credentials 
})) 
app.use(cookieParser()) // activate the cookie options
app.use(express.json({limit: "30mb"}))
app.use('API-pradera', routes) // path for api and use the routes
app.use(errorHandler)

//  CONNECT TO DB
mongoConnect().then(() => {
    app.listen(PORT, () => console.log(`DB connected. The app is ready and listening in port ${PORT}`))
})