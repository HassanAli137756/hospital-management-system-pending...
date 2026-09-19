
import mongoose, {Schema} from 'mongoose'

const appointmentSchema = new Schema(
{
    createdBy:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    statusUpdatedBy:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    userProfileId:
    {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    generalPatientInfo:
    {
        type:
        {
            patientName:
            {
                type: String,
                required: true
            },
            email:
            {
                type: String
            },
            cellNo:
            {
                type: String
            }
        }
    },
    doctor:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    times:
    {
        time: String,
        date: Date,
        cancellingTime: Number,
        remainingTime: Number,
        timeOfUpdation: Number

    },
    
    forSession:
    {
        type: String,
        enum: ["cupping", "physio", "dry-needling", "checkup"],
        trim: true,
        default: "checkup",
        required: true
    },
    payment:
    {
        type: Number,
    },
    diagnoses:
    {
        type: String
    },
    cups:
    {
        type: String
    },
    status:
    {
        type: String,
        enum: ["pending", "done", "cancelled"],
        default: "pending"
    }
    


}
)


export const Appointment = mongoose.model("Appointment", appointmentSchema)


