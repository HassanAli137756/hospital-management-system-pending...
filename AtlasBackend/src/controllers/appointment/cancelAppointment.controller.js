import { Appointment } from "../../models/Appointment.model.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'



const cacellingAppointment = asyncHandler( async (req, res) =>
{
    // ************************* FLOW *****************************
    /* 
    1. checking authentication
    2. checking is user authorized to cancel it
    3. checking is status is pending
    4. checking if cancellation time is present
    5. then cancell appointment or document will be deleted
    */

    const requester = req.user
    const appointmentId = req.params?.appointmentId
    let allowedDoctor = []

    if(!appointmentId)
    {
        throw new APIError(400, "Appointment refrence is not provided")
    }
    

    if(!requester._id)
    {
        throw new APIError(401, "User is not authorized to perform this action")
    }

    if(requester.role == "receptionist")
    {
        const receptionist = await User.findOne({role: "receptionist"})

        if(!receptionist?._id)
        {
            throw new APIError(500, "Failed to field receptionist from database")   
        }
        allowedDoctor = receptionist.receptionistField.controls.allowedToUpdateStatus

    }
    
    const appointment = await Appointment.findById(appointmentId).populate("userProfileId")


    if(!appointment._id)
    {
        throw new APIError(404, "Appointment is not exist")
    }

    if(!appointment.createdBy.equals(requester._id) && !appointment.userProfileId.patientAccount.equals(requester._id) && !(requester.role !== "receptionist" && allowedDoctor.includes(appointment.doctor)) && requester.role !== "admin")
    {
        throw new APIError(403, "You are not allowed to cancel this appointment")
    }

    if(appointment.status !== "pending")
    {
        throw new APIError(403, "Appointment has done or already cancelled")
    }

    if(appointment.times.cancellingTime < Date.now())
    {
        throw new APIError(403, "No time left to cancell this appointment")
    }

    const deletingInstance = await Appointment.deleteOne({_id: appointmentId})

    
    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully cancelled appointment")
    )


})