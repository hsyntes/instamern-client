const Avatar = ({ letter, size }) => {
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

    default: {
      style = { width: "24px", height: "24px" };
      break;
    }
  }

  return (
    <div
      className="flex items-center justify-center bg-primary rounded-full"
      style={style}
    >
      {letter}
    </div>
  );
};

export default Avatar;
