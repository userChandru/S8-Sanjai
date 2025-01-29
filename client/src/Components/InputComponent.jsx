import React from "react";
import { useField } from "formik";

const InputComponent = ({
  label,
  type = "text",
  options = [],
  placeholder = label,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          {...field}
          {...props}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            meta.touched && meta.error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }`}
        />
      ) : type === "select" ? (
        <select
          {...field}
          {...props}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            meta.touched && meta.error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }`}
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
          className={`peer w-full font-semibold  rounded-xl border-3 focus:border-3 focus:outline-none focus:ring-0   p-2 pt-6 transition-all duration-200 ease-in-out placeholder:invisible  ${
            meta.touched && meta.error
              ? " placeholder:invisible border-red-500 focus:border-red-500"
              : " focus:border-indigo-600 border-slate-600 "
          } `}
        />
      )}
      {label && (
        <label
          htmlFor={props.id || props.name}
          className={`absolute  top-2 left-3 block text-sm font-semibold text-gray-700 peer-placeholder-shown:top-4 peer-placeholder-shown:left-3  transition-all duration-200 ease-in-out peer-placeholder-shown:text-lg peer-focus:text-sm peer-focus:top-2 peer-focus:left-3 peer-focus:text-indigo-600 ${meta.touched && meta.error ? "text-red-500 peer-focus:text-red-500" : ""}`}
        >
          {meta.touched && meta.error ? meta.error : label}
        </label>
      )}
    </div>
  );
};

export default InputComponent;
