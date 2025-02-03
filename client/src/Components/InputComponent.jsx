import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

const InputComponent = ({
  label,
  type = "text",
  options = [],
  placeholder = label,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-2">
      <label className="text-lg font-semibold text-gray-700 block pl-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...field}
          {...props}
          className="w-full p-4 rounded-xl bg-[#e0e5ec] text-gray-700
            shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_#ffffff]
            border-none outline-none focus:shadow-[inset_8px_8px_16px_#bec3c9,inset_-8px_-8px_16px_#ffffff]
            transition-all duration-200"
        />
      ) : type === "select" ? (
        <select
          {...field}
          {...props}
          className="w-full p-4 rounded-xl bg-[#e0e5ec] text-gray-700
            shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_#ffffff]
            border-none outline-none focus:shadow-[inset_8px_8px_16px_#bec3c9,inset_-8px_-8px_16px_#ffffff]
            transition-all duration-200"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...field}
          {...props}
          placeholder={label}
          type={type}
          className="w-full p-4 rounded-xl bg-[#e0e5ec] text-gray-700
            shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_#ffffff]
            border-none outline-none focus:shadow-[inset_8px_8px_16px_#bec3c9,inset_-8px_-8px_16px_#ffffff]
            transition-all duration-200"
        />
      )}
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm font-medium pl-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InputComponent;
