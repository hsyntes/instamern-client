import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      const { payload } = action;

      state.user = payload;

      return state;
    },
  },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
