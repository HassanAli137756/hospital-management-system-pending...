import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.middleware.js'
import { verifyRole } from '../middlewares/verifyRole.middleware.js'
import { doctorAssessment } from '../controllers/admin/doctorAssessment.controller.js'

import { updatePaymentAccessment } from '../controllers/admin/changeReceptionistAllowance.controller.js'

import { changeRole } from '../controllers/admin/changeRole.controller.js'

import { revenue } from '../controllers/admin/dateBasedRevenue.controller.js'


const adminRouter = express.Router()

// OKAY
adminRouter.route("/doctor-assessment").get(authMiddleware, verifyRole("admin"), doctorAssessment)

// OKAY
adminRouter.route("/update-payment-accessment").patch(authMiddleware, verifyRole("admin"), updatePaymentAccessment)


// OKAY
adminRouter.route("/change-role").patch(authMiddleware, verifyRole("admin"), changeRole)


adminRouter.route("/revenue").post(authMiddleware, verifyRole("admin"), revenue)


export {adminRouter}