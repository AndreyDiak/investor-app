import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { months } from "./models";

const initialState = {
  day: 1,
  dayInMonth: 1,
  monthIndex: 0
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    increaseDay: (state) => {
      state.day++
    },
    setDayInMonth: (state, action: PayloadAction<number>) => {
      state.dayInMonth = action.payload
    },
    setMonthIndex: (state, action: PayloadAction<number>) => {
      state.monthIndex = action.payload
    }
  },
});

export const { increaseDay, setDayInMonth, setMonthIndex } = timeSlice.actions;

// Selectors
export const selectDay = (state: RootState) => state.time.day;

export const selectDayInMonth = (state: RootState) => state.time.day;

export const selectMonthIndex = (state: RootState) => state.time.monthIndex;

export const selectMonth = createSelector(
  selectMonthIndex,
  (monthIndex) => months[monthIndex]
)


export default timeSlice.reducer;
