import { Appointment } from "../../models/Appointment.model.js";
import { Profile } from "../../models/Profile.model.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'

// TODO
// DOCTOR DUTY STATUS CHECKS
// TIME AVAILABILITY CHECKS


const generateTimes = (appointmentRawDate, appointmentRawTime) =>
{
    if(!appointmentRawTime?.trim() || !appointmentRawDate?.trim())
    {
        return {sessionTimeLine: "", cancellTimeLine: "", updationTimeLine: ""}
    }
    
    const currentDate = new Date()
    const appointmentDate = new Date(appointmentRawDate)
    const [hours, minutes] = appointmentRawTime.split(":").map(field => field)

    appointmentDate.setHours(hours ? Number(hours) + 12 : 0, Number(minutes) || 0, 0, 0)

    const sessionTimeLine = appointmentDate.getTime()
    const cancellTimeLine = appointmentDate.getTime() - (60 * 60 * 1000)
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

    console.log("ProfileId: ", profileId, patientId);
    
    if(
        [patientName, doctor, time, date, forSession, cellNo]
        .some(field => !field || field?.trim() == "")
    )
    {
        console.log("Please Provide all fields", patientName, doctor, time, date, forSession, profileId);
        throw new APIError(400, "Please provide all required fields")
        

    }

    
    if(creater?.role === "patient")
    {
        const DBProfile = await Profile.findOne({patientAccount: creater._id})

        console.error("role is patient")
        
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

    
    if(!profileId)
    {
        throw new APIError(400, "Please provide patient profile-id")
        

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
    

    if(!cancellTimeLine || !sessionTimeLine )
    {
        throw new APIError(500, "Failed to generate times")
    }


    const newAppointment = await Appointment.create(
    {
        createdBy: creater?._id,
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



/* 
import { Appointment } from "../../models/Appointment.model.js";
import { Profile } from "../../models/Profile.model.js";
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js';
import { APIResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHander.js';


const generateTimes = (appointmentRawDate, appointmentRawTime) => {
    const now = new Date();
    
    // Parse the appointment date and extract hours/minutes safely
    const [hours, minutes] = appointmentRawTime.split(":").map(Number);
    const appointmentDate = new Date(appointmentRawDate);
    appointmentDate.setHours(hours || 0, minutes || 0, 0, 0);

    // Calculate time difference in absolute milliseconds
    const timeDifferenceMs = appointmentDate.getTime() - now.getTime();
    
    // Fallback to 0 if the appointment date is technically in the past
    const totalHoursRemaining = Math.max(0, Math.floor(timeDifferenceMs / (1000 * 60 * 60)));

    const sessionTimeLine = new Date(now.getTime() + ((totalHoursRemaining + 1) * 60 * 60 * 1000));
    const cancellTimeLine = new Date(now.getTime() + (totalHoursRemaining * 60 * 60 * 1000));
    const updationTimeLine = new Date(now.getTime() + (15 * 60 * 1000));

    return { sessionTimeLine, cancellTimeLine, updationTimeLine };
};

const addAppointment = asyncHandler(async (req, res) => {
    const { 
        patientName, 
        email, 
        cellNo = "", 
        doctor, 
        time, 
        date, 
        forSession, 
        diagnoses, 
        patientId, 
        payment, 
        status = "pending" 
    } = req.body;

    const creater = req.user;
    let profileId = patientId;

    if (!creater?._id) {
        throw new APIError(401, "Please login to book an appointment");
    }

    // Handle patient profile generation automatically if it doesn't exist
    if (creater?.role === "patient") {
        const DBProfile = await Profile.findOne({ patientAccount: patientId });
        if (!DBProfile?._id) {
            const newProfile = await Profile.create({ cellNo, name: patientName, patientAccount: patientId });
            if (!newProfile?._id) {
                throw new APIError(500, "Failed to create new profile, try again");
            }
            profileId = newProfile._id;
        } else {
            profileId = DBProfile._id;
        }
    }

    // Comprehensive required fields check (Safe against numeric types)
    const requiredFields = [patientName, doctor, time, date, forSession, profileId];
    if (requiredFields.some(field => !field || String(field).trim() === "")) {
        throw new APIError(400, "Please provide all required fields");
    }

    // Day of the week check
    const bookingDate = new Date(date);
    if (bookingDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase() === "sunday") {
        throw new APIError(400, "Sunday is off, please book an appointment on another day");
    }

    // Fixed phone number validation length logic
    const sanitizedCell = cellNo?.replace(/-/g, "");
    if (sanitizedCell && sanitizedCell.length !== 11) {
        throw new APIError(400, "Enter a valid 11 digit phone number");
    }

    // Calculate timelines dynamically
    const { cancellTimeLine, sessionTimeLine, updationTimeLine } = generateTimes(date, time);

    // Save mapping to database
    const newAppointment = await Appointment.create({
        createdBy: creater._id, // Fixed: changed from undefined createrId
        diagnoses,
        doctor,
        payment,
        forSession,
        generalPatientInfo: {
            cellNo: sanitizedCell,
            email,
            patientName
        },
        status,
        times: {
            cancellingTime: cancellTimeLine,
            date: bookingDate,
            remainingTime: sessionTimeLine,
            time: time,
            timeOfUpdation: updationTimeLine
        },
        userProfileId: profileId
    });

    return res
        .status(201)
        .json(new APIResponse(201, "Successfully booked an appointment", newAppointment));
});

export { addAppointment, generateTimes };
 */