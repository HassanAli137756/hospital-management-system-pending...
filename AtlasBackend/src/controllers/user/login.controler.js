import { Profile } from '../../models/Profile.model.js'
import { User } from '../../models/User.model.js'
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'


const generateAccessAndRefreshTokens = async (userId) => {
    const DBUser = await User.findById(userId)

    const accessToken = await DBUser.generateAccessToken()
    const refreshToken = await DBUser.generateRefreshToken()


    DBUser.refreshToken = refreshToken

    await DBUser.save({ validateBeforeSave: false })


    return { accessToken, refreshToken }

}




const login = asyncHandler(async (req, res) => {
    const userRefrence = req.body?.userRefrence?.toLowerCase()
    const password = req.body?.password

    if (!userRefrence?.trim() || !password?.trim()) {
        throw new APIError(400, "Please provide emial or user-name and password")
    }


    const DBUser = await User.findOne(
        {
            $or: [{ email: userRefrence }, { userName: userRefrence }]
        }
    )

    if (!DBUser) {
        throw new APIError(404, "User with given credentials does not exist")
    }

    const ispasswordCorrect = await DBUser.isPasswordCorrect(password)

    if (!ispasswordCorrect) {
        throw new APIError(500, "Password is invalid")
    }

    let userProfileId = null

    const DBProfile = await Profile.findOne({ "patientAccount": DBUser?._id })

    if (!DBProfile?._id) {
        console.log("New Profile Created");

        const newProfile = await Profile.create(
            {
                cellNo: DBUser.cellNo,
                name: DBUser.fullName,
                patientAccount: DBUser._id
            }
        )

        userProfileId = newProfile._id

    }
    else {
        userProfileId = DBProfile._id
    }



    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(DBUser._id)


    if (!(accessToken || refreshToken)) {
        throw new APIError(500, "Failed to generate login session")
    }

    const cookieOptions =
    {
        httpOnly: true,
        sameSite: 'none',
        secure: true

    }

    if(!userProfileId)
    {
        throw new APIError(500, "Failed to find profile, please try again")
    }


    console.log("DBuser: ", DBUser, refreshToken);



    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new APIResponse(200, "Successfully login", {user: DBUser, userProfileId })
        )



})

export { login, generateAccessAndRefreshTokens }