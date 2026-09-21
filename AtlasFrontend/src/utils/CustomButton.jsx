import React from 'react'

function CustomButton(
{
    name="",
    type="button",
    isAllowedDefaultClasses=true,
    classes="",
    onClick=null

}
) 
{
    return (
        <button
            type={type}
            onClick={(e) => (onClick ? onClick() : null)}
            className={` ${classes} ${isAllowedDefaultClasses ? "w-full h-12 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold shadow shadow-emerald-700/20 transition duration-200" : null}`}
        >
            {name}
        </button>
    )
}

export default CustomButton