const FloatingInput = ({
  type,
  name,
  variant,
  placeholder,
  value,
  onChange,
  onBlur,
  className,
  autoFocus,
  onKeyDown,
}) => {
  let inputClasses = `peer w-full rounded border dark:border-dark text-sm outline-none focus:!border-primary transition-all py-4 px-3 ${className} `;
  let labelClasses =
    "absolute peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-primary peer-focus:text-xs top-3 -translate-y-1/2 left-3 text-xs cursor-text transition-all ";

  switch (variant) {
    case "dark": {
      inputClasses += "bg-dark placeholder:text-dark text-white";
      labelClasses += "text-muted-dark";

      break;
    }

    case "black": {
      inputClasses += "bg-black placeholder:text-black text-white";
      labelClasses += "text-muted-dark";

      break;
    }

    case "light": {
      inputClasses += "bg-light placeholder:text-light text-dark";
      break;
    }

    default: {
      inputClasses += "bg-white placeholder:text-white text-dark";
      break;
    }
  }

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        autoComplete="off"
        onKeyDown={onKeyDown}
      />
      <label htmlFor={name} className={labelClasses}>
        {placeholder}
      </label>
    </div>
  );
};

export default FloatingInput;
