import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
import { addAppointment } from '../controllers/appointment/addAppointment.controller.js'
import { cacellingAppointment } from '../controllers/appointment/cancelAppointment.controller.js'
import { appointmentSearcher } from '../controllers/appointment/searcher.controller.js'
import { updatingAppointment } from '../controllers/appointment/updateAppointment.controller.js'
import { updatingPayment } from '../controllers/appointment/updatePayment.controller.js'
import { updatingStatus } from '../controllers/appointment/updateStatus.controller.js'
import { patientDashboardDetails } from '../controllers/patient/pateintHome.controller.js'
import { patientHistoryDetails } from '../controllers/patient/patientHistory.controller.js'
import { patientPaymentDetails } from '../controllers/patient/patientPayments.controller.js'
import { patientAppointmentsDetails } from '../controllers/patient/patientAppointments.controller.js'
import {verifyRole} from '../middlewares/verifyRole.middleware.js'



const appointmentRouter = express.Router()

// OKAY
appointmentRouter.route("/add-appointment").post(authMiddleware, addAppointment)


// OKAY
appointmentRouter.route("/update-payment/:appointmentId").patch(authMiddleware, updatingPayment)


// OKAY
appointmentRouter.route("/update-appointment-status/:appointmentId").patch(authMiddleware, updatingStatus)


// OKAY
appointmentRouter.route("/cancel-appointment/:appointmentId").delete(authMiddleware, cacellingAppointment)



// OKAY
appointmentRouter.route("/searcher").post(authMiddleware, appointmentSearcher)


// OKAY
appointmentRouter.route("/update-appointment").patch(authMiddleware, updatingAppointment)


// OKAY
appointmentRouter.route("/get-patient-home").post(authMiddleware, verifyRole("patient"), patientDashboardDetails)


// OKAY
appointmentRouter.route("/get-patient-history").post(authMiddleware, verifyRole("patient"), patientHistoryDetails)


// OKAY
appointmentRouter.route("/get-patient-payments").post(authMiddleware, verifyRole("patient"), patientPaymentDetails)



appointmentRouter.route("/get-patient-appointments").post(authMiddleware, verifyRole("patient"), patientAppointmentsDetails)





export {appointmentRouter}