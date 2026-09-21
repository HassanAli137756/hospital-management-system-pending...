import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'


const changeRole = asyncHandler( async (req, res) =>
{
    const  
    {
        newRole,
        userId,
    }
    = req.body
    const requester = req.user

    if(!requester?._id)
    {
        throw new APIError(400, "user-id is not provided")
    }

    if(!newRole?.trim() && !userId?.trim())
    {
        throw new APIError(400, "Please profide all required fields")
    }

    if(
        [
            "patient",
            "sub-admin",
            "receptionist",
            "doctor"
        ].every(field => newRole !== field)
    )
    {
        throw new APIError(400, "Please provide a correct role")
    }

    if(requester?.role !== "admin")
    {
        throw new APIError(403, "You are not allowed to perform this action")
    }

    const user = await User.findById(userId).select("userName avatar fullName email role")

    if(!user?.id)
    {
        throw new APIError(500, "Failed to find user from database")
    }

    user.role = newRole

    user.save({validateBeforeSave: false})


    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully update role of a user", user)
    )
    



} )

export {changeRole}