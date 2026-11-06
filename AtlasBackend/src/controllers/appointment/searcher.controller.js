import { Appointment } from "../../models/Appointment.model.js";
import { Profile } from "../../models/Profile.model.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'

const appointmentSearcher = asyncHandler( async (req, res) =>
{
    const user = req.user
    const name = req?.body?.name
    const email = req?.body?.email
    const cellNo= req?.body?.cellNo
    const doctor = req?.body?.doctor
    const forSession = req?.body?.forSession
    const status = req?.body?.status
    const starting = req?.body?.starting
    const ending = req?.body?.ending
    const paymentStatus = req?.body?.paymentStatus
    const userProfileId = req?.body?.userProfileId

    
    if (!user?._id) {
        throw new APIError(401, "Please login to see your history")
    }

    if (!starting || !ending) {
        throw new APIError(400, "Please provide starting and ending dates")
    }


    let startingInput = new Date(starting).toLocaleDateString("en-CA");
    let endingInput = new Date(ending).toLocaleDateString("en-CA");
    let GeneralStartingDate = new Date(startingInput + "T00:00:00.000Z");
    let GeneralEndingDate = new Date(endingInput + "T23:59:59.999Z");

    console.log("GeneralStartingDate: ",GeneralStartingDate);
    console.log("GeneralEndingDate: ",GeneralEndingDate);
    


    const options = {}


    if( (name?.trim || email?.trim  || cellNo?.trim) && user?.role !== "patient"  )
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

    if(doctor?.length > 0)
    {
        options.doctor = doctor
    }

    if(forSession?.length > 0)
    {
        options.forSession = forSession
    }

    if(userProfileId?.length > 0)
    {
        options.userProfileId = userProfileId
    }

    if(paymentStatus?.length > 0)
    {
        options.paymentStatus = paymentStatus
    }
   
    if(status?.length > 0)
    {
        options.status = status
    }


    options["times.date"] =
    {
        $gte: GeneralStartingDate,
        $lt: GeneralEndingDate,
    }


    const targettedAppointments = await Appointment
    .find(options)
    .populate("userProfileId")
    .populate("doctor", "fullName avatar")
    .populate({
        path: "userProfileId",
        populate: {
            path: "patientAccount",
            select: "fullName email cellNo avatar"
        }
    })
    .sort({"times.date": -1})

    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully fetched targetted appointments",targettedAppointments)
    )

})

export {appointmentSearcher}