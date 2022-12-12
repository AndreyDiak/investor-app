import { generateRoundRandomValue } from "../../../utils/generateRandom";
import { DifficultyType } from "../settings/typings";
import {
  AnyAction,
  createSelector,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  events,
  increaseSpendsPriceFromDifficultyMap,
  spendLevelToPrice,
  SpendsLevel,
} from "../../../models";
import type { HappenedSpend, Spend, SpendsLevelType } from "./typings";

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
    setAvailableEvents: (state, action: PayloadAction<Spend[]>) => {
      state.availableEvents = action.payload;
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
export const selectCurrentEvents = (state: RootState) => state.spends.currentEvents;

export const selectCurrentEventsSummary = createSelector(
  selectCurrentEvents,
  (currentEvents) => currentEvents.reduce((acc, item) => acc + item.price, 0)
);

type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;

// Initial events with prices
export const generateInitialEvents = (difficulty: DifficultyType) => {
  const difficultyCoefficient = increaseSpendsPriceFromDifficultyMap[difficulty];
  const availableEvents: Spend[] = events.map((event) => {
    // задаем цены с учетом сложности игры
    const lowPrice = event.price;
    const mediumPrice = lowPrice * difficultyCoefficient;
    const highPrice = mediumPrice * difficultyCoefficient;
    const luxuryPrice = highPrice * difficultyCoefficient;
    return {
      title: event.title,
      price: [lowPrice, mediumPrice, highPrice, luxuryPrice],
    };
  });
  // dispatch(spendsSlice.actions.setAvailableEvents(availableEvents));
};

export const weekSpends = (): ThunkType => (dispatch, getState) => {
  const availableEvents = getState().spends.availableEvents;
  const spendsLevel = getState().spends.spendsLevel;
  const index = generateRoundRandomValue(availableEvents.length);

  // обновить баланс кошелька

  dispatch(
    updateCurrentEvents({
      title: availableEvents[index].title,
      price: availableEvents[index].price[spendLevelToPrice[spendsLevel]],
    })
  );
};

export default spendsSlice.reducer;
