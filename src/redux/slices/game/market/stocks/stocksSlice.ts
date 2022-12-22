import { newsTopics } from "./../../news/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, ThunkType } from "../../../../store";
import { incomeToOpenMarket } from "../models";
import { Condition } from "../typings";
import { MyStock, Stock } from "./typings";
import { generateStocks, indexingStocks as index } from "./utils";
import { openTopic } from "../../news/newsSlice";

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
    setStockInterval: (
      state,
      action: PayloadAction<{ id: string; type: Condition; interval: number }>
    ) => {
      const index = state.stocks.findIndex((stock) => stock.id === action.payload.id);
      state.stocks[index].priceChangeIntervalDueToNews = action.payload.interval;
      state.stocks[index].priceGrowOfFallDueToNews = action.payload.type;
    },
  },
});

export const { setInitialStocks, indexingStocks, setStockInterval } = stocksSlice.actions;

// Selectors

export const selectStocks = (state: RootState) => state.stocks.stocks;

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
      // открываем возможность показывать новости про акции
      dispatch(openTopic(newsTopics.MARKET));
      // создаем акции
      // если наш доход больше чем необходимый минимум
      const newStocks = generateStocks(difficulty);
      dispatch(setInitialStocks(newStocks));
    }
  }
};

export default stocksSlice.reducer;
