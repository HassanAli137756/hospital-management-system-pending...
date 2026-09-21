

export class APIError extends Error
{
    constructor(statusCode, message, errors=[], stack=null)
    {
        super(message)
        this.statusCode = statusCode || 500
        this.errors = errors
        this.data = null
        this.success = false


        if(stack == null || !stack)
        {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}