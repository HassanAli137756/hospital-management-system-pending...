import {asyncHandler} from '../../utils/asyncHander.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {APIError} from '../../utils/apiError.js'
import {User} from '../../models/User.model.js'


const getDoctorTimes = asyncHandler( async (req, res) =>
{
    const doctorId = req.params?.doctorId

    
    
    if(!doctorId)
    {
        throw new APIError(400, "Please proivde doctor id")
    }

    const DBDoctor = await User.findById(doctorId)
    
    
    if(!DBDoctor?._id)
    {
        throw new APIError(404, "Failed to find doctor from database, try again")
    }

    const allTimes = DBDoctor.doctorField?.times || {}

    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully fetched times of doctor", {times: allTimes})
    )



} )

export {getDoctorTimes}