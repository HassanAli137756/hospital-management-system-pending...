import React, { useState } from 'react'

function ImageInput(
{
    defaultImageSrc=null,
    label="",
    refrence="",
    message="",
    register,
    errors,
    name,
    isRequired=false
}
) {

    const [avatarPreview, setAvatarPreview] = useState(defaultImageSrc);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setAvatarPreview(URL.createObjectURL(file));
    };


    const fields = register ? register(name, isRequired ? {required: "Please provide this required fields"} : {}) : null

    return (
        <div>
            <div>
            <div className="flex justify-start">
                <h3 className="text-sm font-semibold pb-1 text-gray-800">
                    {label + `${isRequired ? " (Optional)" : ""}`}
                </h3>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center justify-between mb-5">
                    {message.length > 0 && (<div>


                        <p className="text-xs text-gray-400 mt-1">
                            {message}
                        </p>
                    </div>)}

                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-emerald-100
          flex items-center justify-center overflow-hidden shrink-0 shadow-sm">

                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.3}
                                stroke="currentColor"
                                className="w-10 h-10 text-emerald-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0
                3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                                />
                            </svg>
                        )}
                    </div>

                    {/* Upload Content */}
                    <div className="flex-1 text-center sm:text-left">
                        {refrence.length > 0 && (
                            <p className="text-sm font-medium pb-2.5 text-gray-700">
                            {refrence}
                        </p>
                        )}
                        

                        <label
                            htmlFor="avatar"
                            className="inline-flex items-center justify-center gap-2
            px-4 py-2.5 rounded-xl
            bg-emerald-700 text-white
            text-sm font-semibold
            hover:bg-emerald-800
            active:bg-emerald-900
            shadow-sm shadow-emerald-700/20
            cursor-pointer transition"
                        >
                            {/* Upload Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V3.75m0 0L7.5 8.25M12 3.75l4.5 4.5
                M4.5 14.25v3.75a2.25 2.25 0 0 0 2.25 2.25h10.5
                a2.25 2.25 0 0 0 2.25-2.25v-3.75"
                                />
                            </svg>

                            Choose Photo
                        </label>

                        <input
                            name={name}
                            {...fields}
                            
                            id="avatar"
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={(e) => 
                            {
                                handleAvatarChange(e),
                                fields?.onChange?.(e)
                            }
                            }
                        />

                        <p className="text-[11px] text-gray-400 mt-3">
                            PNG, JPG or WebP · Maximum 5MB
                        </p>
                    </div>
                </div>
            </div>
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

export {ImageInput}