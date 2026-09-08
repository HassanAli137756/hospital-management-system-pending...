

export const asyncHandler = (fn => () =>
{
    return async (req, res, next) => 
    {
        try
        {
            await fn(req, req)
        }
        catch(error)
        {
            console.log("There is an error in asyncHandler: ", error);
            
        }
    
    }
})