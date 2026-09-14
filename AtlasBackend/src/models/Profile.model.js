
import mongoose, {Schema} from 'mongoose'

const profileSchema = new Schema(
{
    name:
    {
        type: String,
        required: true
    },
    cellNo:
    {
        type: String,
        required: true
    },
    patientAccount:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}
)


export const Profile = mongoose.model("Profile", profileSchema)