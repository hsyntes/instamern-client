import validator from "validator";

const { useReducer } = require("react");

const reducer = (state, action) => {
  const { type, name, payload } = action;

  switch (type) {
    case "onChange": {
      switch (name) {
        case "fullname": {
          return {
            value: String(
              `${payload.slice(0, 1).toUpperCase()}${payload
                .slice(1)
                .toLowerCase()}`
            ).replaceAll(/[0-9]/g, ""),
            isValid: payload.length >= 2 && payload.length <= 24,
          };
        }

        case "username": {
          return {
            value: payload.toLowerCase().trim(),
            isValid: payload.length >= 3 && payload.length <= 8,
          };
        }

        case "email": {
          return {
            value: payload.toLowerCase().trim(),
            isValid: validator.isEmail(payload),
          };
        }

        case "password":
        case "password-confirm": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 8 && payload.length <= 16,
          };
        }

        case "search": {
          return {
            value: payload.trim(),
            isValid: payload.length >= 1,
          };
        }
      }
    }

    case "onBlur": {
      switch (name) {
        case "fullname": {
          let isError, message;

          if (!state.isValid) {
            isError = !state.isValid;

            if (state.value.length <= 2) message = "Fullname is too short.";
            if (state.value.length >= 10) message = "Fullname is too long.";
            else message = "Invalid fullname.";
          }

          return {
            ...state,
            isError,
            message,
          };
        }

        case "username": {
          let isError, message;

          if (!state.isValid) {
            isError = !state.isValid;

            if (state.value.length <= 3) message = "Username is too short.";
            if (state.value.length >= 12) message = "Username is too long.";
            else message = "Invalid username.";
          }

          return {
            ...state,
            isError,
            message,
          };
        }

        case "email": {
          return {
            ...state,
            isError: !state.isValid,
            message: "Invalid email address.",
          };
        }

        case "password":
        case "password-confirm": {
          let isError, message;

          if (!state.isValid) {
            isError = !state.isValid;

            if (state.value.length <= 8) message = "Password is too short.";
            if (state.value.length >= 32) message = "Password is too long.";
            else message = "Password contains invalid values.";
          }

          return {
            ...state,
            isError,
            message,
          };
        }
      }
    }
  }
};

const initialState = {
  value: "",
  isValid: null,
  isError: null,
  message: null,
};

const useInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "onChange", name, payload: value });
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    dispatch({ type: "onBlur", name });
  };

  return { state, handleOnChange, handleOnBlur };
};

export default useInput;
