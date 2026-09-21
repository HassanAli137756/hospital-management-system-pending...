import React, { useState } from 'react'
import { ErrorMessage } from './ErrorMessage'

function PasswordInput(
{
    lable = "",
    placeholder = "",

    register,
    errors,
    name,
    isRequired = true
}
) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <div className="flex justify-start">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lable}
                </label>
            </div>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    name={name}
                    {...(register ? register(name, isRequired ? {required: `Please fill this required field`} : null) : null)}
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 bg-gray-50
                    text-gray-900 placeholder:text-gray-400
                    outline-none transition
                    focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100
                    focus:bg-white"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700"
                >
                    {showPassword ? (
                        // Eye Off
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.98A10.45 10.45 0 0 0 2.25 12s3.5 6.75 9.75 6.75c1.74 0 3.27-.45 4.57-1.08M6.23 6.23C7.76 5.22 9.67 4.75 12 4.75c6.25 0 9.75 7.25 9.75 7.25a16.9 16.9 0 0 1-3.05 3.77M6.23 6.23 3 3m3.23 3.23 12.54 12.54M9.88 9.88a3 3 0 1 0 4.24 4.24"
                            />
                        </svg>
                    ) : (
                        // Eye
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12s3.5-6.75 9.75-6.75S21.75 12 21.75 12 18.25 18.75 12 18.75 2.25 12 2.25 12Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    )}
                </button>
            </div>
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

export default PasswordInput