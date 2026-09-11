
import jwt from 'jsonwebtoken'
import { APIError } from '../../utils/apiError.js'
import { generateAccessAndRefreshTokens } from './login.controler.js'
import { User } from '../../models/User.model.js'
import { asyncHandler } from '../../utils/asyncHander.js'
import {APIResponse} from '../../utils/apiResponse.js'

const refreshingAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken = req.cookies?.refreshToken

    if (!incommingRefreshToken) {
        throw new APIError(400, "Refresh token is not found")
    }


    const decodedToken = await jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const DBUser = await User.findById(decodedToken?._id).select("-password")

    if (!DBUser) {
        throw new APIError(404, "User not found in database")
    }

    if (DBUser.refreshToken !== incommingRefreshToken) {
        throw new APIError(401, "Requester is not the owner of this account")
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(decodedToken?._id)

    if (!(accessToken && refreshToken)) {
        throw new APIError(500, "Failed to generate tokens")
    }


    const cookieOptions =
    {
        httpOnly: true,
        sameSite: 'none',
        secure: true

    }


    console.log("DBuser: ", DBUser, refreshToken);



    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new APIResponse(200, "Successfully generated new tokens", { accessToken, refreshToken, user: DBUser })
        )








})


export { refreshingAccessToken }