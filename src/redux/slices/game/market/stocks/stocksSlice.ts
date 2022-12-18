import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkType } from "../../../../store";
import { incomeToOpenMarket } from "../models";
import { MyStock, Stock } from "./typings";
import { generateStocks, indexingStocks as index } from "./utils";

const initialState = {
  stocks: [] as Stock[],
  myStocks: [] as MyStock[],
};

export const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setInitialStocks: (state, action: PayloadAction<Stock[]>) => {
      state.stocks = action.payload;
    },
    indexingStocks: (state, action: PayloadAction<Stock[]>) => {
      state.stocks = action.payload;
    },
  },
});

export const { setInitialStocks, indexingStocks } = stocksSlice.actions;

// Selectors

// Thunks

export const checkStocks = (): ThunkType => (dispatch, getState) => {
  const stocks = getState().stocks.stocks;
  const difficulty = getState().settings.difficulty;

  if (stocks.length !== 0) {
    const newStocks = index(stocks, difficulty);
    dispatch(indexingStocks(newStocks));
  } else {
    const income = getState().character.totalIncome;

    if (incomeToOpenMarket["stocks"] < income) {
      // если наш доход больше чем необходимый минимум
      const newStocks = generateStocks(difficulty);
      dispatch(setInitialStocks(newStocks));
    }
  }
};

export default stocksSlice.reducer;
