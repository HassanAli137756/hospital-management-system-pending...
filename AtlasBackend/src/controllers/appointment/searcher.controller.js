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
    const 
    {
        name,
        email,
        cellNo,
        doctor,
        forSession,
        payment=0,
        isPaymentBased=0,
        diagnoses,
        cups=0,
        status,
        starting="",
        ending=""
    } = req.body

    const presentDate = new Date()
    const presentDay = presentDate.toLocaleDateString("en-US", {weekday: "long"}).toLowerCase()
    let startingDate = new Date(presentDate)
    let endingDate = new Date(startingDate)
    endingDate.setDate(startingDate.getDate() + 1)
    startingDate.setHours(0, 0, 0, 0)
    endingDate.setHours(0, 0, 0, 0)

    if(!user?._id)
    {
        throw new APIError(401, "Please login to see your history")
    }
    
    const options = {}

    if(user.role == "doctor")
    {
        options.doctor = user?._id
    }
    else if(user.role == "patient")
    {
        const userProfile = await Profile.findOne({patientAccount: user?._id})

        if(!userProfile?._id)
        {
            throw new APIError(403, "Failed to find user profile from database")
        }

        options.userProfileId = userProfile._id

    }


    if(name?.trim || email?.trim  || cellNo?.trim  )
    {
        console.log("YES FIELDS ARE PROVIDED");
        

        if(name?.length > 0)
        {
            options["generalPatientInfo.patientName"] = name
        }

        if(email?.length > 0)
        {
            options["generalPatientInfo.email"] = email
        }

        if(cellNo?.length > 0)
        {
            options["generalPatientInfo.cellNo"] = cellNo
        }

    }

    if(doctor?.length > 0 && user.role !== "doctor")
    {
        options.doctor = doctor
    }

    if(forSession?.length > 0)
    {
        options.forSession = forSession
    }

    if(isPaymentBased == 1)
    {
        options.payment = payment
    }

    if(diagnoses?.length > 0)
    {
        options.diagnoses = diagnoses
    }

    if(cups > 0)
    {
        options.cups = cups
    }
    
    if(status?.length > 0)
    {
        options.status = status
    }

    if(starting?.length > 0)
    {
        startingDate = new Date(starting)
    }

    if(ending?.length > 0)
    {
        endingDate = new Date(ending)
    }

    
    if(user.role == "receptionist")
    {
        const receptionist = await User.findById(user._id)

        if(!receptionist._id)
        {
            throw new APIError(403, "Failed to find receptionist data from database")
        }

        if(receptionist.receptionistField.controls.allPaymentAccessPeriod == "week")
        {
            if(presentDay == "tuesday")
            {
                starting(presentDate.getDate() - 1)
            }
            else if(presentDay == "wednesday")
            {
                starting(presentDate.getDate() - 2)
            }
            else if(presentDay == "thursday")
            {
                starting(presentDate.getDate() - 3)
            }
            else if(presentDay == "firday")
            {
                starting(presentDate.getDate() - 4)
            }
            else if(presentDay == "saturday")
            {
                starting(presentDate.getDate() - 5)
            }
            else if(presentDay == "sunday")
            {
                starting(presentDate.getDate() - 6)
            }
            
        }
        else if(receptionist.receptionistField.controls.allPaymentAccessPeriod == "month")
        {
            startingDate.setDate(1)
            endingDate.getDate(30)
        }
        else if(receptionist.receptionistField.controls.allPaymentAccessPeriod == "year")
        {
            startingDate.setMonth(0)
            endingDate.setMonth(11)
        }
        else if (receptionist.receptionistField.controls.allPaymentAccessPeriod == "all") {

            if (starting?.length > 0) {
                startingDate = new Date(starting)
            }

            if (ending?.length > 0) {
                endingDate = new Date(ending)
            }
        }
    }

    options["times.date"] =
    {
        $gte: startingDate,
        $lt: endingDate,
    }

    



    const targettedAppointments = await Appointment
    .find(options)
    .populate("userProfileId")
    .populate("doctor", "userName avatar")
    .populate({
        path: "userProfileId",
        populate: {
            path: "patientAccount",
            select: "userName avatar"
        }
    })

    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully fetched targetted appointments", {appointments: targettedAppointments, providedOptions: options})
    )



})

export {appointmentSearcher}