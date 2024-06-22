import { createSlice } from "@reduxjs/toolkit";

const getTheme = () => {
  let theme;

  if (typeof window !== "undefined") {
    theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
  }

  return theme;
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: getTheme(),
  },
  reducers: {
    switchTheme(state, action) {
      const { payload } = action;

      state.theme = payload;

      return state;
    },
  },
});

export const themeSliceActions = themeSlice.actions;
export default themeSlice.reducer;
