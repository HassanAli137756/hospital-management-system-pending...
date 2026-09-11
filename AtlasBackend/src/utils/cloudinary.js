import {v2 as cloudinary}  from 'cloudinary'
import { APIError } from './apiError.js'

cloudinary.config(
{
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
}
)



const uploadOnCloudinary = (bufferFile) =>
{
    if(!bufferFile)
    {
        throw new APIError(400, "File isn't provided")
    }

    return new Promise((resolve, reject) =>
    {
        const uploadStream = cloudinary.uploader.upload_stream(
        {
            resource_type: "image"
        },
        (error, response) =>
        {
            if(error)
            {
                return reject(error)
            }
            else
            {
                return resolve(response)
            }
        }
        )

        uploadStream.end(bufferFile)
    })
}



const removeFromCloudinary = async (fileId) =>
{
    if(!fileId)
    {
        console.log("fileId is not provide while removing image");

        return false
    }

    try 
    {
        const removingInstance = await cloudinary.uploader.destroy(fileId)


        return true


    } catch (error) {
        
        console.log("There is an error in removing image", error);
        
        return false
    }
}


export {uploadOnCloudinary, removeFromCloudinary}