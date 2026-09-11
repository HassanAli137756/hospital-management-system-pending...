

import {User} from '../../models/User.model.js'
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'
import {uploadOnCloudinary} from '../../utils/cloudinary.js'


const updateAccount = asyncHandler( async (req, res) =>
{
    // updating image and details 
    /* 
    
    colleting and validating updating data
    first try to upload and remove file, if exist
    updating other details
    saving user



    
    */

    const userId = req.user?._id
    
    const 
    {
        fullName,
        email,
        address,
        cellNo,
    } = req.body

    console.log("Body of req", req.body);
    

    const newAvatarFile = req.file?.buffer
    let uploadedFile = null
    let OldPublicId = ""

    if(!userId)
    {
        throw new APIError(404, "user is not found through middleware");
    }

    if(!(newAvatarFile || fullName || email || address || cellNo))
    {
        throw new APIError(400, "Please provide atleast one filed to update");
    }


    const DBUser = await User.findById(userId)

    if(!DBUser)
    {
        throw new APIError(404, "User not found");
    }


    if(newAvatarFile)
    {
        const uploadingInstance = await uploadOnCloudinary(newAvatarFile)

        if(uploadingInstance instanceof Error)
        {
            throw new APIError(500, uploadingInstance?.message || "Failed to upload image on cloud");
        }

        uploadedFile = uploadingInstance
        OldPublicId = DBUser.avatarPublicID

    }

    DBUser.fullName = fullName?.trim() ? fullName : DBUser.fullName
    DBUser.email = email?.trim() ? email : DBUser.email
    DBUser.address = address?.trim() ? address : DBUser.address
    DBUser.cellNo = cellNo?.trim() ? cellNo : DBUser.cellNo
    DBUser.avatar = uploadedFile ? uploadedFile.secure_url : DBUser.avatar
    DBUser.avatarPublicID = uploadedFile ? uploadedFile.public_id : DBUser.avatarPublicID


    await DBUser.save({validateBeforeSave: false})


    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully updated account", DBUser)
    )


})


export {updateAccount}