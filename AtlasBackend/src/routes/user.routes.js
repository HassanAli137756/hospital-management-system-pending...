import express from 'express'
import {login} from '../controllers/user/login.controler.js'
import {register} from '../controllers/user/register.controler.js'
import {updateAccount} from '../controllers/user/updateAccount.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { APIResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHander.js'
import {authMiddleware} from '../middlewares/authMiddleware.middleware.js'
import { getCurrentUser } from '../controllers/user/getCurrentUser.controller.js'
import {refreshingAccessToken} from '../controllers/user/refreshingAccessToken.controller.js'
import { logout } from '../controllers/user/logout.controller.js'


export const userRouter = express.Router()



/* TESTED */
userRouter.route('/user-register').post(upload.single("avatar"), register)




/* TESTED */
userRouter.route('/user-login').post(login)





/* TESTED */
userRouter.route('/update-account-details').patch(authMiddleware, upload.single("avatar"), updateAccount)



/* TESTED */
userRouter.route('/get-current-user').get(authMiddleware, getCurrentUser)



/* TESTED */
userRouter.route('/refresh-tokens').post(refreshingAccessToken)



/* TESTED */
userRouter.route("/logout").post(authMiddleware, logout)


userRouter.route()