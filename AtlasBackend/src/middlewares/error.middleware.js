import jwt from "jsonwebtoken"
import {APIError} from '../utils/apiError.js'

const errorMiddleware = (error, req, res, next) =>
{
    console.log("Error middleware executed", error?.message);
    
    if(error instanceof jwt.TokenExpiredError)
    {
        return res
        .status(401)
        .json(
            new APIError(401, "jwt have expried")
        )
    }

    else
    {
        return res
        .status(error?.statusCode || 500)
        .json(
            new APIError(error?.statusCode || 500, error?.message || "Something went wrong", [error?.message])
        )
    }
}

export {errorMiddleware}