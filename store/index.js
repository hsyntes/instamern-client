import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme-slice/theme-slice";
import userSlice from "./user-slice/user-slice";

const store = configureStore({
  reducer: { theme: themeSlice, user: userSlice },
});

export default store;
