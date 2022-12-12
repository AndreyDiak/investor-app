import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  defaultDiffilculty,
  defaultGameDuration,
  defaultIncomeToWin,
  defaultTimeSpeed,
  gameDurationIncomeToWin,
} from "../../../models";
import { RootState } from "../../store";
import { DifficultyType, GameDurationType, TimeSpeedType } from "./typings";

const initialState = {
  timeSpeed: defaultTimeSpeed,
  constTimeSpeed: defaultTimeSpeed,
  difficulty: defaultDiffilculty,
  gameDuration: defaultGameDuration,
  incomeToWin: defaultIncomeToWin,
};

// export type SettingsState = typeof initialState;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTimeSpeed: (state, action: PayloadAction<TimeSpeedType>) => {
      state.timeSpeed = action.payload;
    },
    setConstTimeSpeed: (state, action: PayloadAction<TimeSpeedType>) => {
      state.constTimeSpeed = action.payload;
    },
    setGameDuration: (state, action: PayloadAction<GameDurationType>) => {
      state.gameDuration = action.payload;
      state.incomeToWin = gameDurationIncomeToWin[action.payload];
    },
    setDifficulty: (state, action: PayloadAction<DifficultyType>) => {
      state.difficulty = action.payload;
    },
  },
});

export const { setTimeSpeed, setConstTimeSpeed, setGameDuration, setDifficulty } =
  settingsSlice.actions;

// Selectors
export const selectTimeSpeed = (state: RootState) => state.settings.timeSpeed;

export const selectConstTimeSpeed = (state: RootState) => state.settings.constTimeSpeed;

export const selectGameDuration = (state: RootState) => state.settings.gameDuration;

export const selectDifficulty = (state: RootState) => state.settings.difficulty;

export default settingsSlice.reducer;
