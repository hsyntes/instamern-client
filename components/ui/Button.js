const Button = ({ type, variant, className, onClick, children }) => {
  let classes = `button rounded-xl text-sm font-semibold select-none transition-all px-4 py-1.5 ${className} `;

  switch (variant) {
    case "primary": {
      classes += "bg-primary hover:bg-primary-darker text-white";
      break;
    }

    case "secondary": {
      classes += "bg-secondary hover:bg-secondary-darker text-white";
      break;
    }

    case "link": {
      classes += "!p-0 text-primary hover:text-primary-darker";
      break;
    }
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
