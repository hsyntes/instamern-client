const Input = ({
  type,
  name,
  variant,
  placeholder,
  value,
  onChange,
  className,
  autoFocus,
}) => {
  let classes = `w-full rounded border dark:border-dark text-sm outline-none focus:!border-primary transition-all p-2 ${className} `;

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

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={classes}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  );
};

export default Input;
