import express from 'express'

import {getDoctorTimes} from '../controllers/doctor/getAllAvailableTimes.controller.js'

import {changeReceptionistControl} from '../controllers/doctor/setUpdationAllowance.controller.js'

import {updateDutyStatus} from '../controllers/doctor/updateDutyStatus.controller.js'

import {addTime} from '../controllers/doctor/addTime.controller.js'

import {deleteTime} from '../controllers/doctor/deleteTime.controller.js'

import {updateTimeStatus} from '../controllers/doctor/updateTimeStatus.controller.js'

import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
import { verifyRole } from '../middlewares/verifyRole.middleware.js'
import { getAllDoctors } from '../controllers/doctor/getAllDoctors.controller.js'
import { doctorHomeDetails } from '../controllers/doctor/doctorHome.controller.js'
import { doctorPaymentDetails } from '../controllers/doctor/doctorPayments.controller.js'
import { doctorAppointmentDetails } from '../controllers/doctor/doctorAppointment.js'

const doctorRouter = express.Router()





// OKAY
doctorRouter.route("/get-doctor-times/:doctorId").get(authMiddleware, getDoctorTimes)


// OKAY
doctorRouter.route("/change-receptionist-control").patch(authMiddleware, verifyRole("doctor"), changeReceptionistControl)


// OKAY
doctorRouter.route("/update-doctor-duty-status").patch(authMiddleware, verifyRole("doctor"), updateDutyStatus)


// OKAY
doctorRouter.route("/add-time").post(authMiddleware, verifyRole("doctor"), addTime)



// OKAY
doctorRouter.route("/delete-time").delete(authMiddleware, verifyRole("doctor"), deleteTime)



// OKAY
doctorRouter.route("/update-time-status").patch(authMiddleware, verifyRole("doctor"), updateTimeStatus)



// OKAY
doctorRouter.route("/get-all-doctor-times").get(authMiddleware, getAllDoctors)


// OKAY
doctorRouter.route("/get-doctor-home").post(authMiddleware, verifyRole("doctor"), doctorHomeDetails)


// OKAY
doctorRouter.route("/get-doctor-payments").post(authMiddleware, verifyRole("doctor"), doctorPaymentDetails)



doctorRouter.route("/get-doctor-appointment/:doctorId").get(authMiddleware, verifyRole("doctor"), doctorAppointmentDetails)




export {doctorRouter}