import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bonds: [],
};

export const bondsSlice = createSlice({
  name: "bonds",
  initialState,
  reducers: {},
});

export const {} = bondsSlice.actions;

// Selectors

export default bondsSlice.reducer;
