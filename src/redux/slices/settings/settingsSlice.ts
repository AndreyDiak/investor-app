import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   defaultCardWidth,
   defaultDevice,
   defaultDiffilculty,
   defaultGameDuration,
   defaultIncomeToWin,
   defaultMaxCardsInARow,
   defaultPersonImageWidth,
   defaultTimeSpeed,
   Devices,
   Difficulty,
   GameDuration,
   gameDurationIncomeToWin,
   TimeSpeed,
} from "../../../models";
import { RootState } from "../../store";

const initialState = {
   timeSpeed: defaultTimeSpeed,
   constTimeSpeed: defaultTimeSpeed,
   difficulty: defaultDiffilculty,
   gameDuration: defaultGameDuration,
   incomeToWin: defaultIncomeToWin,
   device: defaultDevice, // ноутбук по дефолту
};

// export type SettingsState = typeof initialState;

export const settingsSlice = createSlice({
   name: "settings",
   initialState,
   reducers: {
      setTimeSpeed: (state, action: PayloadAction<TimeSpeed>) => {
         state.timeSpeed = action.payload;
      },
      setConstTimeSpeed: (state, action: PayloadAction<TimeSpeed>) => {
         state.constTimeSpeed = action.payload;
      },
      setGameDuration: (state, action: PayloadAction<GameDuration>) => {
         state.gameDuration = action.payload;
         state.incomeToWin = gameDurationIncomeToWin[action.payload];
      },
      setDifficulty: (state, action: PayloadAction<Difficulty>) => {
         state.difficulty = action.payload;
      },
      setDevice: {
         prepare: (screenWidth: number) => {
            let device = Devices.PHONE;

            if (screenWidth > 1680) {
               device = Devices.DESKTOP;
            } else if (screenWidth > 1280) {
               device = Devices.LAPTOP;
            } else if (screenWidth > 768) {
               device = Devices.TABLET;
            }
            return {
               payload: device,
            };
         },
         reducer: (state, action: PayloadAction<Devices>) => {
            state.device = action.payload;
         },
      },
   },
});

export const {
   setTimeSpeed,
   setConstTimeSpeed,
   setGameDuration,
   setDifficulty,
   setDevice,
} = settingsSlice.actions;

// Selectors
export const selectTimeSpeed = (state: RootState) => state.settings.timeSpeed;

export const selectConstTimeSpeed = (state: RootState) => state.settings.constTimeSpeed;

export const selectGameDuration = (state: RootState) => state.settings.gameDuration;

export const selectDifficulty = (state: RootState) => state.settings.difficulty;

export const selectDevice = (state: RootState) => state.settings.device;

export const selectMaxCardsInARow = createSelector(
   selectDevice,
   (device) => defaultMaxCardsInARow[device]
);

export const selectCardWidth = createSelector(
   selectDevice,
   (device) => defaultCardWidth[device]
);

export const selectPersonImageWidth = createSelector(
   selectDevice,
   (device) => defaultPersonImageWidth[device]
);

export default settingsSlice.reducer;
