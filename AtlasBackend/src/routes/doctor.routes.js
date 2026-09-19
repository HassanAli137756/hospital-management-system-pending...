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





doctorRouter.route("/get-doctor-times/:doctorId").get(authMiddleware, getDoctorTimes)


doctorRouter.route("/change-receptionist-control").post(authMiddleware, verifyRole("doctor"), changeReceptionistControl)

doctorRouter.route("/update-doctor-duty-status").post(authMiddleware, verifyRole("doctor"), updateDutyStatus)

doctorRouter.route("/add-time").post(authMiddleware, verifyRole("doctor"), addTime)

doctorRouter.route("/delete-time").post(authMiddleware, verifyRole("doctor"), deleteTime)

doctorRouter.route("/update-time-status").post(authMiddleware, verifyRole("doctor"), updateTimeStatus)



export {doctorRouter}