const Avatar = ({ name, size, className }) => {
  let style;

  switch (size) {
    case "sm": {
      style = { width: "16px", height: "16px" };
      break;
    }

    case "lg": {
      style = { width: "32px", height: "32px" };
      break;
    }

    case "xl": {
      style = { width: "48px", height: "48px" };
      break;
    }

    case "2xl": {
      style = { width: "64px", height: "64px" };
      break;
    }

    case "3xl": {
      style = { width: "96px", height: "96px" };
      break;
    }

    default: {
      style = { width: "24px", height: "24px" };
      break;
    }
  }

  return (
    <div
      className={`flex items-center justify-center bg-primary text-white rounded-full ${className}`}
      style={style}
    >
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
};

export default Avatar;
