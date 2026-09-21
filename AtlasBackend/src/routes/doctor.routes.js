import express from 'express'

import {getDoctorTimes} from '../controllers/doctor/getAllAvailableTimes.controller.js'

import {changeReceptionistControl} from '../controllers/doctor/setUpdationAllowance.controller.js'

import {updateDutyStatus} from '../controllers/doctor/updateDutyStatus.controller.js'

import {addTime} from '../controllers/doctor/addTime.controller.js'

import {deleteTime} from '../controllers/doctor/deleteTime.controller.js'

import {updateTimeStatus} from '../controllers/doctor/updateTimeStatus.controller.js'

import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
import { verifyRole } from '../middlewares/verifyRole.middleware.js'

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



export {doctorRouter}