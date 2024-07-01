import validator from "validator";

const { useReducer } = require("react");

const reducer = (state, action) => {
  const { type, name, payload } = action;

  switch (type) {
    case "onChange": {
      switch (name) {
        case "fullname": {
          return {
            value: String(payload).replace(/[^a-zA-Z ]/g, ""),
            isValid: payload.length >= 2 && payload.length <= 24,
          };
        }

        case "username": {
          return {
            value: payload
              .toLowerCase()
              .replace(/[^a-zA-Z ]/g, "")
              .trim(),
            isValid: payload.length >= 3 && payload.length <= 12,
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
            value: payload,
            isValid: payload.length >= 1,
          };
        }
      }
    }

    case "onBlur": {
      switch (name) {
        case "fullname": {
          let isError, errorMessage;

          if (!state.isValid) {
            isError = !state.isValid;

            if (state.value !== "") {
              if (state.value.length <= 2)
                errorMessage = "Fullname is too short";
              if (state.value.length >= 10)
                errorMessage = "Fullname is too long";
            }
          }

          return {
            ...state,
            isError,
            errorMessage,
          };
        }

        case "username": {
          let isError, errorMessage;

          if (!state.isValid) {
            isError = !state.isValid;

            if (state.value !== "") {
              if (state.value.length < 3)
                errorMessage = "Username is too short";
              if (state.value.length > 12)
                errorMessage = "Username is too long";
            }
          }

          return {
            ...state,
            isError,
            errorMessage,
          };
        }

        case "email": {
          return {
            ...state,
            isError: !state.isValid,
            errorMessage: state.value !== "" && "Invalid email address",
          };
        }

        case "password":
        case "password-confirm": {
          let isError, errorMessage;

          if (!state.isValid) {
            isError = !state.isValid;

            if (state.value !== "") {
              if (state.value.length < 8)
                errorMessage = "Password is too short";
              if (state.value.length > 32)
                errorMessage = "Password is too long";
            }
          }

          return {
            ...state,
            isError,
            errorMessage,
          };
        }
      }
    }

    case "onClear": {
      switch (name) {
        case "search": {
          return { ...initialState };
        }
      }
    }
  }
};

const initialState = {
  value: "",
  isValid: false,
  isError: null,
  errorMessage: "",
};

const useInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleOnChange(e) {
    const { name, value } = e.target;
    dispatch({ type: "onChange", name, payload: value });
  }

  function handleOnBlur(e) {
    const { name } = e.target;
    dispatch({ type: "onBlur", name });
  }

  function handleOnClear(name) {
    dispatch({ type: "onClear", name });
  }

  return { state, handleOnChange, handleOnBlur, handleOnClear };
};

export default useInput;
