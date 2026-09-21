
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

'6aad854ff9c8d163d091f2dd'
'6aad854ff9c8d163d091f2dd'

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
            type: String,
            enum: ["docotr", "patient", "admin", "receptionist", "sub-admin"],
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
            controls:
            {
                allPaymentAccessPeriod:
                {
                    type: String,
                    enum: ["week", "month", "year", "all"],
                    default: "month"
                },
                allowedToUpdateStatus: [],
            }
        },
        doctorField:
        {
            times:
            {
                monday:
                [
                    {
                        time: String,
                        availability:
                        {
                            type: Boolean,
                            default: true
                        },
                        status:
                        {
                            type: Boolean,
                            default: true
                        }
                    }
                ],
                tuesday:
                [
                    {
                        time: String,
                        availability:
                        {
                            type: Boolean,
                            default: true
                        },
                        status:
                        {
                            type: Boolean,
                            default: true
                        }
                    }
                        
                ],
                wednesday:
                [
                    {
                        time: String,
                        availability:
                        {
                            type: Boolean,
                            default: true
                        },
                        status:
                        {
                            type: Boolean,
                            default: true
                        }
                    }
                        
                ],
                thursday:
                [
                    {
                        time: String,
                        availability:
                        {
                            type: Boolean,
                            default: true
                        },
                        status:
                        {
                            type: Boolean,
                            default: true
                        }
                    }
                        
                ],
                friday:
                [
                    {
                        time: String,
                        availability:
                        {
                            type: Boolean,
                            default: true
                        },
                        status:
                        {
                            type: Boolean,
                            default: true
                        }
                    }
                        
                ],
                saturday:
                [
                    {
                        time: String,
                        availability:
                        {
                            type: Boolean,
                            default: true
                        },
                        status:
                        {
                            type: Boolean,
                            default: true
                        }
                        }

                    ]
            }
            ,
            onDuty:
            {
                type: Boolean,
                default: true
            }
        }


    },
    {
        timestamps: true
    }
)


UserSchema.pre("save", async function () {

    if (!this.isModified('password')) return null

    this.password = await bcrypt.hash(this.password, 15)

})


UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateAccessToken = async function () {
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

UserSchema.methods.generateRefreshToken = async function () {
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



