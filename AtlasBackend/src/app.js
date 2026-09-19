import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/user.routes.js'
import {errorMiddleware} from './middlewares/error.middleware.js'
import { appointmentRouter } from './routes/appointment.routes.js'
import { doctorRouter } from './routes/doctor.routes.js'

const app = express()

app.use(cors(
{
    origin: "http://localhost:5173/",
    credentials: true
}
))


app.use(express.urlencoded())
app.use(express.json())
//app.use(express.static())
app.use(cookieParser())






app.get('/', (req, res) =>
{
    res.send("Hello Hassan Ali")
    
})


app.use("/physiotherapy/v1/users", userRouter)

app.use("/physiotherapy/v1/appointments", appointmentRouter)

app.use("/physiotherapy/v1/doctors", doctorRouter)

app.use(errorMiddleware)

export {app}