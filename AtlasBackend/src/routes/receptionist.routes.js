import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
import { verifyRole } from '../middlewares/verifyRole.middleware.js'
import { receptionistHomeDetails } from '../controllers/receptionist/receptionistHome.controller.js'
import { receptionistAppointmentDetails } from '../controllers/receptionist/receptionistAppointment.controller.js'
import { receptionistPaymentDetails } from '../controllers/receptionist/receptionistPayment.controller.js'

const receptionistRouter = express.Router()

// OKAY
receptionistRouter.route("/get-home-details").get(authMiddleware, verifyRole("receptionist"), receptionistHomeDetails)


// OKAY
receptionistRouter.route("/get-appointments-details").get(authMiddleware, verifyRole("receptionist"), receptionistAppointmentDetails)



receptionistRouter.route("/get-payment-details").post(authMiddleware, verifyRole("receptionist"), receptionistPaymentDetails)


export {receptionistRouter}