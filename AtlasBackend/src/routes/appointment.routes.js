import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
import { addAppointment } from '../controllers/appointment/addAppointment.controller.js'


const appointmentRouter = express.Router()


appointmentRouter.route("/add-appointment").post(authMiddleware, addAppointment)




export {appointmentRouter}