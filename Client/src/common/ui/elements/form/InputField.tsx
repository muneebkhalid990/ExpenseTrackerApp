/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";

const InputField: React.FC<InputProps> = ({
  name,
  label,
  type,
  rules = {},
  control,
  errors = {},
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-grey-700 text-sm font-bold flex-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue="" 
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            className="border rounded w-full py-1 px-2 font-normal"
          />
        )}
      />
      {errors && errors[name] && (
        <span className="text-yellow-500 font-bold">{errors[name].message}</span>

      )}
    </div>
  );
};

export default InputField;
