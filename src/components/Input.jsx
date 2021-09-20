import React from "react";

const Input = ({ className, label, labelProps, ...props }) => {
  const [focused, setFocused] = React.useState(false);
  const id = `id_${label}_${Date.now()}`;

  const labelClassName = React.useMemo(
    () =>
      focused || props.value
        ? "scale-90 text-sm -translate-y-2 -translate-x-2 pl-1 text-teal-500"
        : " translate-y-2",
    [focused, props.value]
  );

  return (
    <div
      className={`rounded-lg border-8 flex flex-col
        ring-1 ring-teal-800
        focus-within:ring-2 focus-within:ring-teal-500 
        ${className}`}
    >
      {label && (
        <label
          className={`absolute font-light text-gray-400 text-base 
            transition-transform transform 
            ${labelClassName}`}
          htmlFor={id}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <input
        className="h-7 mt-1 w-full max-w-xs outline-none bg-transparent m-0"
        id={id}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
};

export default Input;
