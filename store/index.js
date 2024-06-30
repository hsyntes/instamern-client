import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme-slice/theme-slice";
import currentUserSlice from "./user-slice/current-user-slice";

const store = configureStore({
  reducer: { theme: themeSlice, currentUser: currentUserSlice },
});

export default store;
