import jwt from "jsonwebtoken"
import {APIError} from '../utils/apiError.js'


const authMiddleware = async(req, res, next) =>
{
    try 
    {
        const incommingAccessToken = req.cookies?.accessToken

        if(!incommingAccessToken)
        {
        throw new APIError(400, "Access token is not found")
        }


        const decodedToken = await jwt.verify(incommingAccessToken, process.env.ACCESS_TOKEN_SECRET)


        req.user = decodedToken

        next()


    } 
    catch (error) {
        console.log("Failed in authmiddleware to find user", error);
        throw new APIError(500, error?.message || "Failed in authenticatting a user")
    }
}


export {authMiddleware}