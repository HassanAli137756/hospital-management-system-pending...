
import mongoose, {Schema} from 'mongoose'

const appointmentSchema = new Schema(
{
    createdBy:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    doneBy:
    {
        type: String,
        default: "receptionist"
    },
    userProfileId:
    {
        type: mongoose.Types.ObjectId,
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
        type: String,
        required: true
    },
    times:
    {
        type:
        {
            time: String,
            date: Date,
            cancellingTime: Number,
            remainingTime: Number,
            timeOfUpdation: Number

        }
    },
    
    forSession:
    {
        type: String,
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