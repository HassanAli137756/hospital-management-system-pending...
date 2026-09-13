import { Appointment } from "../../models/Appointment.model";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'



const generateTimes = (appointmentRawDate, appointmentRawTime='') =>
{
    const date = new Date(appointmentRawDate)
    const currentDate = new Date()
    let todayHours = Number(appointmentRawTime.slice(0, 2)) - currentDate.getHours()
    let totalDays = currentDate.getDate() - date.getDate()

    let totalHours = 0

    
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
        todayHours = (totalDays * 24) - 1
    }


    const sessionRemainTime = totalHours * 60 * 1000
}




const addAppointment = asyncHandler( async (req, res) =>
{
    //                    FLOW
    /* 
    1. user should authorized, checking in req.user
    2. time validations like if today is sunday
    3. time sloting checking for availability
    4. generating cancellingTime and remainingTime
    */

    const 
    {
        createdBy,
        patientName,
        email,
        cellNo,
        doctor,
        time,
        date,
        forSession,
        diagnoses,
        patientId
    } = req.body

    const createrId = req?.user?._id

    if(createrId)
    {
        throw new APIError(401, "Please login to book an appointment")
    }

    if(
        [patientName, doctor, time, date, forSession,]
        .some(field => !field || field?.trim() == "")
    )
    {
        throw new APIError(400, "Please provide all required fields")

    }

    const bookingDate = new Date(date)

    if(bookingDate.toLocaleDateString("en-US", {weekday: "long"}).toLocaleLowerCase() === "sunday")
    {
        throw new APIError(400, "Sunday is off, please booked appointment on another day")
    }



    const DBUserId = await User.findOne({email}).select("_id").lean()

    


})