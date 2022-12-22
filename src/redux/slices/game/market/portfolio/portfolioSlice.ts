import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portfolio: [],
};

export const protfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
});

export const {} = protfolioSlice.actions;

// Selectors

export default protfolioSlice.reducer;
