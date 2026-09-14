import { Appointment } from "../../models/Appointment.model.js";
import { Profile } from "../../models/Profile.model.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'

// TODO
// TIME AVAILABILITY CHECKS


const generateTimes = (appointmentRawDate, appointmentRawTime) =>
{
    const presentDate = new Date()
    const appointmentDate = new Date(appointmentRawDate)
    
    const appointedTime = Number(appointmentRawTime.slice(0, 2))
    const currentTime = presentDate.getHours()
    const totalDays = presentDate.getDay() - appointmentDate.getDay()
    let totalHours = 0
    let todayHours = appointedTime - currentTime

    if(totalDays > 1)
    {
        if(todayHours < 0)
        {
            todayHours = 24 + todayHours
        }
        else
        {
            todayHours = 24 - todayHours
        }
    }

    if(todayHours < 0  && totalDays == 1)
    {
        totalHours = (24 + todayHours) - 1
    }
    else if(todayHours > 0 && totalDays == 0)
    {
        totalHours = todayHours - 1 
    }
    else if(totalDays > 1)
    {
        totalHours = (((totalDays - 1) * 24) + todayHours) - 1
    }



    const sessionTimeLine = ((totalHours + 1) * 60 * 60 * 1000) + Date.now()
    const cancellTimeLine = (totalHours * 60 * 60 * 1000) + Date.now()
    const updationTimeLine = Date.now() + (15 * 60 * 1000)

    return {sessionTimeLine, cancellTimeLine, updationTimeLine}
}




const addAppointment = asyncHandler( async (req, res) =>
{
    const 
    {
        patientName,
        email,
        cellNo="",
        doctor,
        time,
        date,
        forSession,
        diagnoses,
        patientId,
        payment,
        status="pending"
    } = req.body

    const creater = req.user
    let profileId = patientId

    if(!creater?._id)
    {
        throw new APIError(401, "Please login to book an appointment")
    }

    if(creater?.role === "patient")
    {
        const DBProfile = await Profile.findOne({patientAccount: patientId})

        if(!DBProfile?._id)
        {
            const newProfile = await Profile.create({cellNo: cellNo, name: patientName, patientAccount: patientId})

            if(!newProfile._id)
            {
                throw new APIError(500, "Failed to create new profile, try again")
            }

            profileId = newProfile._id

        }
        else
        {
            profileId = DBProfile._id
        }
    }

    if(
        [patientName, doctor, time, date, forSession, profileId]
        .some(field => !field || field?.trim() == "")
    )
    {
        throw new APIError(400, "Please provide all required fields")

    }

    const bookingDate = new Date(date)
    const currentDate = new Date()

    if(bookingDate.toLocaleDateString("en-US", {weekday: "long"}).toLocaleLowerCase() === "sunday")
    {
        throw new APIError(400, "Sunday is off, please booked appointment on another day")
    }



    if(cellNo?.replace("-", "")?.length <= 12 && cellNo?.replace("-", "")?.length >= 12)
    {
        throw new APIError(400, "Enter a valid 11 digit phone number")

    }

  
    const {cancellTimeLine, sessionTimeLine, updationTimeLine} = generateTimes(date, time)
    


    const newAppointment = await Appointment.create(
    {
        createdBy: createrId,
        diagnoses,
        doctor,
        payment,
        forSession,
        generalPatientInfo: 
        {
            cellNo: cellNo?.replace("-", ""),
            email,
            patientName
        },
        status,
        times:
        {
            cancellingTime: cancellTimeLine,
            date: bookingDate,
            remainingTime: sessionTimeLine,
            time: time,
            timeOfUpdation: updationTimeLine
        },
        userProfileId: profileId
    }
    )


    return res
    .status(201)
    .json(
        new APIResponse(201, "Successfully booked an appointment", newAppointment)
    )



})



export {addAppointment, generateTimes}