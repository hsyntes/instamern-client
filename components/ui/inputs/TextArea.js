const TextArea = ({
  inputMode,
  name,
  placeholder,
  maxLength,
  value,
  onChange,
  className,
  variant,
  disabled,
}) => {
  let classes = `w-full border dark:border-dark text-sm rounded focus:!border-primary outline-none transition-all min-h-28 p-2 ${className} `;

  switch (variant) {
    case "dark": {
      classes += "bg-dark placeholder:text-muted-dark text-white";
      break;
    }

    case "black": {
      classes += "bg-black placeholder:text-muted-dark text-white";
      break;
    }

    case "light": {
      classes += "bg-light placeholder:text-muted text-dark";
      break;
    }

    default: {
      classes += "bg-white placeholder:text-muted text-dark";
      break;
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") e.preventDefault();
  }

  return (
    <textarea
      inputMode={inputMode}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      className={classes}
      style={{ resize: "none" }}
      disabled={disabled}
      onKeyDown={handleKeyDown}
    />
  );
};

export default TextArea;
