import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors'
const app = express()

import cookieParser from 'cookie-parser'
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,

    }
))



app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())


  
  

import userRoutes from './Routes/user.routes.js'
import serverRoutes from './Routes/server.routes.js'
app.use('/user', userRoutes)
app.use('/server', serverRoutes)
export default app