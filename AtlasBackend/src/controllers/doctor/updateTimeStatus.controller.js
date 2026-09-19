import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'


const updateTimeStatus = asyncHandler( async (req, res) =>
{
    const user = req.user
    const updatingTime = req.body
    const section = req.body

    if(!updatingTime?.trim().length > 0 || !section?.trim().length > 0)
    {
        throw new APIError(403, "Please provide all required fields")
    }
    
    const DBDoctor = await User.findById(user._id)
    
    if(!DBDoctor._id)
    {
        throw new APIError(403, "Failed to find doctor from database")
    }

    if(!(section == "today" || section == "tomorrow" || section == "afterTomorrow") )
    {
        throw new APIError(400, "Please provide a valid section")
    }

    const targettedTimes = DBDoctor.doctorField.Times[section] || []

    if(targettedTimes.some(field => !field.availability))
    {
        throw new APIError(400, "Status can't be changed as booked by a patient")
    }

    DBDoctor.doctorField.Times.today.map(time => (time.time == updatingTime ? {...time, status: !time.status} : time))


    await DBDoctor.save({validateBeforeSave: false})


    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully update status of given time", DBDoctor)
    )


})


export {updateTimeStatus}





