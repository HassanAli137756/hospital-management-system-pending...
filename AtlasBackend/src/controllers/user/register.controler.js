import { Profile } from '../../models/Profile.model.js'
import {User} from '../../models/User.model.js'
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'
import {removeFromCloudinary, uploadOnCloudinary} from '../../utils/cloudinary.js'


const register = asyncHandler( async (req, res) =>
{
    console.log("Access reached in register controller");
    
    

    const 
    {
        userName,
        fullName,
        email,
        password,
        address="",
        cellNo="",
        role="patient",
    } = req.body

    const avatarBuffer = req?.file?.buffer
    let uploadedAvatar = null

    if(
        [
            userName, fullName, email, password, cellNo, role, 
        ]
        .some(field => field?.trim() == "" || !field)
    )
    {
        throw new APIError(400, "Please provide all required fields to register")
    }


    const duplicateDocument = await User.findOne(
    {
        $or: [{email: email}, {userName: userName}]
    }
    )

    if(duplicateDocument)
    {
        throw new APIError(400, "Select other user-name or email, user with given user-name or email already existed")
    }






    if(avatarBuffer)
    {
        const uploadingInstance = await uploadOnCloudinary(avatarBuffer)

        if(uploadingInstance instanceof Error)
        {
            throw new APIError(500, uploadingInstance?.message || "Fialed to upload image on cloud");
            
        }


        uploadedAvatar = uploadingInstance
    }

    


    const createdUser = await User.create(
    {
        address,
        avatar: uploadedAvatar ? uploadedAvatar.secure_url : "",
        avatarPublicID: uploadedAvatar ? uploadedAvatar.public_id : "",
        cellNo: cellNo.replace("-", ""),
        email,
        fullName,
        password,
        userName: userName.toLowerCase(),
        role:role
    }
    )  
    
    if(!createdUser?._id)
    {
        throw new APIError(500, "failed to register user");

    }

    
    const userProfile = await Profile.findOne(
    {
        $or: [{cellNo: cellNo}, {patientAccount: createdUser._id}]
    })

    if(userProfile?._id)
    {
        if(!userProfile.patientAccount.toString().length > 0)
        {
            userProfile.patientAccount = createdUser._id
            
            await userProfile.save({validateBeforeSave: false})
        }
    }
    else
    {     
        const userProfile = await Profile.create(
        {
            cellNo: cellNo.replace("-", ""),
            name: fullName,
            patientAccount: createdUser._id
        })
        if(!userProfile?._id)
        {
            await removeFromCloudinary(uploadedAvatar?.public_id)
            await User.deleteOne({_id: createdUser._id})
            throw new APIError(500, "failed to register user, as profile id was not created successfully");
        }

    }
    

    return res
    .status(201)
    .json(
        new APIResponse(201, "Successfully register user", createdUser)
    )

})

export {register}