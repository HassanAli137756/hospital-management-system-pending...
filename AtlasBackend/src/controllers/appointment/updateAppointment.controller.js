import { Appointment } from "../../models/Appointment.model.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'
import { generateTimes } from "./addAppointment.controller.js";



const updatingAppointment = asyncHandler( async (req, res) =>
{
    const
    {
        patientName,
        email,
        cellNo,
        doctor,
        time,
        date,
        forSession,
        diagnoses,
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

    if(
        [
            patientName,
            email,
            cellNo,
            doctor,
            time,
            date,
            forSession,
            diagnoses
        ].every(field => field?.trim() == "")
    )
    {
        throw new APIError(400, "Please provide at-least one field to update")   
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

    if((appointment.times.timeOfUpdation > Date.now() || requester.role == "receptionist" && allowedDoctor.includes(appointment.doctor)) || requester.role == "admin")
    {

        const DBAppointedTime = new Date(appointment.times.date)
        
        appointment.generalPatientInfo.cellNo = cellNo?.replace("-", "") || appointment.generalPatientInfo.cellNo,
        appointment.generalPatientInfo.email = email || appointment.generalPatientInfo.email,
        appointment.doctor = doctor || appointment.doctor,
        appointment.forSession = forSession || appointment.forSession,
        appointment.diagnoses = diagnoses || appointment.diagnoses

        if(time?.trim() || date?.trim())
        {
            const {cancellTimeLine, sessionTimeLine} = generateTimes(date ? new Date(date).toLocaleDateString() : DBAppointedTime.toLocaleDateString(), time.trim() ? time : appointment.times.time)

            appointment.times.cancellingTime = cancellTimeLine
            appointment.times.remainingTime = sessionTimeLine
        }

        await appointment.save({validateBeforSave: false})

        

        return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully updated appointment", appointment)
        )


    }
    else
    {

        throw new APIError(403, "You are not allowed to update this appointment")
    }

    

})

export {updatingAppointment}