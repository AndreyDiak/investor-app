import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";
import { defaultDiffilculty, defaultTimeSpeed } from "./models";
import { PayloadAction } from "@reduxjs/toolkit";
import { TimeSpeedType, DifficultyType } from "./typings";

const initialState = {
  timeSpeed: defaultTimeSpeed,
  constTimeSpeed: defaultTimeSpeed,
  difficulty: defaultDiffilculty,
};

// export type SettingsState = typeof initialState;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTimeSpeed: (state, action?: PayloadAction<TimeSpeedType>) => {
      state.timeSpeed = !!action?.payload ? action.payload : state.constTimeSpeed;
    },
    setConstTimeSpeed: (state, action: PayloadAction<TimeSpeedType>) => {
      state.constTimeSpeed = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<DifficultyType>) => {
      state.difficulty = action.payload;
    },
  },
});

export const { setTimeSpeed, setConstTimeSpeed, setDifficulty } = settingsSlice.actions;

// Selectors
export const selectTimeSpeed = (state: RootState) => state.settings.timeSpeed;

export const selectConstTimeSpeed = (state: RootState) => state.settings.constTimeSpeed;

export const selectDifficulty = (state: RootState) => state.settings.difficulty;

export default settingsSlice.reducer;
