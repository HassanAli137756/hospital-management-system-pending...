import React from "react";
import { Stethoscope } from "lucide-react";

const ScreenBlankError = (
{
    msg="Something went wrong try again",
    classes=""
}
) => {
return ( 
<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 ">
           
    <div className={`flex justify-center ${classes}`}>
        <p className='text-red-500 italic'>

            {msg}

        </p>
    </div>

</div>

);
};

export {ScreenBlankError};
