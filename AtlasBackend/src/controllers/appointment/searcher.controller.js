import { Appointment } from "../../models/Appointment.model.js";
import { Profile } from "../../models/Profile.model.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'

const appointmentSearcher = asyncHandler( async (req, res) =>
{
    // ****************** FLOW ***********************
    /* 
    1. authenitcation user should be logged-in
    2. make an empty object, and then add fields comming from frontend
    3. searcher will be based on: 
        a.userProfileId(if user is patient add this field in object first by find Profile doc based on req.user._id)
        b. email,
        cellNo
        doctor
        date
        forSession
        payment(for not paid sessions)
        diagnoses
        cups
        status
    
    */

    const user = req.user
    const availableOptions = req.body || {}

    const startingData = new Date()
    const endingDate = new Date(startingData)


    endingDate.setDate(startingData.getDate() + 1)
    startingData.setHours(0, 0, 0, 0)
    endingDate.setHours(0, 0, 0, 0)

    if(!user?._id)
    {
        throw new APIError(401, "Please login to see your history")
    }

    const options = {}

    if(user.role == "patient")
    {
        const userProfile = await Profile.findById(user._id)

        if(!userProfile?._id)
        {
            throw new APIError(403, "Failed to find user profile from database")
        }

        options.userProfileId = userProfile._id

    }

    
    const fieldsSetter = (obj={}) =>
    {
        Object.keys(obj).map(key =>
        {
            if(obj[key] !== "")
            {
                options[key] = obj[key]
            }
        }
        )
    }

    fieldsSetter(availableOptions)






})