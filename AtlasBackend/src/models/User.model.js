
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
    role:
    {
        type: String,
        enum: ["admin", "doctor", "receptionist", "patient"],default: "patient"
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
                        type: mongoose.Types.ObjectId
                    },
                    allowedToUpdateStatus:
                    [
                        {
                            type: mongoose.Types.ObjectId,
                            ref: "User"
                        }
                    ],
                    allowedDashboards:
                    [
                        {
                            type: mongoose.Types.ObjectId,
                            ref: "User"
                        }
                    ]
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


UserSchema.pre("save", async function(password)
{
    
    if(!this.isModified('password')) return null

    this.password = await bcrypt.hash(password, 15)

})


UserSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateAccessToken = async function() 
{
    return jwt.sign(
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
    return jwt.sign(
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