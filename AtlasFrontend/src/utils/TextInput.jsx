import React from 'react'
import { ErrorMessage } from './ErrorMessage'


function TextInput(
    {
        lable="",
        placeholder="",
        register,
        errors,
        name,
        isRequired=true,
        defaultValue=""

    }
) 
{

    
    return (
        <div className='mt-2'>
            <div className="flex justify-start">
                <label className="block text-sm font-medium text-gray-700 mb-0.5">
                    {`${lable} ${!isRequired ? "(optional)" : "" }`}
                </label>
            </div>

            <input
                defaultValue={defaultValue}
                type="text"
                name={name}
                placeholder={placeholder}
                {...(register ? register(name, isRequired ? {required: `Please fill this required field`} : null) : null)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50
                  text-gray-900 placeholder:text-gray-400
                  outline-none transition
                  focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100
                  focus:bg-white"
            />
            {
                isRequired && errors?.[name] &&
                (
                    <ErrorMessage
                    classes='justify-start'
                    message={errors?.[name]?.message}
                    />
                )
            }
        </div>
    )
}

export default TextInput