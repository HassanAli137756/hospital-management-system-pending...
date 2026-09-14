import { Appointment } from "../../models/Appointment.model.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'



const updatingStatus = asyncHandler( async (req, res) =>
{
    const
    {
        status
    } = req.body
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

    if(!status)
    {
        throw new APIError(400, "Please provide status to update")   
    }

    
    const appointment = await Appointment.findById(appointmentId)


    if(!appointment._id)
    {
        throw new APIError(404, "Appointment is not exist")
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
    

    if((requester.role == "receptionist" && allowedDoctor.includes(appointment.doctor)) || requester.role == "admin")
    {
        appointment.status = status

        await appointment.save({validateBeforSave: false})

        

        return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully updated status", appointment)
        )


    }
    else
    {

        throw new APIError(403, "You are not allowed to update this appointment")
    }

    

})

export {updatingStatus}