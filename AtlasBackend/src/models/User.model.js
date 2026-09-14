
import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const UserSchema = new Schema(
{
    userName:
    {
        type: String,
        required: true,
        unique: true
    },
    fullName:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    address:
    {
        type: String,
    },
    cellNo:
    {
        type: String,
        required: true
    },
    refreshToken:
    {
        type: String,
    },
    avatar:
    {
        type: String,
    },
    avatarPublicID:
    {
        type: String,
    },
    role:
    {
        type: Array,
        default: ["patient"]
    },
    gender:
    {
        type: String,
        enum: ["Male", "Female", "Others"],
        default: "Male"
    },
    receptionistField:
    {
        type:
        {
            controls:
            {
                type:
                {
                            
                    allPaymentAccess: 
                    {
                        type: Boolean,
                        default: false
                    },
                    allowedToUpdateStatus: [ String ],
                }
            }
        }
    },
    doctorField:
    {
        type:
        {
            Times:
            {
                type: 
                {
                    today:
                    {
                        type:
                        [
                            {
                                time: String,
                                date: String,
                                availability: Boolean
                            }
                        ]
                    },
                    tomorrow:
                    {
                        type: 
                        [
                            {
                                time: String,
                                date: String,
                                availability: Boolean
                            }
                        ]
                    },
                    afterTomorrow:
                    {
                        type:
                        [
                            {
                                time: String,
                                date: String,
                                availability: Boolean
                            }
                        ] 
                        
                    },
                }
            },
            onDuty:
            {
                type: Boolean
            },
            controlsOfReceptionist:
            {
                type: Object
            }
        }
    }


}
)


UserSchema.pre("save", async function()
{
    
    if(!this.isModified('password')) return null

    this.password = await bcrypt.hash(this.password, 15)

})


UserSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateAccessToken = async function() 
{
    return await jwt.sign(
    {
        _id: this._id,
        email: this.email,
        userName: this.userName,
        role: this.role,
        
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

UserSchema.methods.generateRefreshToken = async function()
{
    return await jwt.sign(
    {
        _id: this._id,
        role: this.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}


export const User = mongoose.model("User", UserSchema)