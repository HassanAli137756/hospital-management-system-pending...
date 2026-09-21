import {asyncHandler} from '../../utils/asyncHander.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {APIError} from '../../utils/apiError.js'
import {User} from '../../models/User.model.js'


const updatePaymentAccessment = asyncHandler( async (req, res) =>
{
    const user = req.user
    const receptionistId = req.body.receptionistId
    const allowedDuration = req.body.allowedDuration
    
    
    if(!user?._id)
    {
        throw new APIError(400, "Please proivde admin id")
    }
    
    
    if(!receptionistId || !allowedDuration)
    {
        throw new APIError(400, "Please proivde all required fields")
    }

    if(allowedDuration !== "week" && allowedDuration !== "month" && allowedDuration !== "year" && allowedDuration !== "all"  )
    {
        throw new APIError(400, "Please provide a correct duration")
    }

    const DBReceptionist = await User.findById(receptionistId).select("-password -refreshToken")

    
    if(!DBReceptionist?._id)
    {
        throw new APIError(404, "Failed to find receptionist from database")
    }

    DBReceptionist.receptionistField.controls.allPaymentAccessPeriod = allowedDuration


    await DBReceptionist.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully updated receptionist controlls", DBReceptionist)
    )



} )

export {updatePaymentAccessment}