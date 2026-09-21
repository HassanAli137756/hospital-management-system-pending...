import {asyncHandler} from '../../utils/asyncHander.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {APIError} from '../../utils/apiError.js'
import {User} from '../../models/User.model.js'


const changeReceptionistControl = asyncHandler( async (req, res) =>
{
    const user = req.user
    const DBReceptionist = await User.findOne({role: "receptionist"}).select("-password -refreshToken")

    
    
    if(!user?._id)
    {
        throw new APIError(400, "Please proivde doctor id")
    }
    
    
    if(!DBReceptionist?._id)
    {
        throw new APIError(404, "Failed to find receptionist from database")
    }

    const allowedDoctors = DBReceptionist.receptionistField.controls.allowedToUpdateStatus || []

    console.log("allowedToUpdateStatus: ", allowedDoctors);
    
    
    if(allowedDoctors.includes(user._id))
    {
        DBReceptionist.receptionistField.controls.allowedToUpdateStatus = allowedDoctors.filter(doctorId => doctorId !== user._id)
    }
    else
    {
        DBReceptionist.receptionistField.controls.allowedToUpdateStatus.push(user._id)
    }

    
    await DBReceptionist.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully updated receptionist controlls", DBReceptionist)
    )



} )

export {changeReceptionistControl}