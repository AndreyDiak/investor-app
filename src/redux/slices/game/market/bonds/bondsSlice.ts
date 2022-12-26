import { RootState } from "./../../../../store";
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

export const selectBonds = (state: RootState) => state.bonds.bonds;

export default bondsSlice.reducer;
