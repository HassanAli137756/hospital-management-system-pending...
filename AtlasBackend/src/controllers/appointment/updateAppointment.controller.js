import { Appointment } from "../../models/Appointment.model.js";
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'
import { generateTimes } from "./addAppointment.controller.js";



const updatingAppointment = asyncHandler(async (req, res) => {
    const patientName = req?.body?.patientName
    const email = req?.body?.email
    const cellNo = req?.body?.cellNo
    const doctor = req?.body?.doctor
    const time = req?.body?.time
    const date = req?.body?.date
    const forSession = req?.body?.forSession
    const diagnoses = req?.body?.diagnoses
    const paymentStatus = req?.body?.paymentStatus
    const treatmentStatus = req?.body?.treatmentStatus
    const paid = req?.body?.paid
    const payable = req?.body?.payable
    const appointmentId = req?.body?.appointmentId


    const requester = req.user

    if (!appointmentId) {
        throw new APIError(400, "Appointment refrence is not provided")
    }


    if (!requester?._id) {
        throw new APIError(401, "User is not authorized to perform this action")
    }




    if (
        [
           patientName, 
           email, 
           cellNo, 
           doctor, 
           time, 
           date, 
           forSession, 
           diagnoses, 
           paymentStatus, 
           treatmentStatus, 
           paid, 
           payable, 
        ].every(field => !field)
    ) {
        throw new APIError(401, "Please provide atleast one field to update")
    }




    const appointment = await Appointment.findById(appointmentId).populate("userProfileId")



    if (!appointment?._id) {
        throw new APIError(404, "Appointment is not exist")
    }


    if (requester?.role == "patient" && requester?._id !== appointment.createdBy) {
        throw new APIError(401, "You are not allowed to update this appointment")
    }

    if ((requester?.role == "patient" && requester?._id == appointment.createdBy) &&
        !(appointment.times.timeOfUpdation > Date.now())) {
        throw new APIError(401, "You are not allowed to update this appointment")
    }


    if ((paymentStatus || treatmentStatus || paid || payable) && requester?.role == "patient") {
        throw new APIError(401, "You are not allowed to update this field of appointment")
    }
    else if ((paymentStatus || treatmentStatus || paid || payable) && (requester?.role !== "receptionist" && requester?._id !== appointment?.createdBy)) {
        throw new APIError(401, "You are not allowed to update this field of appointment")
    }

    const DBAppointedTime = new Date(appointment.times.date)

    appointment.generalPatientInfo.patientName = patientName || appointment.generalPatientInfo.patientName,
    appointment.generalPatientInfo.cellNo = cellNo?.replace("-", "") || appointment.generalPatientInfo.cellNo,
    appointment.generalPatientInfo.email = email || appointment.generalPatientInfo.email,
    appointment.doctor = doctor || appointment.doctor,
    appointment.forSession = forSession || appointment.forSession,
    appointment.diagnoses = diagnoses || appointment.diagnoses
    appointment.paymentStatus = paymentStatus || paid > 0 ? "paid" : appointment.paymentStatus
    appointment.status = treatmentStatus || appointment.status
    //appointment.paymentSection?.paid = paid || appointment.paymentSection?.paid
    //appointment.paymentSection?.payable = payable || appointment.paymentSection?.payable

    if (time?.trim() || date?.trim()) {
        const { cancellTimeLine, sessionTimeLine } = generateTimes(date ? new Date(date).toLocaleDateString() : DBAppointedTime.toLocaleDateString(), time.trim() ? time : appointment.times.time)

        appointment.times.cancellingTime = cancellTimeLine
        appointment.times.remainingTime = sessionTimeLine
    }

    await appointment.save({ validateBeforSave: false })



    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully updated appointment", appointment)
        )




})

export { updatingAppointment }