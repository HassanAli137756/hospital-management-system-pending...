

import {User} from '../../models/User.model.js'
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'



const getCurrentUser = asyncHandler( async (req, res) =>
{
    const userId = req?.user?._id


    if(!userId)
    {
        throw new APIError(400, "User-id is not provided")
    }

    const DBUser = await User.findById(userId).select("-password -refreshToken")

    if(!DBUser)
    {
        throw new APIError(500, "Failed to find user from database")
    }

    return res
    .status(200)
    .json(
        new APIResponse(200, "successfully fetched user from database", DBUser)
    )



})


export {getCurrentUser}