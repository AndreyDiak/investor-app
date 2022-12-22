import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

const initialState = {};

export const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {},
});

export const {} = popupsSlice.actions;

// Selectors

// Thunks
type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;

export default popupsSlice.reducer;
