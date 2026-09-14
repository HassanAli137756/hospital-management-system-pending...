import jwt from 'jsonwebtoken'
import {User} from '../../models/User.model.js'
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'


const logout = asyncHandler( async (req, res) =>
{
    const incommingRefreshToken = req.cookies?.refreshToken

    console.log("Tokens", req.cookies);
    

    if(!incommingRefreshToken)
    {
        throw new APIError(401, "Login session token is not found, it seems you have already logout")
    }

    const decodedToken = await jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const DBUser = await User.findById(decodedToken?._id)

    if(!DBUser)
    {
        throw new APIError(401, "Something went wrong, failed to find user from database")
    }

    if(DBUser.refreshToken !== incommingRefreshToken)
    {
        throw new APIError(401, "It seems requester is not the owner of account")
    }

    DBUser.refreshToken = ""

    await DBUser.save({validateBeforeSave: false})

    
    const cookieOptions = 
    {
        httpOnly: true,
        sameSite: 'none',
        secure: true

    }



    return res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("accessToken", cookieOptions)
    .json(
        new APIResponse(200, "Successfully logged-out")
    )


})


export {logout}