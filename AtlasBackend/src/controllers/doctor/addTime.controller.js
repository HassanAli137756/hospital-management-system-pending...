
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'


const addTime = asyncHandler( async (req, res) =>
{
    const user = req.user
    const
    {
        newTime,
        day,
    } = req.body

    const presentDate = new Date()
    const addingDate = new Date()


    if(!newTime?.trim().length > 0 || !day?.trim().length > 0)
    {
        throw new APIError(403, "Please provide all required fields")
    }



    if(
        [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
        ].every(field => field !== day)
    )
    {
        throw new APIError(400, "Please provide correct day")
    }
    
    
    const DBDoctor = await User.findById(user?._id)
    
    if(!DBDoctor?._id)
    {
        throw new APIError(403, "Failed to find doctor from database")
    }


    if(DBDoctor.doctorField.times[day].some(field => field.time == newTime))
    {
        throw new APIError(400, "Given Time is already existed")
    }

    DBDoctor.doctorField.times[day].push({availability: true, time: newTime})


    await DBDoctor.save({validateBeforeSave: false})


    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully added new time", DBDoctor)
    )


})


export {addTime}


