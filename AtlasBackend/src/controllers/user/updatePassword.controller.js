

import {User} from '../../models/User.model.js'
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'
import {uploadOnCloudinary} from '../../utils/cloudinary.js'


const updatePassword = asyncHandler( async (req, res) =>
{

    const userId = req.user?._id
    
    const 
    {
        currentPassword,
        newPassword,
    } = req.body

    console.log("Body of req", req.body);
    

    if(!userId)
    {
        throw new APIError(404, "user is not found through middleware");
    }

    if(!(currentPassword && newPassword))
    {
        throw new APIError(400, "Please provide both current and new password");
    }


    const DBUser = await User.findById(userId)

    if(!DBUser)
    {
        throw new APIError(404, "User not found");
    }

    const isPasswordCorrect = await DBUser.isPasswordCorrect(currentPassword)

    if(!isPasswordCorrect)
    {
        throw new APIError(400, "Please provide correct current password");
    }


    DBUser.password = newPassword

    await DBUser.save({validateBeforeSave: false})


    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully updated password", DBUser)
    )


})


export {updatePassword}