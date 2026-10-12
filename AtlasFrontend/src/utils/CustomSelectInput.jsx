
import React from "react"

const SelectInput = ({
  label,
  defaultValue="",
  name,
  options = [],
  register,
  error,
  onChange,
  placeholder = "Select an option",
  ...props
}) => {

  const fields = register ? register(name, {required: 'Please provide this required field'}) : {}

  
  

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-start">
          <label
            htmlFor={name}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        </div>
      )}

      <select
        defaultValue={defaultValue || options?.[0]?.value}
        {...fields}
        id={name}
        onChangeCapture={(e) => (
          onChange?.(e.target.value),
          fields.onChange?.(e)
        )}
        {...props}
        className={`
          w-full
          rounded-xl
          border
          bg-white
          px-4
          py-3
          text-sm
          text-gray-700
          outline-none
          transition
           border-green-200 focus:border-green-500
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};

export {SelectInput};