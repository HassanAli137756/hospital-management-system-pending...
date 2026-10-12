

import {User} from '../../models/User.model.js'
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'



const getAllDoctors = asyncHandler( async (req, res) =>
{
    const userId = req?.user?._id


    if(!userId)
    {
        throw new APIError(400, "User-id is not provided")
    }

    const DBDoctors = 
    await User
    .find({role: "doctor"})
    .select("userName fullName doctorField avatar")

    const doctorNames = []
    
    DBDoctors
    ?.map(doc => doc.doctorField.onDuty ? doctorNames.push(doc.fullName) : null)


    if(!DBDoctors)
    {
        throw new APIError(500, "Failed to find doctors from database")
    }

    return res
    .status(200)
    .json(
        new APIResponse(200, "successfully fetched doctors from database", {doctorNames, DBDoctors})
    )



})


export {getAllDoctors}