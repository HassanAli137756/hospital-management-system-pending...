

import { Profile } from '../../models/Profile.model.js'
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

    let userProfileId = null

    const DBProfile = await Profile.findOne({"patientAccount": userId})

    if(!DBProfile?._id)
    {
        console.log("New Profile Created");
        
        const newProfile = await Profile.create(
        {
            cellNo: DBUser.cellNo,
            name: DBUser.fullName,
            patientAccount: DBUser._id
        }
        )

        userProfileId = newProfile._id

    }
    else
    {
        userProfileId = DBProfile._id
    }

    


    return res
    .status(200)
    .json(
        new APIResponse(200, "successfully fetched user from database", {DBUser, userProfileId})
    )



})


export {getCurrentUser}