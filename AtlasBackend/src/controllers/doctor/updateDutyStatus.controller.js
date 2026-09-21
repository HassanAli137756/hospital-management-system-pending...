import {asyncHandler} from '../../utils/asyncHander.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {APIError} from '../../utils/apiError.js'
import {User} from '../../models/User.model.js'


const updateDutyStatus = asyncHandler( async (req, res) =>
{
    const user = req.user
    const DBDoctor = await User.findById(user._id).select("-password -refreshToken -receptionistField -doctorField.times -avatarPublicID")

    
    if(!DBDoctor?._id)
    {
        throw new APIError(404, "Failed to find doctor from database")
    }

    if(user.role !== DBDoctor.role)
    {
        throw new APIError(403, "You are not allowed to perform this action")
    }

    DBDoctor.doctorField.onDuty = !DBDoctor.doctorField.onDuty

    await DBDoctor.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully updated duty status", DBDoctor)
    )



} )

export {updateDutyStatus}