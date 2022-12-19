import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

const initialState = {};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
});

export const {} = newsSlice.actions;

// Selectors

type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;

export const weekSpends = (): ThunkType => (dispatch, getState) => {};

export default newsSlice.reducer;
