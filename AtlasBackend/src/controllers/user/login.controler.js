import {User} from '../../models/User.model.js'
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'


const generateAccessAndRefreshTokens = async (userId) =>
{
    const DBUser = await User.findById(userId)

    const accessToken = await DBUser.generateAccessToken()
    const refreshToken = await DBUser.generateRefreshToken()

    
    DBUser.refreshToken = refreshToken

    await DBUser.save({validateBeforeSave: false})

    
    return {accessToken, refreshToken}
        
}




const login = asyncHandler( async (req, res) =>
{
    const userRefrence = req.body?.userRefrence?.toLowerCase()

    if(!userRefrence)
    {
        throw new APIError(400, "Please provide emial or user-name")
    }

    
    const DBUser = await User.findOne(
    {
        $or: [{email: userRefrence}, {userName: userRefrence}]
    }
    )

    if(!DBUser)
    {
        throw new APIError(404, "User with given credentials does not exist")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(DBUser._id)


    if(!(accessToken || refreshToken))
    {
        throw new APIError(500, "Failed to generate login session")
    }

    const cookieOptions = 
    {
        httpOnly: true,
        sameSite: 'none',
        secure: true

    }


    console.log("DBuser: ", DBUser, refreshToken);
    


    return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
        new APIResponse(200, "Successfully login", {accessToken, refreshToken, user: DBUser})
    )



})

export {login, generateAccessAndRefreshTokens}