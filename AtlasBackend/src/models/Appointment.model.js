
import mongoose, {Schema} from 'mongoose'

const appointmentSchema = new Schema(
{
    userProfileId:
    {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    generalPatientInfo:
    {
        type:
        {
            userName:
            {
                type: String,
                required: true
            },
            Email:
            {
                type: String
            },
            CellNo:
            {
                type: String
            }
        }
    },
    doctor:
    {
        type: String,
        required: true
    },
    time:
    {
        type: String,
        required: true
    },
    date:
    {
        type: String,
        required: true
    },
    forSession:
    {
        type: String,
        required: true
    },
    payment:
    {
        type: String,
    },
    diagnoses:
    {
        type: ""
    },
    cups:
    {
        type: String
    },
    status:
    {
        typeof: String,
        enum: ["pending", "done", "cancelled"],
        default: "pending"
    }


}
)


export const Appointment = mongoose.model("Appointment", appointmentSchema)