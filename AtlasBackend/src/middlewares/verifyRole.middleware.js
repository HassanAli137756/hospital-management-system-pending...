import { APIError } from "../utils/apiError.js"


const verifyRole = (givenRole) => {

    return (req, res, next) => {

        if (req?.user?.role !== givenRole && req?.user?.role !== "admin" && req?.user?.role !== "sub-admin") {
            throw new APIError(403, "You are not allowed to perform this action")
        }

        next()
    }
}

export {verifyRole}