
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'


const deleteTime = asyncHandler(async (req, res) => {
    const user = req.user
    const 
    {
        deletingTime,
        day
    } = req.body

    if (!deletingTime?.trim().length > 0 || !day?.trim().length > 0) {
        throw new APIError(403, "Please provide all required fields")
    }

    const DBDoctor = await User.findById(user._id).select("-password -refreshToken -receptionistField -doctorField.onDuty -avatarPublicID")

    if (!DBDoctor._id) {
        throw new APIError(403, "Failed to find doctor from database")
    }


    if (
        [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
        ].every(field => field !== day)
    ) {
        throw new APIError(400, "Please provide correct day")
    }

    const targettedTimes = DBDoctor.doctorField.times[day] || []

    if (targettedTimes.some(field => !field.availability)) {
        throw new APIError(400, "Given time is booked by a patient which can't be deleted")
    }

    if (targettedTimes.every(field => field.time !== deletingTime )) {
        throw new APIError(400, "Given time is not included in provided day")
    }

    DBDoctor.doctorField.times[day] = targettedTimes.filter(time => time.time !== deletingTime)


    await DBDoctor.save({ validateBeforeSave: false })


    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully delete time", DBDoctor)
        )


})


export { deleteTime }




