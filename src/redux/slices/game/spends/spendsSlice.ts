import {
  AnyAction,
  createSelector,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { spendLevelToPrice, SpendsLevel } from "../../../../models";
import { generateRoundRandomValue } from "../../../../utils/generateRandom";
import { RootState } from "../../../store";
import { DifficultyType } from "../../settings/typings";
import { decreaseWallet } from "../character/characterSlice";
import type { HappenedSpend, Spend, SpendsLevelType } from "./typings";
import { generateInitialEvents } from "./utils/generateInitialEvents";

const initialState = {
  availableEvents: [] as Spend[],
  spendsLevel: SpendsLevel.LOW,
  currentEvents: [] as HappenedSpend[],
};

// export type SettingsState = typeof initialState;

export const spendsSlice = createSlice({
  name: "spends",
  initialState,
  reducers: {
    resetCurrentEvents: (state) => {
      state.currentEvents = [];
    },
    setAvailableEvents: {
      prepare: (difficulty: DifficultyType) => {
        return {
          payload: generateInitialEvents(difficulty),
        };
      },
      reducer: (state, action: PayloadAction<Spend[]>) => {
        state.availableEvents = action.payload;
      },
    },
    updateCurrentEvents: (state, action: PayloadAction<HappenedSpend>) => {
      state.currentEvents.push(action.payload);
    },
    updateSpendsLevel: (state, action: PayloadAction<SpendsLevelType>) => {
      state.spendsLevel = action.payload;
    },
  },
});

export const { resetCurrentEvents, updateCurrentEvents, updateSpendsLevel } =
  spendsSlice.actions;

// Selectors
export const selectAvailableEvents = (state: RootState) => state.spends.availableEvents;

export const selectSpendsLevel = (state: RootState) => state.spends.spendsLevel;

export const selectCurrentEvents = (state: RootState) => state.spends.currentEvents;

export const selectCurrentEventsSummary = createSelector(
  selectCurrentEvents,
  (currentEvents) => currentEvents.reduce((acc, item) => acc + item.price, 0)
);

type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;

export const weekSpends = (): ThunkType => (dispatch, getState) => {
  const availableEvents = getState().spends.availableEvents;
  const spendsLevel = getState().spends.spendsLevel;
  const index = generateRoundRandomValue(availableEvents.length);

  // TODO обновить баланс кошелька
  const event = {
    title: availableEvents[index].title,
    price: availableEvents[index].price[spendLevelToPrice[spendsLevel]],
  };

  dispatch(updateCurrentEvents(event));
  dispatch(decreaseWallet(event.price));
};

export default spendsSlice.reducer;
