import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { months } from "./models";

const initialState = {
  day: 1,
  dayInMonth: 0, // задаем равной
  monthIndex: 0,
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setDay: (state, action: PayloadAction<number>) => {
      state.day = action.payload;
    },
    setFirstDayInMonth: (state) => {
      state.dayInMonth = 1;
    },
    setDayMonth: (state, action: PayloadAction<number>) => {
      state.dayInMonth = action.payload;
    },
    setMonthIndex: (state, action: PayloadAction<number>) => {
      state.monthIndex = action.payload;
    },
  },
});

export const { setDay, setFirstDayInMonth, setDayMonth, setMonthIndex } =
  timeSlice.actions;

// Selectors
export const selectDay = (state: RootState) => state.time.day;

export const selectDayInMonth = (state: RootState) => state.time.dayInMonth;

export const selectMonthIndex = (state: RootState) => state.time.monthIndex;

export const selectMonth = createSelector(
  selectMonthIndex,
  (monthIndex) => months[monthIndex]
);

export const selectMonthName = createSelector(selectMonthIndex, (monthIndex) => {
  if (monthIndex === 2 || monthIndex === 7) {
    return months[monthIndex].name + "a";
  } else {
    return months[monthIndex].name.replace("ь", "я");
  }
});

export default timeSlice.reducer;
