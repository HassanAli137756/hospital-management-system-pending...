import React from 'react'

function ErrorMessage(
    {
        message = "",
        classes = ""
    }
) {
    return (
    <div className={`flex justify-center ${classes}`}>
        <p className='text-red-500 italic'>

            {message}

        </p>
    </div>
    )
}

export {ErrorMessage}